const crypto = require('crypto');

class UIDS {
    constructor() {}
    uuid_v1() {
        const time = Date.now() + 12219292800000;
        const timeLow = ((time & 0xffffffff) >>> 0).toString(16).padStart(8, '0');
        const timeMid = ((time >>> 32) & 0xffff).toString(16).padStart(4, '0');
        const timeHi = ((time >>> 48) & 0x0fff) | 0x1000;
        const clockSeq = (crypto.randomBytes(2).readUInt16BE(0) & 0x3fff | 0x8000).toString(16).padStart(4, '0');
        const node = crypto.randomBytes(6).toString('hex');

        return `${timeLow}-${timeMid}-${timeHi.toString(16).padStart(4, '0')}-${clockSeq}-${node}`;
    }

    uuid_v2(domain, identifier) {

        let r = size => crypto.randomBytes(size);
        const time = Date.now() + 12219292800000;
        const timeLow = ((time & 0xffffffff) >>> 0).toString(16).padStart(8, '0');
        const timeMid = ((time >>> 32) & 0xffff).toString(16).padStart(4, '0');
        const timeHi = ((time >>> 48) & 0x0fff) | 0x2000;
        const clockSeqHigh = ((r(1)[0] & 0x3f) | 0x80).toString(16).padStart(2, '0');
        const clockSeqLow = r(1)[0].toString(16).padStart(2, '0');
        const nodePart1 = (domain & 0xf).toString(16);
        const nodePart2 = (identifier & 0xfffffffffff).toString(16).padStart(12 - nodePart1.length, '0');

        return `${timeLow}-${timeMid}-${timeHi.toString(16)}-${clockSeqHigh}${clockSeqLow}-${nodePart1}${nodePart2}`;
    }


    uuid_v3(namespace, name) {
        let hash;
        if (typeof window !== 'undefined' && window.crypto) {
            const encoder = new TextEncoder();
            const data = encoder.encode(namespace + name);
            hash = Array.from(new Uint8Array(crypto.subtle.digest('MD5', data)));
        } else if (typeof require !== 'undefined') {
            const crypto = require('crypto');
            hash = crypto.createHash('md5').update(namespace + name).digest('hex');
        } else {
            throw new Error('UUID: uuid v3 generation is not supported in this environment.');
        }

        const parts = [
            hash.substr(0, 8),
            hash.substr(8, 4),
            '3' + hash.substr(13, 3),
            '8' + hash.substr(16, 3),
            hash.substr(20, 12),
        ];

        return parts.join('-');
    }

    uuid_v4(){

        let c, r;
        if (typeof window !== 'undefined' && (window.crypto || window.msCrypto)) {
            c = window.crypto || window.msCrypto;
            r = (size) => {
                const arr = new Uint8Array(size);
                c.getRandomValues(arr);
                return Array.from(arr);
            };
        } else if (typeof require !== 'undefined') {
            const crypto = require('crypto');
            c = {
                getRandomValues: (arr) => crypto.randomFillSync(arr),
            };
            r = (size) => Array.from(crypto.randomBytes(size));
        } else {
            throw new Error('UUID: uuid v4 generation is not supported in this environment.');
        }

        const parts = [
            r(4).map((byte) => byte.toString(16).padStart(2, '0')).join(''),
            r(2).map((byte) => byte.toString(16).padStart(2, '0')).join(''),
            '4' + r(2).map((byte) => byte.toString(16).padStart(2, '0')).join('').slice(-3),
            '8' + r(2).map((byte) => byte.toString(16).padStart(2, '0')).join('').slice(-3),
            r(6).map((byte) => byte.toString(16).padStart(2, '0')).join(''),
        ];

        return parts.join('-');

    }

    uuid_v5(namespace, name) {
        let hash;
        if (typeof window !== 'undefined' && window.crypto) {
            const encoder = new TextEncoder();
            const data = encoder.encode(namespace + name);
            hash = Array.from(new Uint8Array(crypto.subtle.digest('SHA-1', data)));
        } else if (typeof require !== 'undefined') {
            const crypto = require('crypto');
            hash = crypto.createHash('sha1').update(namespace + name).digest('hex');
        } else {
            throw new Error('uuid_v5: Generation is not supported in this environment.');
        }

        const parts = [
            hash.substr(0, 8),
            hash.substr(8, 4),
            '5' + hash.substr(13, 3),
            '8' + hash.substr(16, 3),
            hash.substr(20, 12),
        ];

        return parts.join('-');
    }

    random_code_numeric(length) {
        let code = '';
        for (let i = 0; i < length; i++) {
            code += Math.floor(Math.random() * 10).toString();
        }
        return code;
    }

    random_code_strings(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    random_code_alphanumeric(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    uuid_v6(launchTime, nodeId, prefix) {
        if (!/^[a-zA-Z0-9]{2}$/.test(prefix)) {
            throw new Error('Prefix must be exactly two alphanumeric characters long.');
        }

        const isValidDate = !isNaN(Date.parse(launchTime));
        const customEpoch = isValidDate ? new Date(launchTime).getTime() : new Date('1970-01-01T00:00:00Z').getTime();

        const time = (Date.now() - customEpoch) * 10000;
        const timeLow = ((time & 0xffffffff) >>> 0).toString(16).padStart(8, '0');
        const timeMid = ((time >>> 32) & 0xffff).toString(16).padStart(4, '0');
        const timeHiAndVersion = (((time >>> 48) & 0x0fff) | 0x6000).toString(16).padStart(4, '0');
        const node = nodeId.substring(0, 12).padEnd(12, '0');
        const clockSeq = crypto.randomBytes(2).toString('hex').padStart(4, '0');

        return `${prefix}.${timeLow}.${timeMid}.${timeHiAndVersion}.${clockSeq}.${node}`;
    }

}



module.exports = UIDS;