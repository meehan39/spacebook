import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

import { AuthRequest, AuthResponse } from './pages/api/types/authenticate';
import { log } from './pages/api/util/log';

const authUrls: string[] = ['/'];

export async function middleware(req: NextRequest, event: NextFetchEvent) {
	log(req.ip ?? '', req.method, req.nextUrl.pathname);
	if (authUrls.includes(req.nextUrl.pathname)) {
		const token: string = req.cookies.get('token') ?? '';
		const authRequest: AuthRequest = {
			token: token
		};
		const data: Response = await fetch(
			'http:localhost:3000/api/authenticate',
			{
				method: 'POST',
				body: JSON.stringify(authRequest)
			}
		);
		const authResponse: AuthResponse = await data.json();

		if (authResponse.success) {
			return NextResponse.next();
		} else {
			return NextResponse.redirect(new URL('/splash', req.url));
		}
	} else {
		return NextResponse.next();
	}
}
