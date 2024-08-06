<<<<<<< HEAD
import { Context, Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { generateState } from "oslo/oauth2";

import { sign } from "hono/jwt";

import { poweredBy } from "hono/powered-by";
import { logger } from "hono/logger";
import { getGoogleUser, googleOAuth2Client } from "./auth";
=======
import { type Context, Hono } from 'hono'

import { poweredBy } from 'hono/powered-by'
import { logger } from 'hono/logger'
import { authRoute } from './auth/auth';

export const app = new Hono()

const apiRoutes = app.basePath("/auth").route("/", authRoute)
>>>>>>> origin/main


const app = new Hono();

app.use(poweredBy());

app.use(logger());

<<<<<<< HEAD
// app.use('/auth/*', (c:Context, next) => {
//   const jwtMiddleware = jwt({
//     secret: `${Bun.env.JWT_SECRET}`,
//     cookie: `${getCookie(c,'auth-cookie')}`
//   })
//   return jwtMiddleware(c, next)
// })

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/auth", (c) => {
  return c.text("Hello auth!");
});

app.get("/auth/oauth", async (c) => {
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
});

app.get("/auth/google/callback", async (c: Context) => {
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

export default app;
=======
app.get('/', (c: Context) => {
  return c.text('Hello Hono!')
})
>>>>>>> origin/main
