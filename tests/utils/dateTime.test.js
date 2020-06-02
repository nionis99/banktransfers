const {checkDate} = require('../../utils/dateTime');

let firstDate;
let secondDate;
let expectedResult;

describe('dateTime functions', () => {

    it('returns true then dates equal', () => {
        firstDate = '2018-06-12';
        secondDate = '2018-06-15';
        expectedResult = true;
        const actualResult = checkDate(firstDate, secondDate);
        expect(actualResult).toEqual(expectedResult);
    });

    it('returns true then dates equal', () => {
        firstDate = '2017-06-12';
        secondDate = '2018-05-15';
        expectedResult = false;
        const actualResult = checkDate(firstDate, secondDate);
        expect(actualResult).toEqual(expectedResult);
    });
});