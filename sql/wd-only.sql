--
-- Name: planet_osm_polygon_wikidata; Type: INDEX; Schema: public;
--

DO $$
BEGIN

IF NOT EXISTS (
    SELECT 1
    FROM   pg_class c
    JOIN   pg_namespace n ON n.oid = c.relnamespace
    WHERE  c.relname = 'planet_osm_polygon_wikidata'
    AND    n.nspname = 'public'
    ) THEN

    CREATE INDEX planet_osm_polygon_wikidata
      ON planet_osm_polygon (wikidata);

END IF;

END$$;

--
-- Name: planet_osm_line_wikidata; Type: INDEX; Schema: public;
--

DO $$
BEGIN

IF NOT EXISTS (
    SELECT 1
    FROM   pg_class c
    JOIN   pg_namespace n ON n.oid = c.relnamespace
    WHERE  c.relname = 'planet_osm_line_wikidata'
    AND    n.nspname = 'public'
    ) THEN

    CREATE INDEX planet_osm_line_wikidata
      ON planet_osm_line (wikidata);

END IF;

END$$;

--
-- Name: planet_osm_point_wikidata; Type: INDEX; Schema: public;
--

DO $$
BEGIN

IF NOT EXISTS (
    SELECT 1
    FROM   pg_class c
    JOIN   pg_namespace n ON n.oid = c.relnamespace
    WHERE  c.relname = 'planet_osm_point_wikidata'
    AND    n.nspname = 'public'
    ) THEN

    CREATE INDEX planet_osm_point_wikidata
      ON planet_osm_point (wikidata);

END IF;

END$$;

