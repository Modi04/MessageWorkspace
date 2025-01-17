// 기존 코드
import express, { Request, Response } from "express";
import { Profile, Post, RequestEntity, Database } from "./types";

// 메모리 기반 데이터베이스
let db: Database = {
  profiles: [],
  posts: [],
  requests: [],
};

const app = express();
const PORT = 4000;

app.use(express.json());

// 기본 엔드포인트
app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

// DB 읽기 함수들
app.get("/profiles", (_req: Request, res: Response) => {
  res.json(db.profiles);
});

app.get("/posts", (_req: Request, res: Response) => {
  res.json(db.posts);
});

app.get("/requests", (_req: Request, res: Response) => {
  res.json(db.requests);
});

// 특정 Post를 ID로 조회하는 API
app.get("/posts/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const post = db.posts.find((p) => p.id === id);

  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

// DB 쓰기 함수들
app.post("/profiles", (req: Request<any, any, Profile>, res: Response) => {
  const newProfile = req.body;
  db.profiles.push(newProfile);
  res.status(201).json(newProfile);
});

app.post("/posts", (req: Request<any, any, Post>, res: Response) => {
  const newPost = req.body;
  db.posts.push(newPost);
  res.status(201).json(newPost);
});

app.post("/requests", (req: Request<any, any, RequestEntity>, res: Response) => {
  const newRequest = req.body;
  db.requests.push(newRequest);
  res.status(201).json(newRequest);
});

// 정적 파일 서비스
app.use(express.static("dist"));

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});