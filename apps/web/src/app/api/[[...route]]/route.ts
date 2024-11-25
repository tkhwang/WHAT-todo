import { Hono } from "hono"
import { handle } from "hono/vercel"

import auth from "@/features/auth/server/route"

const app = new Hono().basePath("/api")

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route("/auth", auth)

export const GET = handle(app)
export const POST = handle(app)

export type AppType = typeof routes
