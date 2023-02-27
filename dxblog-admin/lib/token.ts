import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

const secret = process.env.SECRET_JOSE;

export async function sign(payload: Record<string, string | boolean>): Promise<string> {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60; // one hour

    return new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256', typ: 'JWT'})
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(secret));
}

export async function verify(token: string, getPayload = false): Promise<JWTPayload | boolean> {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return getPayload ? payload : !!payload;
}