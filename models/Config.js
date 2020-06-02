class Config {
    constructor(percents) {
        this.percents = percents;
    }

    getCommissionPercents() {
        return this.percents;
    }
}

class CashIn extends Config {
    constructor(percents, max) {
        super(percents);
        this.max = max;
    }

    getMaxCommissionAmount() {
        return this.max.amount;
    }
}

class CashOutNatural extends Config {
    constructor(percents, weekLimit) {
        super(percents);
        this.weekLimit = weekLimit;
    }

    getWeekLimitAmount() {
        return this.weekLimit.amount;
    }
}

class CashOutJuridical extends Config {
    constructor(percents, min) {
        super(percents);
        this.min = min;
    }

    getMinAmount() {
        return this.min.amount;
    }
}

module.exports = {CashIn, CashOutJuridical, CashOutNatural};