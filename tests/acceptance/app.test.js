const fs = require('fs');
const Commission = require('../../actions/Commission');
const Config = require('../../config/Config');

let config;
let commission;
let input;

describe('Acceptance commission calculation test', () => {

    beforeEach(async () => {
        input = 'testInput.json';
        config = new Config();
        await config.requestConfig();
        commission = new Commission(config);
    });

    it('returns commissions of test data file', async () => {
        const data = JSON.parse(fs.readFileSync(input));
        const testResult = [0.06, 0.90, 87.00, 3.00, 0.30, 0.30, 5.00, 0.00, 0.00];
        await commission.calculate(data);
        expect(commission.allCommissions).toEqual(testResult);
    });
});