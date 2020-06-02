const CashIn = require('../../../actions/CashIn');
const Config = require('../../../config/Config');

let cashIn;
let config;

describe('Cash in functionality', () => {

    beforeEach(async () => {
        config = new Config();
        await config.requestConfig();
        cashIn = new CashIn(config);
    });

    it('calls getCashInCommission function', () => {
        fakeCashIn = {type: 'cash_in', operation: {amount: 1000, currency: 'EUR'}};
        cashIn.getCashInCommission = jest.fn();
        cashIn.init(fakeCashIn);
        expect(cashIn.getCashInCommission).toHaveBeenCalledWith(fakeCashIn);
    });

    it('returns commissions', () => {
        fakeCashIn = {type: 'cash_in', operation: {amount: 1000, currency: 'EUR'}};
        const expectedResult = 0.3;
        const actualResult = cashIn.getCashInCommission(fakeCashIn);
        expect(actualResult).toEqual(expectedResult);
    });

    it('returns max commissions if it exceeds', () => {
        fakeCashIn = {type: 'cash_in', operation: {amount: 50000, currency: 'EUR'}};
        const expectedResult = config.cashIn.getMaxCommissionAmount();
        const actualResult = cashIn.getCashInCommission(fakeCashIn);
        expect(actualResult).toEqual(expectedResult);
    });
});
