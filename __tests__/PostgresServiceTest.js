const {PostgresService} = require(`../src/index`);

describe(`PostgresService`, () => {

  it(`pass-through query`, async () => {
    const res = [{id: `Q1`, data: `abc`}];
    const ps = new PostgresService({requester: {query: async () => res}});
    expect(await ps.query(`tbl`, [`Q123`])).toEqual(res);
  });

  it(`optimized query`, async () => {
    const ps = new PostgresService({requester: {query: async () => `abc`}});
    expect(await ps.query(`tbl`, [])).toEqual([]);
  });

  it(`toGeoJSON empty`, () => expect(PostgresService.toGeoJSON([])).toBe(`{type:"FeatureCollection",features:[]}`));

  it(`toGeoJSON`, () => expect(
    PostgresService.toGeoJSON([{id: `Q1`, data: `str1`}])
  ).toBe(`{type:"FeatureCollection",features:[` +
    `{"type":"Feature","id":"Q1","properties":{},"geometry":str1}]}`));

  it(`toGeoJSON with props`, () => expect(
    PostgresService.toGeoJSON([{id: `Q1`, data: `str1`}, {id: `Q2`, data: `str2`}], {Q1: {a: 1}})
  ).toBe(`{type:"FeatureCollection",features:[` +
    `{"type":"Feature","id":"Q1","properties":{"a":1},"geometry":str1},` +
    `{"type":"Feature","id":"Q2","properties":{},"geometry":str2}]}`));

});
