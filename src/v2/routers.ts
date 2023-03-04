import express from "express";
import { HelloController } from "./controllers/hello";

const router = express.Router();

router.get("/hello", async (req, res) => {
  const Hello = new HelloController();
  const result = await Hello.getHello(req.headers["x-api-key"] as string);
  res.send(result);
});

export default router;
