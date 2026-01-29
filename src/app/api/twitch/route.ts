import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const GET = async (req: NextRequest): Promise<NextResponse<unknown>> => {
  try {
    const token = await getToken({ req, secret: process.env['NEXTAUTH_SECRET']! });
    const userId = token?.twitchUserId;
    const accessToken = token?.twitchAccessToken;

    if (userId == null || accessToken == null) {
      return NextResponse.json('Unauthorized', { status: 401 });
    }

    const res = await fetch(
      `https://api.twitch.tv/helix/channels/followed?user_id=${encodeURIComponent(userId)}`,
      {
        headers: {
          'Client-Id': process.env['AUTH_TWITCH_ID']!,
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!res.ok) {
      throw new Error(`API error ${res.status}`);
    }

    const raw = await res.json();
    return NextResponse.json(raw, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
};
