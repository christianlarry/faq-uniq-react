import { SignJWT } from 'jose';

// Ganti dengan rahasia yang kuat dan aman
const CHAINLIT_AUTH_SECRET = import.meta.env.VITE_CHAINLIT_AUTH_SECRET || "FY07_xol$4Y3p>Q1If?w1$=^~.1%DaAph:8xc,hi^7EurI3F7zSoOJ4FtAW9:Rn9"; 

interface Metadata {
  [key: string]: any;
}

/**
 * Membuat JWT dengan identifier dan metadata.
 * @param identifier - Identifier pengguna.
 * @param metadata - Metadata tambahan untuk pengguna.
 * @returns Token yang telah dienkripsi.
 */
export async function createJwt(identifier: string, metadata: Metadata): Promise<string> {
  const jwt = await new SignJWT({ identifier, ...metadata })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('15d') // Token berlaku selama 15 hari
    .sign(new TextEncoder().encode(CHAINLIT_AUTH_SECRET));
  
  return jwt;
}

/**
 * Fungsi untuk menghasilkan token akses.
 * @param userIdentifier - Identifier pengguna yang akan digunakan dalam token.
 * @param userMetadata - Metadata tambahan untuk pengguna.
 * @returns Token akses yang telah dienkripsi.
 */
export async function generateAccessToken(userIdentifier: string, userMetadata: Metadata): Promise<string> {
  return await createJwt(userIdentifier, userMetadata);
}
