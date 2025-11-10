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
    // Generate a random salt for PBKDF2
    const salt = crypto.getRandomValues(new Uint8Array(initializationVectorSize));

    // Derive a cryptographic key from the input key using PBKDF2
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
            salt,
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

    // Return the encrypted data as a base64 string with salt included
    return JSON.stringify({
        iv: Buffer.from(iv).toString('base64'),
        salt: Buffer.from(salt).toString('base64'),
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
    // Parse the encrypted data JSON - salt is optional for backward compatibility
    const _encryptedData: {
        iv: string;
        salt?: string;
        ciphertext: string;
    } = JSON.parse(encryptedDataJSON);

    // Decode IV from base64
    const decodedIv = Buffer.from(_encryptedData.iv, 'base64');

    // Handle salt - support both new format (with salt) and legacy format (without salt)
    let salt: BufferSource;
    if (_encryptedData.salt && _encryptedData.salt !== '') {
        // New format: use the provided salt
        salt = Buffer.from(_encryptedData.salt, 'base64');
    } else {
        // Legacy format: use zero-filled salt of IV length for backward compatibility
        salt = new Uint8Array(decodedIv.length);
    }

    // Derive a cryptographic key from the input key using PBKDF2
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
            salt,
            iterations: 100000,
            hash: 'SHA-256',
        },
        keyMaterial,
        { name: algorithm, length: 256 },
        false,
        ['decrypt'],
    );

    // Decode the ciphertext from base64
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
