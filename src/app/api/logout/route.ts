// src/app/api/logout/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Define the cookie options for removal (empty value and immediate expiry)
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: new Date(0), // Set expiry to a past date to remove the cookie
  };

  try {
    // Create a new response and set the cookies to remove them
    const response = NextResponse.json({ message: 'Logged out successfully' });
    
    // Remove the accessToken cookie
    response.headers.append(
      'Set-Cookie',
      `accessToken=; ${Object.entries(cookieOptions)
        .map(([key, value]) => `${key}=${value}`)
        .join('; ')}`
    );
  
    // Remove the refreshToken cookie
    response.headers.append(
      'Set-Cookie',
      `refreshToken=; ${Object.entries(cookieOptions)
        .map(([key, value]) => `${key}=${value}`)
        .join('; ')}`
    );
  
    return response;
  } catch (error: any) {
    console.error('Error Logout user', error)
    return Response.json(
        {
            success: false,
            message: "Error in Logout user"
        },
        {
            status: 500
        }
    )
}
}
