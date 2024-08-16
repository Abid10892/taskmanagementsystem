import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken'); // Check if the token exists
  
  if (!token) {
    // If no token, redirect to the login page
    return NextResponse.redirect(new URL('/login', request.url));
  }


  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  try {

    const res = await fetch(`${baseUrl}/api/verify-token`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token.value}`,

      },
      body: JSON.stringify(token.value)
    });

    const response = await res.json();

    const user = response.decodeToken;
    let newHeaders = new Headers(request.headers)
    newHeaders.set('x-user-id', user._id);
    

    return NextResponse.next({request: {
      headers: newHeaders
    }});
    
} catch (error: any) {
    console.log(error);
}

  
}

// Specify the routes the middleware should apply to
export const config = {
  matcher: ['/((?!login|signup|api|_next/static|_next/image|favicon.ico).*)'], // Add more routes as needed
};
