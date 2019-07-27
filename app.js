const express = require('express');
const app = express();
const path = require('path');
const router = require('./route.js');

// routes 사용
app.use('/', router);

app.use((req, res, next) => { // 404 처리 부분
    res.status(404).send('일치하는 주소가 없습니다!');
    res.end();
});

app.use((err, req, res, next) => { // 에러 처리 부분
    console.error(err.stack); // 에러 메시지 표시
    res.status(500).send('서버 에러!'); // 500 상태 표시 후 에러 메시지 전송
    res.end();
});

app.listen(5000, () => {
    console.log('REST API on port 5000!');
}); // 이전과 동일