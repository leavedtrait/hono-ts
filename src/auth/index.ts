import { OAuth2Client } from "oslo/oauth2";

export const googleOAuth2Client = new OAuth2Client(
  Bun.env.GOOGLE_CLIENT_ID as string,
  "https://accounts.google.com/o/oauth2/v2/auth",
  "https://oauth2.googleapis.com/token",
  {
    redirectURI: "http://localhost:3000/auth/google/callback",
  }
);

export const getGoogleUser = async (accessToken: string) => {
  const response = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return await response.json();
};
