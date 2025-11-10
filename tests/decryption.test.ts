/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { decryptWithCipher } from '../src/client/components/encryption';

describe('DecryptWithCipher', () => {
    const encryptedData = JSON.stringify({
        iv: 'XRAGv22SYgpZiGhy',
        salt: '5YowN2Txol1ejcvt9gJB1A==',
        ciphertext:
            'SUJcKVu5/yLVXvcVRI0xLTT+HN0j0JQc2YGL4uwmdErIAa4ZwTkfaKP3VNlclBeXoRfRqCRw9ioYZLSrZOsUlSKRDIGkrfHamZw3Nt+bTwWgzAecWmLOeU8Ks1ou6iQa1K9Yqt2+zJi6rDJfkEFEZJBOjC0iFnmeIMemYVD5UexqIkTlGZcKzwW57WU4HPKHpri/PhupcPRVpbZaNurCTB9tfnDLsr83zgHqSFILOdnSwvUaMA==',
    });

    test('correct password should decrypt successfully', async () => {
        const password = 'testing123456';

        const result = await decryptWithCipher({
            encryptedDataJSON: encryptedData,
            key: password,
        });

        expect(result).toBeTruthy();
        expect(result).not.toBe('');
        console.log(`Decrypted successfully, result length: ${result.length}`);
    });

    test('incorrect password should fail', async () => {
        const password = 'wrongPassword';

        await expect(
            decryptWithCipher({
                encryptedDataJSON: encryptedData,
                key: password,
            }),
        ).rejects.toThrow();
    });
});
