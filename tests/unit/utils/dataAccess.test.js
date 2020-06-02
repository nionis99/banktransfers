const {getData} = require('../../../utils/dataAccess');
const fs = require('fs');

const input = 'testInput.json';
let transfers;

describe('dataAccess util', () => {

    beforeEach(() => {
        transfers = getData(input);
    });

    it('reads data file', () => {
        const expectedData = JSON.parse(fs.readFileSync(input));
        expect(transfers).toEqual(expectedData);
    });
});