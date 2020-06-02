const InOut = require('../../utils/InOut');
const fs = require('fs');

const input = 'testInput.json';
let transfers;

describe('InOut util', () => {

    beforeEach(() => {
        transfers = InOut.getData(input);
    });

    it('reads data file', () => {
        const expectedData = JSON.parse(fs.readFileSync(input));
        expect(transfers).toEqual(expectedData);
    });
});