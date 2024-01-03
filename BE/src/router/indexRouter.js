// this code : indexRouter.js
const indexController = require('../controller/indexController.js');
const { jwtMiddleware } = require('../../jwtMiddleware.js');

exports.indexRouter = function (app) {
    // 일정 CRUD API
    // app.post("/todo", jwtMiddleware, indexController.createTodo) // create: body
    app.post("/todo", indexController.createTodo) // create: body
    app.get("/users/:userIdx/todos", indexController.readTodo) // read : query, path 
    // app.get("/todos", indexController.readTodo) // read : query, path 
    app.patch("/todo", indexController.updateTodo) // update : body
    app.delete("/users/:userIdx/todo/:todoIdx", indexController.deleteTodo) // delete : query, path : 토큰처리로 URI 간결하게
}