import { createHash, createHmac } from 'crypto';
export class sha256 {
    constructor(secret) {
        this.hash = secret ? createHmac('sha256', secret) : createHash('sha256');
    }
    update(array) {
        this.hash.update(array);
    }
    digest() {
        const buffer = this.hash.digest();
        return Promise.resolve(new Uint8Array(buffer.buffer));
    }
}