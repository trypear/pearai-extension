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

export async function getTokens(): Promise<{ accessToken: string, refreshToken: string }> {
  console.log('Checking if tokens are expired');
  //  let accessToken: string | null = localStorage.getItem('access_token');
  // let refreshToken: string | null = localStorage.getItem('refresh_token');
  let accessToken = "eyJhbGciOiJIUzI1NiIsImtpZCI6IjA4VjF0WkpRVlZHb3NPRDYiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzE5NTE4NTcxLCJpYXQiOjE3MTk1MTQ5NzEsImlzcyI6Imh0dHBzOi8vd21xd3h4anBqcGhic3BrY3h0anQuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6ImM5NDA2MTgyLWQ3NzAtNDZhOS1hZjAxLWE2YTVmYzRmNTczYiIsImVtYWlsIjoibmF0aGFuYW5nMjAwMEBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6Imdvb2dsZSIsInByb3ZpZGVycyI6WyJnb29nbGUiXX0sInVzZXJfbWV0YWRhdGEiOnsiYXZhdGFyX3VybCI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0oyX3kybkU0WS0zbzJJR1hCZDlvZmpacmpHZXJUZVNlVVVsNkRZT1lwV19JaEtGTW0wPXM5Ni1jIiwiZW1haWwiOiJuYXRoYW5hbmcyMDAwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmdWxsX25hbWUiOiJOYXRoYW4gQW5nIiwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tIiwibmFtZSI6Ik5hdGhhbiBBbmciLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NKMl95Mm5FNFktM28ySUdYQmQ5b2ZqWnJqR2VyVGVTZVVVbDZEWU9ZcFdfSWhLRk1tMD1zOTYtYyIsInByb3ZpZGVyX2lkIjoiMTE1NDA5MDEyMzczMzEyNTE3NTE2Iiwic3ViIjoiMTE1NDA5MDEyMzczMzEyNTE3NTE2In0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoib2F1dGgiLCJ0aW1lc3RhbXAiOjE3MTk1MTQ5NzF9XSwic2Vzc2lvbl9pZCI6ImRjMjg2ODgzLWY2YzEtNDMzYi1hMjA5LTQ4YjY3ZTAwZmI5OSIsImlzX2Fub255bW91cyI6ZmFsc2V9.78ZX-UnAeMSEvyMYmTarkYGVVvzjUeX8lZQUavQ79to"
  let refreshToken = "lvbwpiy4uvWxXZbOpiJLoA"

  console.log('Access token from local storage:', accessToken);
  console.log('Refresh token from local storage:', refreshToken);

  if (!accessToken || !refreshToken) {
    console.error('Tokens are not available');
    return Promise.reject('Tokens are not available');
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
    
    // localStorage.setItem('access_token', accessToken);
    // localStorage.setItem('refresh_token', refreshToken);

    console.log('Access token and refresh token updated in local storage');
  } else {
    console.log('Access token is still valid');
  }
  return { accessToken, refreshToken };

}
