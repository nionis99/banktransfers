const {checkDate} = require('./utils/dateTime');
const Constants = require('./constants.js');
const {getCommission} = require('./utils/financial');

let commission;

class Calculations {
    static commissions = [];
    static cashOuts = [];

    static cashOut = transfer => {
        commission = this.getCashOutCommission(transfer);
        this.commissions.push(commission);
    }

    static cashIn = transfer => {
        commission = this.getCashInCommission(transfer);
        this.commissions.push(commission);
    }

    static calculateTransfersCommmissions = array => {
        array.forEach(item => item.type === Constants.TRANSFER_TYPES.CASH_IN ? this.cashIn(item) : this.cashOut(item));
    }

    static getCashInCommission = transfer => {
        commission = getCommission(transfer.operation.amount, Constants.CASH_IN_COMMISSION);
        return commission <= Constants.MAX_CASH_IN_COMMISSION ? commission : Constants.MAX_CASH_IN_COMMISSION
    }

    static getCashOutCommission = transfer => {
        const isJuridical = transfer.user_type === Constants.USER_TYPES.JURIDICAL;
        return isJuridical ? this.juridicalCashOutCommission(transfer) : this.naturalCashOutCommission(transfer)
    }

    static juridicalCashOutCommission = transfer => {
        commission = getCommission(transfer.operation.amount, Constants.CASH_OUT_COMMISSION);
        return commission >= Constants.LEGAL_PERSON_MIN_COMMISSION ? commission : Constants.LEGAL_PERSON_MIN_COMMISSION;
    }

    static naturalCashOutCommission = transfer => {
        this.cashOuts.push(transfer);
        const amountOfWeek = this.getAmountOfCashOuts(transfer);
        const amount = this.checkLimitAndReturnAmount(transfer.operation.amount, amountOfWeek);
        return amountOfWeek > Constants.CASH_OUT_WEEK_LIMIT
            ? getCommission(amount, Constants.CASH_OUT_COMMISSION)
            : 0;
    }

    static getAmountOfCashOuts = transfer => this.cashOuts.filter(item => (
        checkDate(item.date, transfer.date) && item.user_id === transfer.user_id
    )).reduce((previous, current) => previous + current.operation.amount, 0);

    static checkLimitAndReturnAmount = (amount, amountOfWeek) => {
        if (amountOfWeek - amount > Constants.CASH_OUT_WEEK_LIMIT) {
            return amount;
        } else if (amountOfWeek > Constants.CASH_OUT_WEEK_LIMIT) {
            return amountOfWeek - 1000;
        }
    }
}

module.exports = Calculations;