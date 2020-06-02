const getAllCommissions = require('../app');
const Calculations = require('../calculations');

describe('Acceptance commission calculation test', () => {

    it('returns commissions of test data file', () => {
        const input = 'testInput.json';
        const testResult = ['0.06', '0.90', '87.00', '3.00', '0.30', '0.30', '5.00', '0.00', '0.00'];
        getAllCommissions(input);
        expect(Calculations.commissions).toEqual(testResult);
    });
});