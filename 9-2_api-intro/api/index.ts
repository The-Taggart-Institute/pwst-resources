import { Application, Router, Context, BodyOptions } from "https://deno.land/x/oak/mod.ts";
import users from "./users.json" with {type: "json"} ;

const PORT = 8003;

const router = new Router();

router
  .get("/", (ctx: Context ) => {
    
    const userAgent = ctx.request.headers.get("user-agent");
    
    if (userAgent === "PWST") {
      ctx.response.body = "Hello, PWST Student!";
      ctx.response.status = 200;
    } else {
      ctx.response.body = "I don't know you!";
      ctx.response.status = 401
    }
    
  })
  .get("/flag", (ctx) => {
    const srcIp = ctx.request.headers.get("x-forwarded-for") || ctx.request.ip;
    ctx.response.type = "application/json";
    
    if (srcIp === "1.2.3.4") {
      ctx.response.body = {
        message: "Great work! FLAG{test_all_the_headers}"
      }
    } else {
      ctx.response.body = {
        message: "Only accepting requests from 1.2.3.4"
      }
    }
  })
  .get("/packages", (ctx) => {
    ctx.response.type = "application/json";
    const userAgent = ctx.request.headers.get("user-agent");
    if (userAgent && userAgent.indexOf("feroxbuster") >= 0) {
      ctx.response.body = {
        message: "Get lost, crab!"
      }
      ctx.response.status = 200;
    } else {
      ctx.response.body = {
        flag: "FLAG{crab_walk_the_api}"
      }
      ctx.response.status = 401;
    }
  })
  .post("/users/:id", async (ctx) => {
    interface requestBody {
      role: string
    }

    const body: requestBody = await ctx.request.body.json();

    if (!body || ! body.role) {
      ctx.response.body = {
        error: "No role provided"
      };
      ctx.response.status = 406;
      return;
    }
    const userId = ctx.params.id;
    const foundUser = users.find(u => u.id === parseInt(userId));
    ctx.response.type = "application/json";
    if (foundUser) {
      if (body.role === "admin") {
        ctx.response.body = foundUser;
      } else {
        ctx.response.body = { id: foundUser.id, username: foundUser.username };
      }
    }    
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: PORT});
console.log(`Listening on ${PORT}`);
