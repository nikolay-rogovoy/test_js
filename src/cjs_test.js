let current = Object.create(null);

class Zone {
    constructor() {
        console.log('zone created');
    }

    run(callback) {
        const zone = this;
        return function (...args) {
            return zone.run(callback, this, args);
        }
    }
}

current = new Zone();

module.exports = {
    get current() {
        return current;
    },
};
