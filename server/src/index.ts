import "dotenv/config";
import express from "express";
import cors from "cors";
import { weeklyContentRouter } from "./routes/weeklyContent.js";
import { recommendationsRouter } from "./routes/recommendations.js";
import { articlesRouter } from "./routes/articles.js";
import { topicsRouter } from "./routes/topics.js";
import { authRouter } from "./routes/auth.js";
import { subscriptionsRouter } from "./routes/subscriptions.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/weekly-content", weeklyContentRouter);
app.use("/recommendations", recommendationsRouter);
app.use("/articles", articlesRouter);
app.use("/topics", topicsRouter);
app.use("/auth", authRouter);
app.use("/subscriptions", subscriptionsRouter);

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
