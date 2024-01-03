// this script : index.js
const cors = require('cors');
const compression = require('compression');
const express = require('express')
const { indexRouter } = require('./src/router/indexRouter.js');
const { userRouter } = require('./src/router/userRouter.js');
const app = express()
const port = 3000

// 미들웨어
app.use(express.static("front"));
// cors : 보안수준 낮게
app.use(cors());
// app.use(cors({
//     origin: '*',
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));
// body json 파싱
app.use(express.json());
// HTTP 요청 압축
app.use(compression());

// 라우터 분리
indexRouter(app);

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// app.get("/users", (req, res) => {
//     return res.send("get users 출력하기");
// });

// // 유저를 생성하다
// app.post("/user", (req, res) => {
//     const name = req.body.name;
//     return res.send(name);
// });

app.listen(port, () => {
    console.log(`Express app listening at port: ${port}`)
})