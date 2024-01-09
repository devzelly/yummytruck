// this script : index.js
const cors = require('cors');
const compression = require('compression');
const express = require('express');
const { indexRouter } = require('./src/router/indexRouter.js');
const { userRouter } = require('./src/router/userRouter.js');
const app = express();
const port = 3000;

// 미들웨어
app.use(express.static("front"));
// cors : 보안수준 낮게
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
// body json 파싱
app.use(express.json());
// HTTP 요청 압축
app.use(compression());

// 라우터 분리
indexRouter(app);

app.listen(port, () => {
    console.log(`접속 : ${port}`)
})