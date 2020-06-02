const {getCommission} = require('../utils/financial');

class CashIn {
    constructor(config) {
        this.cashInCommission = config.cashIn.getCommissionPercents();
        this.maxCashInCommission = config.cashIn.getMaxCommissionAmount();
    }

    init = transfer => this.getCashInCommission(transfer);

    getCashInCommission = transfer => {
        const commission = getCommission(transfer.operation.amount, this.cashInCommission);
        return commission <= this.maxCashInCommission ? commission : this.maxCashInCommission
    }
}

module.exports = CashIn;