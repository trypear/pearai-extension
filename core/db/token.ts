import { createClient, SupabaseClient, Session } from '@supabase/supabase-js';
import { jwtDecode, JwtPayload } from 'jwt-decode';

const supabaseUrl: string = 'https://wmqwxxjpjphbspkcxtjt.supabase.co';
const supabaseKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtcXd4eGpwanBoYnNwa2N4dGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc5NzM2MzUsImV4cCI6MjAzMzU0OTYzNX0.wasgwu6xzGioGJ1MGNjtGBc0SNWEZq9yII4bioSF_f4';
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

interface DecodedToken extends JwtPayload {
  exp: number;
}

function isTokenExpired(token: string): boolean {
  console.log('Decoding token:', token);
  const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
  const currentTime: number = Date.now() / 1000;
  console.log('Decoded token:', decodedToken);
  console.log('Current time:', currentTime);
  const expired = decodedToken.exp < currentTime;
  console.log('Is token expired:', expired);
  return expired;
}

export async function checkTokens(
  accessToken: string | undefined, 
  refreshToken: string  | undefined
): Promise<{ accessToken: string, refreshToken: string }> {
  console.log('Checking if tokens are expired');

  if (!accessToken) {
    console.error('Access token is not available');
    return Promise.reject('Access token is not available');
  }

  if (!refreshToken) {
    console.error('Refresh token is not available');
    return Promise.reject('Refresh token is not available');
  }

  if (isTokenExpired(accessToken)) {
    console.log('Access token is expired, attempting to refresh...');
    const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken });

    console.log('Refresh session data:', data);
    console.log('Refresh session error:', error);

    if (error || !data) {
      console.error('Error refreshing token:', error);
      window.location.href = '/login';
      return Promise.reject('Error refreshing token');
    } else {
      console.log('Token refreshed successfully');
    }

    accessToken = data.session?.access_token ?? '';
    refreshToken = data.session?.refresh_token ?? '';

    console.log('New access token:', accessToken);
    console.log('New refresh token:', refreshToken);
  } else {
    console.log('Access token is still valid');
  }
  
  return { accessToken, refreshToken };
}