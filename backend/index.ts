import express, { Request, Response } from "express";

// DB의 타입 정의
interface Profile {
  calimeroAddress: string;
  name: string;
  image: string;
  description: string;
}

interface Post {
  id: string;
  uploaderAddress: string;
  title: string;
  contents: string;
  createdAt: string;
}

interface RequestEntity {
  sender: string;
  receiver: string;
  postId: string;
  purpose: string;
  requestStatus: string;
  createdAt: string;
}

interface Database {
  profiles: Profile[];
  posts: Post[];
  requests: RequestEntity[];
}

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
