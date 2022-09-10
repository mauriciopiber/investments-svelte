import { server } from "../src/server";

export default function handler(req: any, res: any) {
  const { name = "World" } = req.query;

  const value = server(name);
  return res.send(value);
}
