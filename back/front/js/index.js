// this script : todo.js
const userIdx = 1;
readData();

async function readData() {
    // 조회 API : Read
    const config = {
        method: "get",
        url: url + `/users/${userIdx}/profile`, // → 통신
        // header: { "x-access-token": token }, 로그인 토큰
    };
    try {
        const res = await axios(config);
        // const res = await fetch(config.url, {
        //     method: config.method,
        // });
        // if (!res.ok) {
        //     throw Error(res.statusText);
        // }
        //const data = await res.json();
        if (res.data.code !== 200) {
            alert(res.data.message);
            return false;
        }
        const todoDataSet = res.data.result;
        console.log(todoDataSet);

        for (let section in todoDataSet) { // key 뽑기
            const sectionUl = document.querySelector(`#${section} ul`);
            const arrayForEachSection = todoDataSet[section] // key의 value만 
            // console.log(arrayForEachSection);

            let result = "";
            for (let todo of arrayForEachSection) {
                let element = `
                <li class="list-item" id=${todo.todoIdx}>
                    <div class="done-text-container">
                      <button class="del-button">delete</button>
                    　<button class="edit-button">patch</button>  
                    　<input type="text" class="todo-text" value="${todo.contents}" />
                    </div>                                      
                </li>       
                `;
                result += element;
            }
            sectionUl.innerHTML = result;
        }

    } catch (err) {
        console.log(err);
    }
}

// 일정 C(R)UD
const matrixContainer = document.querySelector(".matrix-container");
matrixContainer.addEventListener("keypress", cudController);
matrixContainer.addEventListener("click", cudController);

function cudController(event) {
    const target = event.target; // 위치{...} 
    const targetTagName = target.tagName; // INPUT
    const eventType = event.type; // keypress
    const key = event.key; // Enter

    // create 
    if (targetTagName === "INPUT" && key === "Enter") {
        createTodo(event, token);
        return;
    }

    // update    
    if (target.className === "edit-button" && eventType === "click") {
        updateTodoContents(event, token);
        // console.log(target, target.className, eventType);
        return;
    }

    // delete
    if (target.className === "del-button" && eventType === "click") {
        deleteTodo(event, token);
        // console.log(target, target.className, eventType);
        return;
    }
}

async function createTodo(event, token) {
    const contents = event.target.value; // 쓴 내용
    const type = event.target.closest(".matrix-item").id;

    if (!contents) {
        alert("내용입력 하세요");
        return false;
    }
    const config = {
        method: "post",
        url: url + "/todo",
        // header: { "x-access-token": token },
        data: {
            userIdx: userIdx, // 누구
            contents: contents, // 내용
            type: type // decide 
        }
    }

    try {
        const res = await fetch(config.url, {
            method: config.method,
            headers: { 'Content-Type': 'application/json' }, // 'x-access-token': token 
            body: JSON.stringify(config.data)
        });
        if (!res.ok) {
            throw Error(res.statusText);
        }

        const data = await res.json();
        if (data.code !== 200) {
            alert(data.message);
            return false;
        }

        // DOM refresh
        readData();
        // Input 지우기
        event.target.value = "";
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function updateTodoContents(event, token) {
    const contents = prompt("내용입력");
    const todoIdx = event.target.closest(".list-item").id;

    const config = {
        method: "patch",
        url: url + "/todo",
        header: { "x-access-token": token },
        data: {
            userIdx: userIdx, // 누구
            todoIdx: todoIdx,
            // contents: contents,
            contents: contents,
            // contents: contents, // 내용
            // type: type // decide 
        },
    }

    try {
        const res = await axios(config);
        if (res.data.code !== 200) {
            alert(res.data.message);
            return false;
        }

        // DOM refresh
        readData();
        return true;
    } catch (err) {
        // console.log('this is catch');
        console.error(err);
        return false;
    }
}

async function deleteTodo(event, token) {
    const isValidReq = confirm("삭제합니까?");
    if (!isValidReq) {
        return false;
    }

    const todoIdx = event.target.closest(".list-item").id;

    const config = {
        method: "delete",
        url: url + `/users/${userIdx}/store/${storeIdx}`,
        header: { "x-access-token": token },
    }

    try {
        const res = await axios(config);
        if (res.data.code !== 200) {
            alert(res.data.message);
            return false;
        }

        // DOM refresh
        readData();
        return true;
    } catch (err) {
        // console.log('this is catch');
        console.error(err);
        return false;
    }
}