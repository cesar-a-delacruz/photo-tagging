import { Strategy, ExtractJwt } from "passport-jwt";
import { PrismaClient } from "../generated/prisma/index.js";

export default {
  strategy: new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secret",
    },
    async (payload, done) => {
      try {
        const user = await new PrismaClient().user.findFirst({
          where: { id: payload.id },
        });

        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ),
};
