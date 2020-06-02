const CashIn = require('./CashIn');
const CashOut = require('./CashOut');
const Constants = require('../constants');

class Commission {
    constructor(config) {
        this.cashIn = new CashIn(config);
        this.cashOut = new CashOut(config);
        this.allCommissions = [];
    }

    calculate = async transfers => {
        await transfers.forEach(item =>
            this.allCommissions.push(
                item.type === Constants.CASH_IN ? this.cashIn.init(item) : this.cashOut.init(item)
            )
        );
    }
}

module.exports = Commission;