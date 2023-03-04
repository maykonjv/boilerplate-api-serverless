import express, { Request, Response, Router } from "express";
import { Application } from "express";
import serverless from "serverless-http";
import routerV1 from "./v1/routers";
import routerV2 from "./v2/routers";
import { name } from "../package.json";

const app: Application = express();

app.use(express.json());
app.use(express.static("public"));

app.use("/v1", routerV1);
app.use("/v2", routerV2);

app.use((req: Request, res: Response) => {
  const isLocal = req.headers.host?.includes("localhost");
  const url = isLocal
    ? "http://localhost:3000/"
    : "https://" + req.headers.host + "/";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${name}</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@3/swagger-ui.css">
</head>
<body>
    <div id="swagger"></div>
    <script src="https://unpkg.com/swagger-ui-dist@3/swagger-ui-bundle.js"></script>
    <script>
      SwaggerUIBundle({
        dom_id: '#swagger',
        url: '${url}swagger.json',
    });
    </script>
</body>
</html>`;
  res.send(html);
});

export const handler = serverless(app);
