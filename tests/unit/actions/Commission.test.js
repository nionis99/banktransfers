const Commission = require('../../../actions/Commission');
const Config = require('../../../config/Config');

let commission;
let config;
let fakeData;

describe('Commission functionality', () => {

    beforeEach(async () => {
        config = new Config();
        await config.requestConfig();
        commission = new Commission(config);
        fakeData = getFakeData();
    });

    it('calculates commissions', async () => {
        const expectedResult = [0.06, 0.90, 87.00, 3.00];
        await commission.calculate(fakeData);
        expect(commission.allCommissions).toEqual(expectedResult);
    });
});

const getFakeData = () => [
    {
        "date": "2016-01-05",
        "user_id": 1,
        "user_type": "natural",
        "type": "cash_in",
        "operation": {"amount": 200.00, "currency": "EUR"}
    },
    {
        "date": "2016-01-06",
        "user_id": 2,
        "user_type": "juridical",
        "type": "cash_out",
        "operation": {"amount": 300.00, "currency": "EUR"}
    },
    {
        "date": "2016-01-06",
        "user_id": 1,
        "user_type": "natural",
        "type": "cash_out",
        "operation": {"amount": 30000, "currency": "EUR"}
    },
    {
        "date": "2016-01-07",
        "user_id": 1,
        "user_type": "natural",
        "type": "cash_out",
        "operation": {"amount": 1000.00, "currency": "EUR"}
    }
];