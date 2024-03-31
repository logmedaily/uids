const UIDS = require('../lib');
const uuid = new UIDS();


describe('UUID Tests', () => {
    test('UUID v1', () => {
        const uuid_v1 = uuid.uuid_v1();
        console.log(uuid_v1);
        expect(typeof uuid_v1).toBe('string');
        expect(uuid_v1.length).toBe(36);
        expect(uuid_v1.split('-').length).toBe(5);
        expect(/^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(uuid_v1)).toBe(true);
    });

    test('UUID v2', () => {
        const domain = 0xa;
        const identifier = 1;
        const uuid_v2 = uuid.uuid_v2(domain, identifier);
        console.log(uuid_v2);
        expect(typeof uuid_v2).toBe('string');
        expect(uuid_v2.length).toBe(36);
        expect(uuid_v2.split('-').length).toBe(5);
        expect(/^[0-9a-f]{8}-[0-9a-f]{4}-2[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(uuid_v2)).toBe(true);
        expect(uuid_v2.slice(-12)).toBe((domain & 0xf).toString(16) + identifier.toString(16).padStart(11, '0'));

    });


    test('UUID v3', () => {
        const namespace = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
        const name = 'example.com';
        const uuid_v3 = uuid.uuid_v3(namespace, name);
        console.log(uuid_v3);
        expect(typeof uuid_v3).toBe('string');
        expect(uuid_v3.length).toBe(36);
        expect(uuid_v3.split('-').length).toBe(5);
        expect(/^[0-9a-f]{8}-[0-9a-f]{4}-3[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(uuid_v3)).toBe(true);
    });

    test('UUID v4', () => {
        const uuid_v4 = uuid.uuid_v4();
        console.log(uuid_v4);
        expect(typeof uuid_v4).toBe('string');
        expect(uuid_v4.length).toBe(36);
        expect(uuid_v4.split('-').length).toBe(5);
        expect(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(uuid_v4)).toBe(true);
    });

    test('UUID v5', () => {
        const namespace = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
        const name = 'example.com';
        const uuid_v5 = uuid.uuid_v5(namespace, name);
        console.log(uuid_v5);
        expect(typeof uuid_v5).toBe('string');
        expect(uuid_v5.length).toBe(36);
        expect(uuid_v5.split('-').length).toBe(5);
        expect(/^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(uuid_v5)).toBe(true);
    });

    describe('UUID RFC Compliant Tests', () => {

        test('UUID v1 is compliant with RFC 4122', () => {
            const uuidV1 = uuid.uuid_v1();
            expect(uuidV1).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
        });

        test('UUID v2 is compliant with RFC 4122 and includes DCE security features', () => {
            const domain = 0xa;
            const identifier = 1;
            const uuidV2 = uuid.uuid_v2(domain, identifier);
            expect(uuidV2).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-2[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
            expect(uuidV2.slice(-12)).toMatch(new RegExp(`${domain.toString(16)}[0-9a-f]{11}`));
        });

        test('UUID v3 is compliant with RFC 4122 and generates name-based UUID using MD5 hash', () => {
            const namespace = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
            const name = 'example.com';
            const uuidV3 = uuid.uuid_v3(namespace, name);
            expect(uuidV3).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-3[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
        });

        test('UUID v4 is compliant with RFC 4122 and generates fully random UUIDs', () => {
            const uuidV4 = uuid.uuid_v4();
            expect(uuidV4).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
        });

        test('UUID v5 is compliant with RFC 4122 and generates name-based UUID using SHA-1 hash', () => {
            const namespace = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
            const name = 'example.com';
            const uuidV5 = uuid.uuid_v5(namespace, name);
            expect(uuidV5).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
        });

        test('random_code_numeric generates a numeric string of the correct length', () => {
            const length = 10;
            const code = uuid.random_code_numeric(length);
            expect(code.length).toBe(length);
            expect(/^\d+$/.test(code)).toBe(true);
        });

        test('random_code_strings generates a string of letters of the correct length', () => {
            const length = 10;
            const code = uuid.random_code_strings(length);
            expect(code.length).toBe(length);
            expect(/^[A-Za-z]+$/.test(code)).toBe(true);
        });

        test('random_code_alphanumeric generates an alphanumeric string of the correct length', () => {
            const length = 10;
            const code = uuid.random_code_alphanumeric(length);
            expect(code.length).toBe(length);
            expect(/^[A-Za-z0-9]+$/.test(code)).toBe(true);
        });

    });

    const length = 10;

    test('random_code_numeric generates a numeric string of the correct length', () => {
        const code = uuid.random_code_numeric(length);
        expect(code.length).toBe(length);
        expect(/^\d+$/.test(code)).toBe(true);
    });

    test('random_code_strings generates a string of letters of the correct length', () => {
        const code = uuid.random_code_strings(length);
        expect(code.length).toBe(length);
        expect(/^[A-Za-z]+$/.test(code)).toBe(true);
    });

    test('random_code_alphanumeric generates an alphanumeric string of the correct length', () => {
        const code = uuid.random_code_alphanumeric(length);
        expect(code.length).toBe(length);
        expect(/^[A-Za-z0-9]+$/.test(code)).toBe(true);
    });

    test('Generates a valid uuid_v6 with correct format including dot in prefix', () => {
        const nodeId = 'a1b2c3d4e5f678901234567890abcdef';
        const launchTime = '2020-01-01T00:00:00Z';
        const prefix = "yo";
        const result = uuid.uuid_v6(launchTime, nodeId, prefix);
        console.log(result);

        expect(result).toMatch(/^[a-zA-Z0-9]{2}\.[0-9a-f]{8}\.[0-9a-f]{4}\.[0-9a-f]{4}\.[0-9a-f]{4}\.[0-9a-f]{12}$/);
        expect(result.endsWith(nodeId.substring(0, 12))).toBe(true);
    });

    test('Handles invalid launchTime gracefully', () => {
        const nodeId = 'a1b2c3d4e5f678901234567890abcdef';
        const launchTime = 'invalid-date';
        const result = uuid.uuid_v6(launchTime, nodeId, "yo");

        expect(result).toMatch(/^[a-zA-Z0-9]{2}\.[0-9a-f]{8}\.[0-9a-f]{4}\.[0-9a-f]{4}\.[0-9a-f]{4}\.[0-9a-f]{12}$/);
    });


    test('Handles invalid prefix gracefully', () => {
        const nodeId = 'a1b2c3d4e5f678901234567890abcdef';
        const launchTime = '2024-03-31T12:00:00Z';
        const invalidPrefix = 'abc';
        expect(() => {
            uuid.uuid_v6(launchTime, nodeId, invalidPrefix);
        }).toThrow("Prefix must be exactly two alphanumeric characters long.");
    });


    test('Generates different uuids for different nodeIds', () => {
        const launchTime = '2020-01-01T00:00:00Z';
        const nodeId1 = 'a1b2c3d4e5f678901234567890abcdef';
        const nodeId2 = 'fedcba9876543210fedcba9876543210';
        const result1 = uuid.uuid_v6(launchTime, nodeId1, "yo");
        const result2 = uuid.uuid_v6(launchTime, nodeId2, "yo");

        expect(result1).not.toEqual(result2);
        expect(result1.endsWith(nodeId1.substring(0, 12))).toBe(true);
        expect(result2.endsWith(nodeId2.substring(0, 12))).toBe(true);
    });

    test('Ensures clockSeq contributes to uniqueness', () => {
        const nodeId = 'a1b2c3d4e5f678901234567890abcdef';
        const launchTime = '2020-01-01T00:00:00Z';
        const results = new Set();

        for (let i = 0; i < 100; i++) {
            results.add(uuid.uuid_v6(launchTime, nodeId, "yo"));
        }

        expect(results.size).toBe(100);
    });
    describe('UUID Uniqueness Tests', () => {
        const uuid = new UIDS();
        const totalUUIDs = 1000000;

        test('uuid_v1 generates unique UUIDs for a large sample', () => {
            const uuidsSet = new Set();
            for (let i = 0; i < totalUUIDs; i++) {
                uuidsSet.add(uuid.uuid_v1());
            }
            expect(uuidsSet.size).toBe(totalUUIDs);
        });

        test('uuid_v2 generates unique UUIDs for a large sample', () => {
            const uuidsSet = new Set();
            for (let i = 0; i < totalUUIDs; i++) {
                uuidsSet.add(uuid.uuid_v2(1, i));
            }
            expect(uuidsSet.size).toBe(totalUUIDs);
        });

        test('uuid_v3 generates unique UUIDs for a large sample', () => {
            const uuidsSet = new Set();
            for (let i = 0; i < totalUUIDs; i++) {
                uuidsSet.add(uuid.uuid_v3('namespace', `name${i}`));
            }
            expect(uuidsSet.size).toBe(totalUUIDs);
        });

        test('uuid_v4 generates unique UUIDs for a large sample', () => {
            const uuidsSet = new Set();
            for (let i = 0; i < totalUUIDs; i++) {
                uuidsSet.add(uuid.uuid_v4());
            }
            expect(uuidsSet.size).toBe(totalUUIDs);
        });

        test('uuid_v5 generates unique UUIDs for a large sample', () => {
            const uuidsSet = new Set();
            for (let i = 0; i < totalUUIDs; i++) {
                uuidsSet.add(uuid.uuid_v5('namespace', `name${i}`));
            }
            expect(uuidsSet.size).toBe(totalUUIDs);
        });

        test('uuid_v6 generates unique UUIDs for a large sample', () => {
            const launchTime = '2020-01-01T00:00:00Z';
            const prefix = 'yo';
            const uuidsSet = new Set();

            for (let i = 0; i < totalUUIDs; i++) {
                const nodeId = uuid.random_code_alphanumeric(32);

                const generatedUUID = uuid.uuid_v6(launchTime, nodeId, prefix);
                uuidsSet.add(generatedUUID);
            }

            expect(uuidsSet.size).toBe(totalUUIDs);
        });
    });





});