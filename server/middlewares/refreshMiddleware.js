import { PrismaClient } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";

export default async function (req, res) {
  const user = await new PrismaClient().user.findFirst({
    where: { id: Number(req.params.id) },
  });
  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }

  const payload = { id: user.id, username: user.username, role: user.role };
  const token = jwt.sign(payload, "secret");
  return res.status(200).json({ message: "Successful refresh", token: token });
}
