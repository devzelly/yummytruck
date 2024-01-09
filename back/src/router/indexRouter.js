// this code : indexRouter.js
const indexController = require('../controller/indexController.js');

exports.indexRouter = function (app) {
    // 일정 CRUD API
    // - 매장 등록
    app.post("/store", indexController.createStore) // create: body 
    // - 가계부 등록
    // app.post("/store", indexController.createPurchase) // create: body
    // - 매장 조회
    app.get("/stores/:storeIdx", indexController.readStore) // read : query, path 
    // - 매장 수정
    app.patch("/store", indexController.updateStore) // update : body
    // - 매장 삭제
    app.delete("/users/:userIdx/store/:storeIdx", indexController.deleteStore) // delete : query, path : 토큰처리로 URI 간결하게
}