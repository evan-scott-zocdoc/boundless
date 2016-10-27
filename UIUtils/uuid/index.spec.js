import uuid from './index';

describe('UIUtils/uuid utility', () => {
    it('prefixes the UUIDs with "uikit-"', () => {
        expect(uuid()).toContain('uikit-');
    });

    it('creates consistently unique identifiers', () => {
        const ids = [];

        for (let i = 0; i < 10000; i+=1) {
            let id = uuid();

            expect(ids.indexOf(id) === -1).toBe(true);

            ids.push(id);
        }

    });
});
