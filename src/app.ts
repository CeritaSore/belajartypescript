import { router } from "./router/api.js";
import "dotenv/config";
const app = router;
const url = process.env.APP_URL;
const port = process.env.APP_PORT;

app.listen(port, () => {
  console.log(`Development running on ${url}:${port}`);
});
