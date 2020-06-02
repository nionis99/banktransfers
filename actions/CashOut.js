const checkDate = require('../utils/dateTime');
const {getCommission} = require('../utils/financial');
const Constants = require('../constants');

class CashOut {
    constructor(config) {
        this.cashOuts = [];
        this.cashOutMinAmount = config.cashOutJuridical.getMinAmount();
        this.cashOutWeekLimit = config.cashOutNatural.getWeekLimitAmount();
        this.cashOutCommission = config.cashOutNatural.getCommissionPercents();
    }

    init = transfer => this.getCashOutCommission(transfer);

    getCashOutCommission = transfer => {
        const isJuridical = transfer.user_type === Constants.JURIDICAL;
        return isJuridical ? this.juridicalCashOutCommission(transfer) : this.naturalCashOutCommission(transfer)
    }

    juridicalCashOutCommission = transfer => {
        const commission = getCommission(transfer.operation.amount, this.cashOutCommission);
        return commission >= this.cashOutMinAmount ? commission : this.cashOutMinAmount
    }

    naturalCashOutCommission = transfer => {
        this.cashOuts.push(transfer);
        const amountOfWeek = this.getAmountOfCashOuts(transfer);
        const amount = this.checkLimitAndReturnAmount(transfer.operation.amount, amountOfWeek);
        return amountOfWeek > this.cashOutWeekLimit ? getCommission(amount, this.cashOutCommission) : 0;
    }

    getAmountOfCashOuts = transfer => this.cashOuts.filter(item => (
        checkDate(item.date, transfer.date) && item.user_id === transfer.user_id
    )).reduce((previous, current) => previous + current.operation.amount, 0);

    checkLimitAndReturnAmount = (amount, amountOfWeek) => {
        if (amountOfWeek - amount > this.cashOutWeekLimit) {
            return amount;
        } else if (amountOfWeek > this.cashOutWeekLimit) {
            return amountOfWeek - this.cashOutWeekLimit;
        }
    }
}

module.exports = CashOut;