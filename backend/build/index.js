// 기존 코드
import express from "express";
// 메모리 기반 데이터베이스
let db = {
    profiles: [],
    posts: [],
    requests: [],
};
const app = express();
const PORT = 4000;
app.use(express.json());
// 기본 엔드포인트
app.get("/", (_req, res) => {
    res.send("Hello World!");
});
// DB 읽기 함수들
app.get("/profiles", (_req, res) => {
    res.json(db.profiles);
});
app.get("/posts", (_req, res) => {
    res.json(db.posts);
});
app.get("/requests", (_req, res) => {
    res.json(db.requests);
});
// 특정 Post를 ID로 조회하는 API
app.get("/posts/:id", (req, res) => {
    const { id } = req.params;
    const post = db.posts.find((p) => p.id === id);
    if (post) {
        res.json(post);
    }
    else {
        res.status(404).json({ error: "Post not found" });
    }
});
// DB 쓰기 함수들
app.post("/profiles", (req, res) => {
    const newProfile = req.body;
    db.profiles.push(newProfile);
    res.status(201).json(newProfile);
});
app.post("/posts", (req, res) => {
    const newPost = req.body;
    db.posts.push(newPost);
    res.status(201).json(newPost);
});
app.post("/requests", (req, res) => {
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
