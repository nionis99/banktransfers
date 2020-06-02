const CashOut = require('../../../actions/CashOut');
const Config = require('../../../config/Config');

let cashOut;
let config;
let fakeCashOutData;

describe('Cash out functionality', () => {

    beforeEach(async () => {
        config = new Config();
        await config.requestConfig();
        cashOut = new CashOut(config);
    });

    it('calls getCashOutCommission function', () => {
        fakeCashOutData = {type: 'cash_out', user_type: "juridical", operation: {amount: 100, currency: 'EUR'}};
        cashOut.getCashOutCommission = jest.fn();
        cashOut.init(fakeCashOutData);
        expect(cashOut.getCashOutCommission).toHaveBeenCalledWith(fakeCashOutData);
    });

    it('should call method by user type juridical', () => {
        fakeCashOutData = {type: 'cash_out', user_type: "juridical", operation: {amount: 50000, currency: 'EUR'}};
        cashOut.juridicalCashOutCommission = jest.fn();
        cashOut.getCashOutCommission(fakeCashOutData);
        expect(cashOut.juridicalCashOutCommission).toHaveBeenCalledWith(fakeCashOutData);
    });

    it('should call method by user type natural', () => {
        fakeCashOutData = {type: 'cash_out', user_type: "natural", operation: {amount: 50000, currency: 'EUR'}};
        cashOut.naturalCashOutCommission = jest.fn();
        cashOut.getCashOutCommission(fakeCashOutData);
        expect(cashOut.naturalCashOutCommission).toHaveBeenCalledWith(fakeCashOutData);
    });

    it('should return minimal juridical person commission', () => {
        fakeCashOutData = {type: 'cash_out', user_type: "juridical", operation: {amount: 100, currency: 'EUR'}};
        const expectedResult = config.cashOutJuridical.getMinAmount();
        const actualResult = cashOut.juridicalCashOutCommission(fakeCashOutData);
        expect(actualResult).toEqual(expectedResult);
    });

    it('should calculate juridical person commission', () => {
        fakeCashOutData = {type: 'cash_out', user_type: "juridical", operation: {amount: 50000, currency: 'EUR'}};
        const expectedResult = 150;
        const actualResult = cashOut.juridicalCashOutCommission(fakeCashOutData);
        expect(actualResult).toEqual(expectedResult);
    });

    it('should calculate juridical person commission', () => {
        fakeCashOutData = {type: 'cash_out', user_type: "juridical", operation: {amount: 50000, currency: 'EUR'}};
        const expectedResult = 150;
        const actualResult = cashOut.juridicalCashOutCommission(fakeCashOutData);
        expect(actualResult).toEqual(expectedResult);
    });

    it('return 0 natural person commission when limit not exceeded', () => {
        fakeCashOut = {date: "2019-01-01", user_id: 2, user_type: "natural", operation: {amount: 999.00}};
        const expectedResult = 0;
        const actualResult = cashOut.naturalCashOutCommission(fakeCashOut);
        expect(actualResult).toEqual(expectedResult);
    });

    it('counts cashOut natural person commission after limit exceeded', () => {
        fakeCashOut = {date: "2019-01-01", user_id: 2, user_type: "natural", operation: {amount: 1200.00}};
        const expectedResult = 0.6;
        const actualResult = cashOut.naturalCashOutCommission(fakeCashOut);
        expect(actualResult).toEqual(expectedResult);
    });

    it('returns amount minus week limit', () => {
        const weekAmount = 1100;
        const amount = 410;
        const expectedAmount = 100;
        const actualAmount = cashOut.checkLimitAndReturnAmount(amount, weekAmount);
        expect(actualAmount).toEqual(expectedAmount);
    });

});