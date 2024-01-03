// this code : indexController.js
const indexDao = require('../dao/indexDao.js');

exports.createTodo = async function (req, res) {
    const { userIdx, contents, type } = req.body;
    // console.log(userIdx, contents, type);

    // [ 예외 처리 ] 
    // 0. 입력값 누락
    if (!userIdx || !contents || !type) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "입력값 누락"
        });
    }
    // 1. userIdx : 토큰 처리 
    // 2. contents : 20글자 초과 불가
    if (contents.length > 20) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "20글자 이하로"
        });
    }
    // 3. type 배열 : do, decide, delete, delegate
    const validTypes = ["do", "decide", "delete", "delegate"];
    if (!validTypes.includes(type)) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "유효한 타입이 아님"
        });
    }

    const insertTodoRow = await indexDao.insertTodo(userIdx, contents, type);
    // console.log(insertTodoRow);

    if (!insertTodoRow) {
        return res.send({
            isSuccess: false,
            code: 403,
            message: "요청실패. 관리자에게 문의",
        });
    }

    return res.send({
        isSuccess: true,
        code: 200,
        message: "데이터 생성 성공",
    });
};

exports.readTodo = async function (req, res) {
    const { userIdx } = req.params;

    const todos = {};
    const types = ["do", "decide", "delegate", "delete"];

    for (let type of types) {
        let selectTodoByTypeRows = await indexDao.selectTodoByType(userIdx, type);

        if (!selectTodoByTypeRows) {
            return res.send({
                isSuccess: false,
                code: 403,
                message: "요청실패. 관리자에게 문의",
            });
        }
        // 결과값 배열 만듦
        todos[type] = selectTodoByTypeRows;
    }
    // return res.send(selectTodoByTypeRows);
    // return res.send(todos);
    return res.send({
        result: todos, // 결과물 배열
        isSuccess: true,
        code: 200,
        message: "데이터 조회 성공 ()",
    });
};

exports.updateTodo = async function (req, res) {
    let { userIdx, todoIdx, contents, status } = req.body;

    if (!userIdx || !todoIdx) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "userIdx와 todoIdx를 보내주세요",
        });
    }

    if (!contents) {
        contents = null;
    }

    if (!status) {
        status = null;
    }

    // 유효성 검증
    const isValidTodoRow = await indexDao.selectValidTodo(userIdx, todoIdx);
    if (isValidTodoRow.length < 1) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "유효한 요청이 아닙니다."
        });
    }

    // Update 실시 
    const updateTodoRow = await indexDao.updateTodo(userIdx, todoIdx, contents, status);
    if (!updateTodoRow) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "수정 실패"
        });
    }

    return res.send({
        isSuccess: true,
        code: 200,
        message: "수정 성공"
    });
};

exports.deleteTodo = async function (req, res) {
    const { userIdx, todoIdx } = req.params;

    // Null 체크
    if (!userIdx || !todoIdx) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "userIdx, todoIdx 입력 요망"
        });
    }

    // 유효성 검증
    const isValidTodoRow = await indexDao.selectValidTodo(userIdx, todoIdx);
    if (isValidTodoRow.length < 1) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "유효한 요청이 아닙니다."
        });
    }

    // Delete 실시
    const deleteTodoRow = await indexDao.deleteTodo(userIdx, todoIdx);
    if (!deleteTodoRow) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "삭제 실패"
        });
    }

    return res.send({
        isSuccess: true,
        code: 200,
        message: "삭제 성공"
    });
}
