import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

// Hash a password
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

// Compare a password with a hash
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}