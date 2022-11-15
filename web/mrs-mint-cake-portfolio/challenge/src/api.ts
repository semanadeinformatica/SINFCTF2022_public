import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { getUser } from "./db.ts";

const flag = Deno.env.get("FLAG");
export const api = new Router({ prefix: "/api" });

api.post("/login", async ({ request, response }, next) => {
    const { username, password } = await request.body({ type: "json" }).value;
    const user = await getUser(username, password);

    if (!user) {
        response.body = { success: false, error: "Invalid username and/or password!" };
    } else {
        if (user.username !== username) {
            response.body = { success: false, error: "Invalid username!" };
        } else if (user.password !== password) {
            response.body = { success: false, error: "Invalid password!" };
        } else {
            response.body = { success: true, flag };
        }
    }
});
