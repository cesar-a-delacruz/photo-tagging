import { PrismaClient } from "../generated/prisma/index.js";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function (req, res) {
  const { username, password } = req.body;
  const user = await new PrismaClient().user.findFirst({
    where: {
      username: username,
    },
  });
  const match = await compare(password, user.password);
  if (match) {
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      "secret",
      { expiresIn: "1h" }
    );
    return res.json({ token });
  } else {
    return res.status(401).json({ error: "Invalid credentials" });
  }
}
