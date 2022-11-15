import { Application, send } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { api } from "./api.ts";

const app = new Application();

app.use(api.routes());
app.use(api.allowedMethods());

app.use((ctx) => {
    return send(ctx, ctx.request.url.pathname, {
        root: "./public",
        index: "index.html",
    }).catch(() => undefined);
});


console.log("Listening on port 8080");
app.listen({ port: 8080 });
