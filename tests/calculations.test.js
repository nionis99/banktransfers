const Constants = require('../constants.js');
const Calculations = require('../calculations');

let fakeCashIn;
let fakeCashOut;

describe('Transfer commissions calculations functions', () => {

    it('counts cashIn commission', () => {
        fakeCashIn = {type: 'cash_in', operation: {amount: 1000, currency: 'EUR'}};
        const expectedResult = [0.3];
        Calculations.cashIn(fakeCashIn);
        expect(Calculations.commissions).toEqual(expectedResult);
    });

    it('returns max commissions if it exceeds', () => {
        fakeCashIn = {type: 'cash_in', operation: {amount: 50000, currency: 'EUR'}};
        const expectedResult = Constants.MAX_CASH_IN_COMMISSION;
        Calculations.cashIn(fakeCashIn);
        expect(Calculations.commissions).toContainEqual(expectedResult);
    });

    it('return 0 natural person commission when limit not exceeded', () => {
        fakeCashOut = {
            date: "2019-01-01", user_id: 2, user_type: "natural", operation: {amount: 999.00, currency: 'EUR'}
        };
        const expectedResult = 0;
        const actualResult = Calculations.naturalCashOutCommission(fakeCashOut);
        expect(actualResult).toEqual(expectedResult);
    })

    it('counts cashOut natural person commission after limit exceeded', () => {
        fakeCashOut = {
            date: "2019-01-01", user_id: 2, user_type: "natural", operation: {amount: 401.00, currency: 'EUR'}
        };
        const expectedResult = 1.2;
        const actualResult = Calculations.naturalCashOutCommission(fakeCashOut);
        expect(actualResult).toEqual(expectedResult);
    })

    it('counts cashOut legal person commission', () => {
        fakeCashOut = {type: 'cash_out', user_type: "juridical", operation: {amount: 1000, currency: 'EUR'}};
        const expectedResult = 3;
        const actualResult = Calculations.juridicalCashOutCommission(fakeCashOut);
        expect(actualResult).toEqual(expectedResult);
    });

    it('returns min legal person commission if lower', () => {
        fakeCashOut = {type: 'cash_out', user_type: "juridical", operation: {amount: 100, currency: 'EUR'}};
        const expectedResult = Constants.LEGAL_PERSON_MIN_COMMISSION;
        const actualResult = Calculations.juridicalCashOutCommission(fakeCashOut);
        expect(actualResult).toEqual(expectedResult);
    });

    it('should call method by user type juridical', () => {
        fakeCashOut = {type: 'cash_out', user_type: "juridical", operation: {amount: 50000, currency: 'EUR'}};
        Calculations.juridicalCashOutCommission = jest.fn();
        Calculations.getCashOutCommission(fakeCashOut);
        expect(Calculations.juridicalCashOutCommission).toHaveBeenCalledWith(fakeCashOut);
    });

    it('should call method by user type natural', () => {
        fakeCashOut = {type: 'cash_out', user_type: "natural", operation: {amount: 50000, currency: 'EUR'}};
        Calculations.naturalCashOutCommission = jest.fn();
        Calculations.getCashOutCommission(fakeCashOut);
        expect(Calculations.naturalCashOutCommission).toHaveBeenCalledWith(fakeCashOut);
    });

    it('calls cashIn function', () => {
        fakeCashIn = [{type: "cash_in", operation: {amount: 1}}];
        Calculations.cashIn = jest.fn();
        Calculations.calculateTransfersCommmissions(fakeCashIn);
        expect(Calculations.cashIn).toHaveBeenCalled();
    });

    it('calls cashOut function', () => {
        fakeCashOut = [{type: "cash_out", operation: {amount: 1}}];
        Calculations.cashOut = jest.fn();
        Calculations.calculateTransfersCommmissions(fakeCashOut);
        expect(Calculations.cashOut).toHaveBeenCalled();
    });

    it('returns amount minus week limit', () => {
        const weekAmount = 1100;
        const amount = 410;
        const expectedAmount = 100;
        const actualAmount = Calculations.checkLimitAndReturnAmount(amount,weekAmount);
        expect(actualAmount).toEqual(expectedAmount);
    })

});