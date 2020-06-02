const getCommission = (amount, commission) => amount * commission / 100;

const financialCeiling = (array) => {
    array.forEach(function (part, index) {
        this[index] = (Math.ceil(this[index] * 100) / 100).toFixed(2);
    }, array);
}

module.exports = {getCommission, financialCeiling};