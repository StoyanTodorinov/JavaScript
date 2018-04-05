class PaymentPackage {
    constructor(name, value) {
        this.name = name;
        this.value = value;
        this.VAT = 20;      // Default value
        this.active = true; // Default value
    }

    get name() {
        return this._name;
    }

    set name(newValue) {
        if (typeof newValue !== 'string') {
            throw new Error('Name must be a non-empty string');
        }
        if (newValue.length === 0) {
            throw new Error('Name must be a non-empty string');
        }
        this._name = newValue;
    }

    get value() {
        return this._value;
    }

    set value(newValue) {
        if (typeof newValue !== 'number') {
            throw new Error('Value must be a non-negative number');
        }
        if (newValue < 0) {
            throw new Error('Value must be a non-negative number');
        }
        this._value = newValue;
    }

    get VAT() {
        return this._VAT;
    }

    set VAT(newValue) {
        if (typeof newValue !== 'number') {
            throw new Error('VAT must be a non-negative number');
        }
        if (newValue < 0) {
            throw new Error('VAT must be a non-negative number');
        }
        this._VAT = newValue;
    }

    get active() {
        return this._active;
    }

    set active(newValue) {
        if (typeof newValue !== 'boolean') {
            throw new Error('Active status must be a boolean');
        }
        this._active = newValue;
    }

    toString() {
        const output = [
            `Package: ${this.name}` + (this.active === false ? ' (inactive)' : ''),
            `- Value (excl. VAT): ${this.value}`,
            `- Value (VAT ${this.VAT}%): ${this.value * (1 + this.VAT / 100)}`
        ];
        return output.join('\n');
    }
}

let expect = require('chai').expect;

describe("Test payment", function () {
    let paymentPackage;

    beforeEach(function () {
        paymentPackage = new PaymentPackage('Pesho', 20);
    });

    describe('Test constructor', function () {
        it('should be only instantiated with two params', function () {
            expect(() => new PaymentPackage()).to.throw(Error, 'Name must be a non-empty string');
            expect(() => new PaymentPackage('Pesho')).to.throw(Error, 'Value must be a non-negative number');
        });
    });

    describe('Test if accessors and functions are attached', function () {
        it('', function () {
            expect(paymentPackage.name).not.equal(undefined);
            expect(paymentPackage.value).not.equal(undefined);
            expect(paymentPackage.VAT).not.equal(undefined);
            expect(paymentPackage.active).not.equal(undefined);
            expect(PaymentPackage.prototype.hasOwnProperty('toString')).not.equal(undefined);
            expect(PaymentPackage.prototype.hasOwnProperty('active')).not.equal(undefined);
            expect(PaymentPackage.prototype.hasOwnProperty('value')).not.equal(undefined);
            expect(PaymentPackage.prototype.hasOwnProperty('name')).not.equal(undefined);
            expect(PaymentPackage.prototype.hasOwnProperty('VAT')).not.equal(undefined);
        });
    });

    describe('Test get/set name()', function () {
        //GET
        it('should return the correct name', function () {
            expect(paymentPackage.name).equal('Pesho');
            expect(paymentPackage.name).equal(paymentPackage._name);
        });
        //SET
        it('should throw with empty string', function () {
            expect(() => paymentPackage.name = '').to.throw(Error, 'Name must be a non-empty string');
        });
        it('should throw with non-string', function () {
            expect(() => paymentPackage.name = 10).to.throw(Error, 'Name must be a non-empty string');
            expect(() => paymentPackage.name = {}).to.throw(Error, 'Name must be a non-empty string');
        });
        it('should work correctly', function () {
            paymentPackage.name = 'Stoyan';
            expect(paymentPackage.name).equal('Stoyan');
            expect(paymentPackage.name).equal(paymentPackage._name);
            paymentPackage.name = ' ';
            expect(paymentPackage.name).equal(' ');
        });
    });

    describe('Test get/set value()', function () {
        //GET
        it('should return the correct value', function () {
            expect(paymentPackage.value).equal(20);
            expect(paymentPackage.value).equal(paymentPackage._value);
        });
        //SET
        it('should throw with non-number', function () {
            expect(() => paymentPackage.value = 'asd').to.throw(Error, 'Value must be a non-negative number');
            expect(() => paymentPackage.value = []).to.throw(Error, 'Value must be a non-negative number');
        });
        it('should throw with negative number', function () {
            expect(() => paymentPackage.value = -10).to.throw(Error, 'Value must be a non-negative number');
        });
        it('should work correctly', function () {
            paymentPackage.value = 100;
            expect(paymentPackage.value).equal(100);
            paymentPackage.value = 0;
            expect(paymentPackage.value).equal(0);
        });
    });

    describe('Test get/set VAT()', function () {
        //GET
        it('should return the correct default value', function () {
            expect(paymentPackage.VAT).equal(20);
            expect(paymentPackage.VAT).equal(paymentPackage._VAT);
        });
        //SET
        it('should throw with non-number', function () {
            expect(() => paymentPackage.VAT = 'asd').to.throw(Error, 'VAT must be a non-negative number');
            expect(() => paymentPackage.VAT = new Date()).to.throw(Error, 'VAT must be a non-negative number');
        });
        it('should throw with negative number', function () {
            expect(() => paymentPackage.VAT = -10).to.throw(Error, 'VAT must be a non-negative number');
            expect(() => paymentPackage.VAT = -1).to.throw(Error, 'VAT must be a non-negative number');
        });
        it('should work correctly', function () {
            paymentPackage.VAT = 99;
            expect(paymentPackage.VAT).equal(99);
            paymentPackage.VAT = 0;
            expect(paymentPackage.VAT).equal(0);
        });
    });

    describe('Test get/set active()', function () {
        //GET
        it('should return the correct default value', function () {
            expect(paymentPackage.active).equal(true);
            expect(paymentPackage.active).equal(paymentPackage._active);
        });
        //SET
        it('should throw with non-boolean', function () {
            expect(() => paymentPackage.active = 'asd').to.throw(Error, 'Active status must be a boolean');
            expect(() => paymentPackage.active = 10).to.throw(Error, 'Active status must be a boolean');
            expect(() => paymentPackage.active = {}).to.throw(Error, 'Active status must be a boolean');
            expect(() => paymentPackage.active = 0).to.throw(Error, 'Active status must be a boolean');
            expect(() => paymentPackage.active = 1).to.throw(Error, 'Active status must be a boolean');
        });
        it('should work correctly', function () {
            paymentPackage.active = false;
            expect(paymentPackage.active).equal(false);
        });
    });

    describe('Test toString() method', function () {
        it('should return correct data when active', function () {
            let result = [
                "Package: Pesho",
                "- Value (excl. VAT): 20",
                "- Value (VAT 20%): 24"
                ].join('\n');
            expect(paymentPackage.toString()).equal(result);
        });
        it('should return correct data when inactive', function () {
            paymentPackage.active = false;
            let result = [
                "Package: Pesho (inactive)",
                "- Value (excl. VAT): 20",
                "- Value (VAT 20%): 24"
            ].join('\n');
            expect(paymentPackage.toString()).equal(result);
        });
    })
});
