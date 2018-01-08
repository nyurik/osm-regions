const postgres = require(`pg-promise`);

/**
 * Force all geometries to be the same winding order (for some reason they are not in DB)
 * Join them all in a single row.
 */
const SQL_QUERY = `SELECT id,
 ST_AsGeoJSON(ST_Transform(way, 4326)) as data FROM 
(
  SELECT id, ST_Multi(ST_Union(ST_ForceRHR(way))) AS way
  FROM (
    SELECT tags->'wikidata' AS id, (ST_Dump(way)).geom AS way
    FROM $1~
    WHERE tags ? 'wikidata' AND tags->'wikidata' IN ($2:csv)
    ) tbl1
  GROUP BY id
) tbl2`;

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
   * @returns {{id:int, data:string}[]}
   */
  query(table, ids) {
    if (ids.length === 0) return [];

    return this._requester.query(SQL_QUERY, [table, ids]);
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
