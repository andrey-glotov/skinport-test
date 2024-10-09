import { createHmac } from 'node:crypto';

export function createHash(value: string, secret?: string): string {
  return createHmac('sha256', secret).update(value).digest('hex');
}
