const Config = require('../../../config/Config');
const Constants = require('../../../constants');

let config;

describe('config functionality', () => {

    beforeEach(() => {
        config = new Config();
    })

    it('returns cashIn configuration from api', async () => {
        const cashInPercents = 0.03;
        const maxAmount = 5;
        await config.setCashInConfig(Constants.CASH_IN_CONFIG_API);
        expect(config.cashIn.getCommissionPercents()).toEqual(cashInPercents);
        expect(config.cashIn.getMaxCommissionAmount()).toEqual(maxAmount);
    });

    it('returns cashIn juridical person configuration from api', async () => {
        const cashOutPercents = 0.3;
        const minAmount = 0.5;
        await config.setCashOutJuridicalConfig(Constants.CASH_OUT_JURIDICAL_CONFIG_API);
        expect(config.cashOutJuridical.getCommissionPercents()).toEqual(cashOutPercents);
        expect(config.cashOutJuridical.getMinAmount()).toEqual(minAmount);
    });

    it('returns cashOut natural person configuration from api', async () => {
        const cashOutPercents = 0.3;
        const weekLimitAmount = 1000;
        await config.setCashOutNaturalConfig(Constants.CASH_OUT_NATURAL_CONFIG_API);
        expect(config.cashOutNatural.getCommissionPercents()).toEqual(cashOutPercents);
        expect(config.cashOutNatural.getWeekLimitAmount()).toEqual(weekLimitAmount);
    });
});