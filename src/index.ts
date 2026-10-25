import express from "express";

import { handlerReadiness } from "./api/readiness.js";
import {
  middlewareLogResponse,
  middlewareMetricsInc,
} from "./api/middleware.js";
import { handlerMetrics } from "./api/metrics.js";
import { handlerReset } from "./api/reset.js";
import { handlerValidateChirp } from "./api/validate_chirp.js";
import { errorMiddleWare } from "./api/middleware.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(middlewareLogResponse);
app.use("/app", middlewareMetricsInc, express.static("./src/app"));
app.get("/admin/metrics", handlerMetrics);
app.get("/api/healthz", handlerReadiness);
app.post("/admin/reset", handlerReset);
app.post("/api/validate_chirp", handlerValidateChirp);
app.use(errorMiddleWare);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});