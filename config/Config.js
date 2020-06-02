const {CashIn, CashOutJuridical, CashOutNatural} = require('../models/Config');
const Request = require('../actions/Request');
const Constants = require('../constants');

class Config extends Request {
    constructor() {
        super();
        this.cashIn = new CashIn();
        this.cashOutJuridical = new CashOutJuridical();
        this.cashOutNatural = new CashOutNatural();
    }

    async requestConfig() {
        await this.setCashInConfig(Constants.CASH_IN_CONFIG_API);
        await this.setCashOutJuridicalConfig(Constants.CASH_OUT_JURIDICAL_CONFIG_API);
        await this.setCashOutNaturalConfig(Constants.CASH_OUT_NATURAL_CONFIG_API);
    }

    setCashInConfig(url) {
        return this.axiosCall(url)
            .then(data => this.cashIn = new CashIn(data.percents, data.max))
            .catch(error => process.stdout.write(error));
    }

    setCashOutJuridicalConfig(url) {
        return this.axiosCall(url)
            .then(data => this.cashOutJuridical = new CashOutJuridical(data.percents, data.min))
            .catch(error => process.stdout.write(error))
    }

    setCashOutNaturalConfig(url) {
        return this.axiosCall(url)
            .then(data => this.cashOutNatural = new CashOutNatural(data.percents, data.week_limit))
            .catch(error => process.stdout.write(error))
    }
}

module.exports = Config;