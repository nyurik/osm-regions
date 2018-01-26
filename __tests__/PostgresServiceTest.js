const {PostgresService} = require(`../src/index`);

describe(`PostgresService`, () => {

  it(`pass-through query`, async () => {
    const res = [{id: `Q1`, data: `abc`}];
    const ps = new PostgresService({queries: {}, requester: {query: async () => res}});
    expect(await ps.query(`tbl`, [`Q123`])).toEqual(res);
  });

  it(`optimized query`, async () => {
    const ps = new PostgresService({queries: {}, requester: {query: async () => `abc`}});
    expect(await ps.query(`tbl`, [])).toEqual([]);
  });

  it(`toGeoJSON empty`, () => {
    const geojson = PostgresService.toGeoJSON([]);
    expect(geojson).toBe(`{"type":"FeatureCollection","features":[]}`);
    expect(JSON.parse(geojson)).toBeTruthy();
  });

  it(`toGeoJSON`, () => {

    const geojson = PostgresService.toGeoJSON([{id: `Q1`, data: `"str1"`}]);
    expect(geojson).toBe(`{"type":"FeatureCollection","features":[` +
      `{"type":"Feature","id":"Q1","properties":{},"geometry":"str1"}]}`);
    expect(JSON.parse(geojson)).toBeTruthy();
  });

  it(`toGeoJSON with props`, () => {
    const geojson = PostgresService.toGeoJSON(
      [{id: `Q1`, data: `"str1"`}, {id: `Q2`, data: `"str2"`}], {Q1: {a: 1}});
    expect(geojson).toBe(`{"type":"FeatureCollection","features":[` +
      `{"type":"Feature","id":"Q1","properties":{"a":1},"geometry":"str1"},` +
      `{"type":"Feature","id":"Q2","properties":{},"geometry":"str2"}]}`);
    expect(JSON.parse(geojson)).toBeTruthy();
  });

});
