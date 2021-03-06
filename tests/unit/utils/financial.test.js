const {getCommission, financialCeiling} = require('../../../utils/financial');

describe('financial functions', () => {

    it('counts commissions by amount and commission percents', () => {
        const commissionPercent = 0.5;
        const amount = 200;
        const expectedData = 1;
        const actualData = getCommission(amount,commissionPercent);
        expect(actualData).toEqual(expectedData);
    });

    it('returns ceiled numbers', () => {
        const testArray = ['2.112', '0.000000001', '9.9101', '0.023'];
        const expectedResult = ['2.12', '0.01', '9.92', '0.03'];
        financialCeiling(testArray);
        expect(testArray).toEqual(expectedResult);
    })
});