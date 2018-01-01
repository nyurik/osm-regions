import {SparqlService} from '../src/index';

function test(serverResponse, expectedResult, opts) {
  return async () => {
    const sq = new SparqlService(//Object.assign(
      {
        url: `https://example.com/rdfserver`,
        userAgent: `tester`,
        requester: async () => serverResponse,
      }, opts);

    expect(await sq.query(`SELECT STATEMENT`, `id`)).toEqual(expectedResult);
  };
}

describe(`SparqlService`, () => {

  it(`parses response`, test(
    {
      headers: {'content-type': `application/sparql-results+json`},
      body: {
        head: {vars: [`id`, `label`]},
        results: {
          bindings: [
            {
              id: {type: `uri`, value: `http://www.wikidata.org/entity/Q123`},
              label: {'xml:lang': `en`, type: `literal`, value: `abc`}
            },
            {
              id: {type: `uri`, value: `http://www.wikidata.org/entity/Q456`},
              label: {'xml:lang': `en`, type: `literal`, value: `xyz`}
            }
          ]
        }
      }
    },
    {Q123: {label: `abc`}, Q456: {label: `xyz`}}
  ));

});
