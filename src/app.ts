import { type Context, Hono } from 'hono'

import { poweredBy } from 'hono/powered-by'
import { logger } from 'hono/logger'
import { authRoute } from './auth/auth';

export const app = new Hono()

const apiRoutes = app.basePath("/auth").route("/", authRoute)

app.use(poweredBy())

app.use(logger())

app.get('/', (c: Context) => {
  return c.text('Hello Hono!')
})
