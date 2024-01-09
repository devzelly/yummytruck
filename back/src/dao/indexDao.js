// this code : indexDao.js
// 데이터베이스에 접근

const { pool } = require('../../database.js');

// exports.getUserRows = async function () {
//     try {
//         // 데이터베이스 연결 객체 가져오기
//         const connection = await pool.getConnection(async (conn) => conn);

//         try {
//             const selectUsersQuery = "SELECT * FROM Users;";
//             const [rows, fields] = await connection.query(selectUsersQuery);
//             return rows;

//         } catch (err) {
//             console.error(`# getUserRows Query error #`);
//             return false;
//         } finally {
//             connection.release(); // 연결 해제
//         }

//     } catch (err) {
//         console.error(`# getUserRows DB error #`);
//         return false;
//     }
// };

exports.insertStore = async function (userIdx, contents, type) {
    try {
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);

        try {
            // 쿼리문
            const insertTodoQuery = "insert into Todos (userIdx, contents, type) values (?, ?, ?);";
            const insertTodoParams = [userIdx, contents, type];

            const [rows, fields] = await connection.query(insertTodoQuery, insertTodoParams);
            return rows;

        } catch (err) {
            console.error(`# insertTodo Query error # \n ${err}`);
            return false;
        } finally {
            connection.release(); // DB 연결 해제
        }

    } catch (err) {
        console.error(`# insertTodo DB error # \n ${err}`);
        return false;
    }
}

exports.selectByType = async function (userIdx, type) {
    try {
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);

        try {
            // 쿼리문
            const selectTodoByTypeQuery =
                "SELECT todoIdx, contents, status FROM Todos WHERE userIdx = ? AND type = ? AND not(status = 'D');";
            const selectTodoByTypeParams = [userIdx, type];

            const [rows, fields] = await connection.query(selectTodoByTypeQuery, selectTodoByTypeParams);
            return rows; // 출력값

        } catch (err) {
            console.error(`# selectTodoByType Query error # \n ${err}`);
            return false;
        } finally {
            connection.release(); // DB 연결 해제
        }

    } catch (err) {
        console.error(`# selectTodoByType DB error # \n ${err}`);
        return false;
    }
}

exports.selectValid = async function (userIdx, todoIdx) {
    try {
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);

        try {
            // 쿼리문
            const selectValidTodoQuery =
                "Select * from Todos where userIdx = ? and todoIdx = ? and not(status='D');";
            const selectValidTodoParams = [userIdx, todoIdx];

            const [rows, fields] = await connection.query(selectValidTodoQuery, selectValidTodoParams);
            return rows; // 출력값

        } catch (err) {
            console.error(`# selectValidTodo Query error # \n ${err}`);
            return false;
        } finally {
            connection.release(); // DB 연결 해제
        }

    } catch (err) {
        console.error(`# selectValidTodo DB error # \n ${err}`);
        return false;
    }
}

exports.update = async function (userIdx, todoIdx, contents, status) {
    try {
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);

        try {
            // 쿼리문
            const updateTodoQuery =
                "update Todos set contents = ifnull(?, contents), status = ifnull(?, status) where userIdx = ? and todoIdx = ?;";
            const updateTodoParams = [contents, status, userIdx, todoIdx];

            const [rows, fields] = await connection.query(updateTodoQuery, updateTodoParams);
            return rows; // 출력값

        } catch (err) {
            console.error(`# updateTodo Query error # \n ${err}`);
            return false;
        } finally {
            connection.release(); // DB 연결 해제
        }

    } catch (err) {
        console.error(`# updateTodo DB error # \n ${err}`);
        return false;
    }
}

exports.delete = async function (userIdx, todoIdx) {
    try {
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);

        try {
            // 쿼리문
            const deleteTodoQuery =
                "update Todos set status = 'D' where userIdx = ? and todoIdx = ?;";
            const deleteTodoParams = [userIdx, todoIdx]; // 순서 조심

            const [rows, fields] = await connection.query(deleteTodoQuery, deleteTodoParams);
            return rows; // 출력값

        } catch (err) {
            console.error(`# deleteTodo Query error # \n ${err}`);
            return false;
        } finally {
            connection.release(); // DB 연결 해제
        }

    } catch (err) {
        console.error(`# deleteTodo DB error # \n ${err}`);
        return false;
    }
}