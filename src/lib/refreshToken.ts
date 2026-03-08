export async function refreshTwitchAccessToken(refreshToken: string): Promise<{
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}> {
  const res = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    cache: 'no-store',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: process.env['AUTH_TWITCH_ID']!,
      client_secret: process.env['AUTH_TWITCH_SECRET']!,
    }),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(json));

  return json as {
    access_token: string;
    refresh_token?: string;
    expires_in: number;
  };
}
