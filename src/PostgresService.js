const postgres = require(`pg-promise`);

/**
 * Force all geometries to be the same winding order (for some reason they are not in DB)
 * Join them all in a single row.
 */
const SQL_QUERY_PREFIX = `SELECT id,
 ST_AsGeoJSON(ST_Transform(ST_ForceRHR(way), 4326)) as data FROM
(
  SELECT id, ST_Multi(ST_Union(`;

const SQL_QUERY_SUFFIX = `)) AS way
  FROM (
    SELECT tags->'wikidata' AS id, (ST_Dump(way)).geom AS way
    FROM $1~
    WHERE tags ? 'wikidata' AND tags->'wikidata' IN ($2:csv)
    ) tbl1
  GROUP BY id
) tbl2`;

const SQL_QUERY = `${SQL_QUERY_PREFIX}way${SQL_QUERY_SUFFIX}`;

const SQL_QUERY_NO_WATER = `${SQL_QUERY_PREFIX}
COALESCE(ST_Difference(
  tbl1.way,
  (select ST_Union(water.way) from $3~ water where ST_Intersects(tbl1.way, water.way))
), tbl1.way)
${SQL_QUERY_SUFFIX}`;


class PostgresService {

  /**
   * @param {Object} opts
   * @param {string} opts.host
   * @param {int} opts.port
   * @param {string} opts.database
   * @param {string} opts.user
   * @param {string} opts.password
   * @param {Object} [opts.requester]
   */
  constructor(opts) {
    this._requester = opts.requester;
    if (!this._requester) {
      const pgp = postgres();
      this._requester = pgp({
        host: opts.host,
        port: opts.port,
        database: opts.database,
        user: opts.user,
        password: opts.password
      });
    }
  }

  /**
   * Query geojson rows from Postgres
   * @param {string} table
   * @param {string[]} ids
   * @param {{waterTable:string}} [opts]
   * @returns {{id:int, data:string}[]}
   */
  query(table, ids, opts) {
    if (ids.length === 0) return [];

    let query = SQL_QUERY;
    const params = [table, ids];
    if (opts && opts.waterTable) {
      query = SQL_QUERY_NO_WATER;
      params.push(opts.waterTable);
    }

    return this._requester.query(query, params);
  }

  /**
   * Convert rows into a proper GeoJSON string
   * @param {{id:int, data:string}[]} rows
   * @param {object} [properties]
   */
  static toGeoJSON(rows, properties) {
    const featuresStr = rows.map(row => {
      const propStr = JSON.stringify((properties && properties[row.id]) || {});
      return `{"type":"Feature","id":"${row.id}","properties":${propStr},"geometry":${row.data}}`;
    }).join(`,`);
    return `{"type":"FeatureCollection","features":[${featuresStr}]}`;
  }
}

module.exports = {PostgresService};
