import { Hono, type Context } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { sign } from "hono/jwt";
import { generateState, OAuth2Client } from "oslo/oauth2";

export const googleOAuth2Client = new OAuth2Client(
  Bun.env.GOOGLE_CLIENT_ID as string,
  "https://accounts.google.com/o/oauth2/v2/auth",
  "https://oauth2.googleapis.com/token",
  {
    redirectURI: "http://localhost:3000/login/google/callback",
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

export const authRoute = new Hono()
  .get("/", (c) => {
    return c.text("Hello auth!");
  })
  .get("/oauth", async (c) => {
    const googleOAuth2State = generateState();

    const url = await googleOAuth2Client.createAuthorizationURL({
      state: googleOAuth2State,
      scopes: ["https://www.googleapis.com/auth/userinfo.profile"],
    });

    console.log(`Redirect url: ${url}`);

    setCookie(c, "google_oauth2_state", googleOAuth2State, {
      httpOnly: true,
      secure: false, // `true` for production
      path: "/",
      maxAge: 60 * 60,
    });

    return c.redirect(url.toString() + "&prompt=select_account");
  })
  .get("/google/callback", async (c: Context) => {
    const { state, code } = c.req.query();
    const googleOAuth2State = getCookie(c, "google_oauth2_state");

    if (!googleOAuth2State || !state || googleOAuth2State !== state) {
      return c.status(400);
    }

    console.log(`code: ${code}`);

    const { access_token } = await googleOAuth2Client.validateAuthorizationCode(
      code,
      {
        credentials: Bun.env.GOOGLE_CLIENT_SECRET,
        authenticateWith: "request_body",
      }
    );

    console.log(`accessToken: ${access_token}`);

    const user = await getGoogleUser(access_token);

    console.log(`user: ${JSON.stringify(user)}`);

    const payload = {
      sub: user,
      role: "user",
      exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expires in 5 minutes
    };
    // set user information to the session cookie

    const token = await sign(payload, Bun.env.JWT_SECRET as string);
    setCookie(c, "auth-cookie", token, {
      httpOnly: true,
      secure: false, // `true` for production
      path: "/",
      maxAge: 60 * 60,
    });

    return c.redirect("/");
  });
