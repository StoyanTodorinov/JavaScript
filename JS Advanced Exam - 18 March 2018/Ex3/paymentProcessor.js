class PaymentProcessor {
    constructor(obj) {
        this.payments = new Map();
        this._options = {
            types: ["service", "product", "other"],
            precision: 2
        };
        this.setOptions(obj);
    }

    get options() {
        return this._options;
    }

    set options(obj) {
        if (obj) {
            let types = obj.types;
            let pres = obj.precision;
            if (pres) {
                this._options.precision = pres;
            }
            if (types) {
                this._options.types = types;
            }
        }
    }

    registerPayment(id, name, type, value) {
        if (this.payments.has(id) || typeof id !== 'string' || id.length <= 0) {
            throw new Error('Invalid id or id exists');
        }
        if (typeof name !== 'string' || name.length <= 0) {
            throw new Error('Invalid name');
        }
        if (!this.options.types.includes(type)) {
            throw new Error('Invalid type');
        }
        value = value.toFixed(Number(this.options.precision));
        this.payments.set(id, {name, type, value});
    }

    deletePayment(id) {
        if (!this.payments.has(id)) {
            throw new Error('ID not found');
        }
        this.payments.delete(id);
    }

    get(id) {
        if (!this.payments.has(id)) {
            throw new Error('ID not found');
        }
        let payment = this.payments.get(id);
        return `Details about payment ID: ${id}
- Name: ${payment.name}
- Type: ${payment.type}
- Value: ${payment.value}`;
    }

    setOptions(obj) {
        this.options = obj;
    }

    toString() {
        return `Summary:
- Payments: ${this.payments.size}
- Balance: ${this.getBalance()}`;
    }

    getBalance() {
        let sum = 0;
        for (let [id, obj] of this.payments) {
            sum += Number(obj.value);
        }
        return sum.toFixed(this.options.precision);
    }
}

// Initialize processor with default options
const generalPayments = new PaymentProcessor();
generalPayments.registerPayment('0001', 'Microchips', 'product', 15000);
generalPayments.registerPayment('01A3', 'Biopolymer', 'product', 23000);
console.log(generalPayments.toString());

// //DONE
// // Should throw an error (invalid type)
// generalPayments.registerPayment('E028', 'Rare-earth elements', 'materials', 8000);

generalPayments.setOptions({types: ['product', 'material']});
generalPayments.registerPayment('E028', 'Rare-earth elements', 'material', 8000);
console.log(generalPayments.get('E028'));
generalPayments.registerPayment('CF15', 'Enzymes', 'material', 55000);

// // DONE
// // Should throw an error (ID not found)
// generalPayments.deletePayment('E027');
// // Should throw an error (ID not found)
// generalPayments.get('E027');

generalPayments.deletePayment('E028');
console.log(generalPayments.toString());

// Initialize processor with custom types
const servicePyaments = new PaymentProcessor({types: ['service']});
servicePyaments.registerPayment('01', 'HR Consultation', 'service', 3000);
servicePyaments.registerPayment('02', 'Discount', 'service', -1500);
console.log(servicePyaments.toString());

// Initialize processor with custom precision
const transactionLog = new PaymentProcessor({precision: 5});
transactionLog.registerPayment('b5af2d02-327e-4cbf', 'Interest', 'other', 0.00153);
console.log(transactionLog.toString());
