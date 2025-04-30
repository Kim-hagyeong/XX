import express from "express";
import postsRouter from "./router/posts.mjs";
import authRouter from "./router/auth.mjs";
import path from "path"; // 추가
import { fileURLToPath } from "url"; // 추가

const app = express();

// JSON 바디 파싱
app.use(express.json());

// 정적 파일(html, css, js) 제공 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
// public 폴더 안에 signup.html, login.html, post.html 넣기

// API 라우터
app.use("/posts", postsRouter);
app.use("/auth", authRouter);

// 없는 경로 요청시 404
app.use((req, res, next) => {
  res.sendStatus(404);
});

// 서버 실행
app.listen(8080, () => {
  console.log("http://127.0.0.1:8080 에서 서버 실행 중");
});
