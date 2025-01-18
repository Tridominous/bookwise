import config from '@/lib/config'
import ImageKit from 'imagekit'
import { NextResponse } from 'next/server';

const {
    env: {
        imagekit: { publicKey, urlEndpoint, privateKey }
        }
} = config;

const imagekit = new ImageKit({ publicKey, urlEndpoint, privateKey });

export async function GET() {
    try {
        const authenticationParameters = imagekit.getAuthenticationParameters();
        return NextResponse.json(authenticationParameters);
    } catch (error: any) {
        console.error(error);
        return NextResponse.error();
    }
}