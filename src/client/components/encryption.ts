import { Crypto as WebCrypto } from '@peculiar/webcrypto';

let crypto: Crypto;
// Browser environment
if (
    typeof window !== 'undefined' &&
    typeof window.crypto !== 'undefined' &&
    typeof window.crypto.subtle !== 'undefined'
) {
    crypto = window.crypto;
}
// Node.js environment
else if (typeof global !== 'undefined') {
    const webCrypto = new WebCrypto();
    crypto = webCrypto as unknown as Crypto;
} else {
    throw new Error('Web Crypto API is not supported in this environment.');
}

const IV_LENGTH = 16;

export async function encryptWithCipher({
    data,
    key,
    algorithm = 'AES-GCM',
    initializationVectorSize = IV_LENGTH,
}: {
    data: string;
    key: string;
    algorithm?: string;
    initializationVectorSize?: number;
}) {
    // Derive a cryptographic key from the input key using SHA-256
    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(key),
        { name: 'PBKDF2' },
        false,
        ['deriveKey'],
    );

    const cryptoKey = await crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: new Uint8Array(initializationVectorSize), // Use a fixed salt for simplicity
            iterations: 100000,
            hash: 'SHA-256',
        },
        keyMaterial,
        { name: algorithm, length: 256 },
        false,
        ['encrypt'],
    );

    // Create an initialization vector
    const iv = crypto.getRandomValues(new Uint8Array(initializationVectorSize));

    // Encrypt the data
    const encrypted = await crypto.subtle.encrypt(
        { name: algorithm, iv },
        cryptoKey,
        new TextEncoder().encode(data),
    );

    // Return the encrypted data as a base64 string
    return JSON.stringify({
        iv: Buffer.from(iv).toString('base64'),
        ciphertext: Buffer.from(encrypted).toString('base64'),
    });
}
export async function decryptWithCipher({
    encryptedDataJSON,
    key,
    algorithm = 'AES-GCM',
}: {
    encryptedDataJSON: string;
    key: string;
    algorithm?: string;
}) {
    const _encryptedData: {
        iv: string;
        ciphertext: string;
    } = JSON.parse(encryptedDataJSON);

    // Derive a cryptographic key from the input key using SHA-256
    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(key),
        { name: 'PBKDF2' },
        false,
        ['deriveKey'],
    );

    const cryptoKey = await crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: new Uint8Array(Buffer.from(_encryptedData.iv, 'base64').length), // Use the same salt size as IV
            iterations: 100000,
            hash: 'SHA-256',
        },
        keyMaterial,
        { name: algorithm, length: 256 },
        false,
        ['decrypt'],
    );

    // Decode the IV and encrypted data from base64
    const decodedIv = Buffer.from(_encryptedData.iv, 'base64');
    const decodedEncryptedData = Buffer.from(_encryptedData.ciphertext, 'base64');

    // Decrypt the data
    const decrypted = await crypto.subtle.decrypt(
        { name: algorithm, iv: decodedIv },
        cryptoKey,
        decodedEncryptedData,
    );

    // Return the decrypted data as a string
    return new TextDecoder().decode(decrypted);
}
