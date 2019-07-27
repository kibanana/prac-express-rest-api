const express = require('express');
const path = require('path');
const jsonfile = require('jsonfile');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
let bodyNeeded = bodyParser.urlencoded({ extended: false });

router.get('/todos', (req, res) => {
    console.log('It\'s get');
    res.setHeader('Content-Type', 'application/json');
    let json = jsonfile.readFileSync(path.join(__dirname, 'db.json'));
    console.log(json);
    res.send(json);
    res.end();
});

router.get('/todos/:id', (req, res) => {
    console.log('It\'s get - id');
    res.setHeader('Content-Type', 'application/json');
    let json = jsonfile.readFileSync(path.join(__dirname, 'db.json'));
    let strJson = json['todos']; // string인 상태에서 .length를 하면 글자 수만큼 나옴
    let result;
    const id = Number(req.params.id);

    const idx = strJson.findIndex(function(item) {return item.id === id})
    if(idx > -1) { 
        result = strJson[idx];
    }

    /*
    for (var i = 0; i < strJson.length; i++){
        if (strJson[i]['id'] == id){
            result = strJson[i];
        }
    }
    */

    if (!result) result = 'There is not return value!';
    res.send(result);
    res.end();
});

router.post('/todos', bodyNeeded, (req, res) => {
    console.log('It\'s post');
    res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    let json = jsonfile.readFileSync(path.join(__dirname, 'db.json'));
 
    let bodyId = req.body.id;
    let bodyContent = req.body.content;
    let bodyCompleted= req.body.completed;
    bodyId = Number(bodyId);
    bodyCompleted = Boolean(bodyCompleted);

    // json['todos'].push('{"id": 4, "content": "Angular", "completed": true}');
    console.log(`{"id": ${bodyId}, "content": ${bodyContent}, "completed": ${bodyCompleted}}`);
    json['todos'].push({"id": bodyId, "content": bodyContent, "completed": bodyCompleted});

    jsonfile.writeFile(path.join(__dirname, 'db.json'), json);

    res.send('Insert Value!');
    res.end();
});

// +) 추가 post - JSON 처리

// 고민 - id는 보통 바뀌지 않으니까 어차피 같은 값이 들어가게 되는데
// 그렇다면 put을 아예 쓰지 않고 patch만 쓰는 게 맞지 않을까?
router.put('/todos/:id', bodyNeeded, (req, res) => {
    console.log('It\'s put');
    res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    let json = jsonfile.readFileSync(path.join(__dirname, 'db.json'));
    let strJson = json['todos']; // string인 상태에서 .length를 하면 글자 수만큼 나옴
    let result;
    const id = Number(req.params.id);

    let bodyId = req.body.id;
    let bodyContent = req.body.content;
    let bodyCompleted= req.body.completed;
    bodyId = Number(bodyId);
    bodyCompleted = Boolean(bodyCompleted);

    const idx = strJson.findIndex(function(item) {return item.id === id})
    if(idx > -1) {
        strJson[idx]['id'] = bodyId;
        strJson[idx]['content'] = bodyContent;
        strJson[idx]['completed'] = bodyCompleted;

        result = true;
    }
    
    /*
    for (var i = 0; i < strJson.length; i++){
        if (strJson[i]['id'] == id){
            strJson[i]['content'] = bodyContent;
            strJson[i]['completed'] = bodyCompleted;

            result = true;
        }
    }
    */

    json['todos'] = strJson;

    jsonfile.writeFile(path.join(__dirname, 'db.json'), json);

    if (!result) result = 'Put Value!';
    res.send(result);

    res.end();
});

// +) 추가 put - JSON 처리

router.patch('/todos/:id', bodyNeeded, (req, res) => {
    console.log('It\'s patch');
    res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    let json = jsonfile.readFileSync(path.join(__dirname, 'db.json'));
    let strJson = json['todos']; // string인 상태에서 .length를 하면 글자 수만큼 나옴
    let result;
    const id = Number(req.params.id);

    let bodyCompleted= req.body.completed;
    bodyCompleted = Boolean(bodyCompleted);

    const idx = strJson.findIndex(function(item) {return item.id === id})
    if(idx > -1) {
        strJson[idx]['completed'] = bodyCompleted;

        result = true;
    }
    
    /*
    for (var i = 0; i < strJson.length; i++){
        if (strJson[i]['id'] == id){
            strJson[i]['content'] = bodyContent;
            strJson[i]['completed'] = bodyCompleted;

            result = true;
        }
    }
    */

    json['todos'] = strJson;

    jsonfile.writeFile(path.join(__dirname, 'db.json'), json);

    if (!result) result = 'Patch Value!';
    res.send(result);

    res.end();
});

router.delete('/todos/:id', (req, res) => {
    console.log('It\'s delete');
    res.setHeader('Content-Type', 'application/json');
    let json = jsonfile.readFileSync(path.join(__dirname, 'db.json'));
    let strJson = json['todos']; // string인 상태에서 .length를 하면 글자 수만큼 나옴
    let result;
    const id = Number(req.params.id);
    
    const idx = strJson.findIndex(function(item) {return item.id === id})
    if(idx > -1) {
        result = true;
        strJson.splice(idx, 1);
    }

    /*
    for (var i = 0; i < strJson.length; i++){
        if (strJson[i]['id'] == id){
            result = true;
            strJson.splice(i, 1);
        }
    }
    */

    json['todos'] = strJson;

    jsonfile.writeFile(path.join(__dirname, 'db.json'), json);

    if (!result) result = 'Delete Value!';
    res.send(result);

    res.end();
});

module.exports = router;