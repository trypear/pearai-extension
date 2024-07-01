import { createClient, SupabaseClient, Session } from '@supabase/supabase-js';
import { jwtDecode, JwtPayload } from 'jwt-decode';

const supabasePublicUrl: string = 'https://wmqwxxjpjphbspkcxtjt.supabase.co';
const supabasePublicKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtcXd4eGpwanBoYnNwa2N4dGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc5NzM2MzUsImV4cCI6MjAzMzU0OTYzNX0.wasgwu6xzGioGJ1MGNjtGBc0SNWEZq9yII4bioSF_f4';
const supabase: SupabaseClient = createClient(supabasePublicUrl, supabasePublicKey);

interface DecodedToken extends JwtPayload {
  exp: number;
}

function isTokenExpired(token: string): boolean {
  const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
  const currentTime: number = Date.now() / 1000;
  return decodedToken.exp < currentTime;
}

export async function checkTokens(
  accessToken: string | undefined, 
  refreshToken: string  | undefined
): Promise<{ accessToken: string, refreshToken: string }> {
  if (!accessToken) {
    return Promise.reject('Access token is not available');
  }

  if (!refreshToken) {
    return Promise.reject('Refresh token is not available');
  }

  if (isTokenExpired(accessToken)) {
    const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken });

    if (error || !data) {
      window.location.href = '/login';
      return Promise.reject('Error refreshing token');
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