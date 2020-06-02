const Request = require('../../../actions/Request');
const axios = require('axios');

jest.mock('axios');

let request;

describe('Request functionality', () => {

    beforeEach(async () => {
        request = new Request();
    });

    it('calls getCashInCommission function', () => {
        const fakeData = [{"date": "2016-02-23", "type": "cash_out", "operation": {"amount": 11111.00}}];
        const fakeResponse = {data: fakeData};
        axios.get.mockResolvedValue(fakeResponse);
        return request.axiosCall('https://www.test.lt/api/v1/fakeData')
            .then(data => expect(data).toEqual(fakeData));
    });
});