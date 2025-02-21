// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs, getDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getFirestore, doc, setDoc, deleteDoc, updateDoc, where, query } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Firebase 구성 정보 설정
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC_AWLt1X27LrQB9j4H67Zf0N5v0Hc4Vig",
    authDomain: "tododata-e3181.firebaseapp.com",
    projectId: "tododata-e3181",
    storageBucket: "tododata-e3181.firebasestorage.app",
    messagingSenderId: "133114291716",
    appId: "1:133114291716:web:0485a5fb4b197dbf563751",
    measurementId: "G-SZE4X10TDF"
}

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// 데이터 불러오기
export async function fetchData() {
    const response = await fetch(`https://firestore.googleapis.com/v1/projects/tododata-e3181/databases/(default)/documents/Scrum`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("데이터를 불러오는데 실패했습니다.");
    }

    const data = await response.json();
    return data; // 데이터를 반환
}

// 데이터 load 하기
async function loadData() {
    try {
        const data = await fetchData(); // fetchData 호출
        if (data.documents) {
            data.documents.forEach(doc => {
                const fields = doc.fields;
                let teamAim = fields.teamAim.stringValue
                let ghGoal = fields.ghGoal.stringValue
                let cjGoal = fields.cjGoal.stringValue
                let syGoal = fields.syGoal.stringValue
                let id = doc.name.split("/").pop();
                let date = fields.date?.stringValue
                let ghcheck = fields.ghcheck.stringValue
                let cjcheck = fields.cjcheck.stringValue
                let sycheck = fields.sycheck.stringValue
                let temp_html = ``
                temp_html =
                    `   <div class="accordion-item" id="${id}">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}" aria-expanded="false" aria-controls="collapse${id}">
                                    # ${date} ] 데일리 스크럼
                                </button>
                            </h2>
                            <div id="collapse${id}" class="accordion-collapse collapse" >
                                <div class="accordion-body">
                                    <div>
                                        <h5>오늘의 팀 목표</h5>
                                        <p>${teamAim}</p>
                                    </div>
                                    <br>
                                    <div>
                                        <h5>개별 목표 달성 여부</h5>
                                        <div  id="goalGap"></div>
                                        <h6>규현님 목표) </h6>
                                        <div class="form-check stack-check">
                                            <input class="form-check-input ghcheckbox" type="checkbox" value="" id="flexCheckDefault" style="pointer-events: none;" ${ghcheck}>
                                            <label class="form-check-label" for="flexCheckDefault">
                                                ${ghGoal}
                                            </label>
                                        </div>
                                        <h6>채진님 목표) </h6>
                                        <div class="form-check stack-check">
                                            <input class="form-check-input cjcheckbox"  type="checkbox" value="" id="flexCheckDefault" style="pointer-events: none;" ${cjcheck} >
                                            <label class="form-check-label" for="flexCheckDefault">
                                                ${cjGoal}
                                            </label>
                                        </div>
                                        <h6>신영님 목표) </h6>
                                        <div class="form-check stack-check">
                                            <input class="form-check-input sycheckbox" type="checkbox" value="" id="flexCheckDefault" style="pointer-events: none;" ${sycheck}>
                                            <label class="form-check-label" for="flexCheckDefault">
                                                ${syGoal}
                                            </label>
                                        </div>
                                    </div>
                                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button id="scrumEditBtn" class="btn btn-warning" type="button">수정하기</button>
                                        <button id="scrumDeleteBtn" class="btn btn-warning" type="button" data-bs-toggle="modal" data-bs-target="#deleteScrumModal">삭제하기</button>
                                    </div>
                                </div>
                            </div>
                        </div>    
                `
                $("#accordionExample").append(temp_html);
            });
        } else {
            console.log("문서 없음");
        }
    } catch (error) {
        console.error("오류 발생:", error);
    }
}
loadData();


// 날씨 환산 함수
function getTodayDate() {
    let today = new Date();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    return `${month < 10 ? '0' + month : month}월 ${day < 10 ? '0' + day : day}일`;
}

// 데이터 추가하기기
$("#addScrumBtn").click(async function () {
    let pwd = $('#scrumPassword').val().trim()
    if (pwd == "gcs") {
        const data = {
            fields: {
                teamAim: { stringValue: $('#teamAim').val() },  // 필드 이름이 정확한지 확인
                ghGoal: { stringValue: $('#ghGoal').val() },
                cjGoal: { stringValue: $('#cjGoal').val() },
                syGoal: { stringValue: $('#syGoal').val() },
                id: { stringValue: Date.now().toString() }, // 내가 지정한 ID 값
                date: { stringValue: getTodayDate() },
                ghcheck: { stringValue: " " },
                cjcheck: { stringValue: " " },
                sycheck: { stringValue: " " }
            }
        };
        // POST 요청으로 문서 추가
        fetch("https://firestore.googleapis.com/v1/projects/tododata-e3181/databases/(default)/documents/Scrum", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": "AIzaSyC_AWLt1X27LrQB9j4H67Zf0N5v0Hc4Vig"
            },
            body: JSON.stringify(data)  // 데이터를 JSON으로 변환하여 전송
        })
            .then(response => {
                console.log(response.body)
                if (!response.ok) {

                    console.error("Error: ", response.statusText);
                    return response.text(); // 응답을 텍스트로 읽기

                }
                location.reload(); // 페이지 새로고침
                return response.json();
            })
            .then(data => {
                console.log(JSON.stringify(data))
                location.reload(); // 페이지 새로고침
            })
            .catch(error => console.error("데이터 추가 실패:", error));
    }
    else {
        $("#addScrumModal").modal("hide");
        $("#pwdScrumModal").modal("show");
    }
});

$("#pwdScrumok").click(async function () {
    location.reload(); // 페이지 새로고침
})

// 삭제 버튼을 클릭했을 시,
$(document).on("click", "#scrumDeleteBtn", async function () {
    const pwd = prompt("비밀번호를 입력하세요:").trim();
    if (pwd == 'gcs') {
        let id = $(this).parent().parent().parent().parent().attr("id");

        $(document).on("click", "#deleteScrumBtn", async function () {
            fetch(`https://firestore.googleapis.com/v1/projects/tododata-e3181/databases/(default)/documents/Scrum/${id}`, {
                method: "DELETE",
                headers: {
                    "x-goog-api-key": `AIzaSyC_AWLt1X27LrQB9j4H67Zf0N5v0Hc4Vig`
                }
            })
                .then(response => {
                    if (response.ok) {
                        console.log("삭제 완료!");
                        location.reload(); // 페이지 새로고침
                    }
                })
                .catch(error => console.error("오류 발생:", error));
        });
    }
    else {
        $("#pwdScrumModal").modal("show");
    }
})


// Edit Div 창 띄우기
$(document).on("click", "#scrumEditBtn", async function () {
    // 1. 해당 버튼을 누른 요소의 상위 id 값을 저장해야함.
    let id = $(this).parent().parent().parent().parent().attr("id");
    // 2. id 말고 다른 것도 불러오자. get 으로 다 땡겨오자.
    fetch(`https://firestore.googleapis.com/v1/projects/tododata-e3181/databases/(default)/documents/Scrum/${id}`, {
        method: "GET",
        headers: {
            "x-goog-api-key": `AIzaSyC_AWLt1X27LrQB9j4H67Zf0N5v0Hc4Vig`
        }
    })
        .then(response => response.json()) // json 으로 파싱.
        .then(data => {
            $("#editBox").remove();
            const cjGoal = data.fields.cjGoal.stringValue;
            const cjcheck = data.fields.cjcheck.stringValue;
            const date = data.fields.date.stringValue;
            const ghGoal = data.fields.ghGoal.stringValue;
            const ghcheck = data.fields.ghcheck.stringValue;
            const document_id = data.name.split("/").pop();
            const id = data.fields.id.stringValue;
            const syGoal = data.fields.syGoal.stringValue;
            const sycheck = data.fields.sycheck.stringValue;
            const teamAim = data.fields.teamAim.stringValue;

            let temp_html = `
            <div class="mypostingbox" id="editBox" data-value="${document_id}">
                <h3>데일리 스크럼 수정</h3>
                <br>
                <h3>오늘의 팀 목표</h3>
                <div class="form-floating" id="editBoxdatevalue"  data-value ="${date}">
                    <textarea class="form-control" placeholder="Leave a comment here" id="editteamAim"
                        style="height: 100px" >${teamAim}</textarea>
                    <label for="teamAim">팀 목표</label>
                </div>
                <h3>팀원 개별 목표</h3>
                <div class="form-floating">
                    <input class="form-control" id="editghGoal" value="${ghGoal}">
                    <label for="floatingInput">규현 목표</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input sycheckbox" type="checkbox" value="" id="ghEditCheckbox" ${ghcheck}>
                        <label class="form-check-label" for="flexCheckDefault"> 규현 완료 여부 
                        </label>
                </div>
                <div class="form-floating">
                    <input class="form-control" id="editcjGoal" value="${cjGoal}">
                    <label for="floatingInput"> 채진 목표</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input sycheckbox" type="checkbox" value="" id="cjEditCheckbox" ${cjcheck}>
                        <label class="form-check-label" for="flexCheckDefault"> 채진 완료 여부 
                        </label>
                </div>
                <div class="form-floating">
                    <input class="form-control" id="editsyGoal" value="${syGoal}">
                    <label for="floatingInput">신영 목표</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input sycheckbox" type="checkbox" value="" id="syEditCheckbox" ${sycheck}>
                        <label class="form-check-label" for="flexCheckDefault"> 신영 완료 여부 
                        </label>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control" id="scrumEditPassword" placeholder="Password">
                    <label for="scrumEditPassword">비밀번호</label>
                </div>
                <br>
                <div class="mybtn">
                    <!-- 수정하기 버튼 / 모달 작동 시키면 됩니다. -->
                    <button id="EditBtn" type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editScrumModal">수정완료</button>
                    <button id="EditcloseBtn" type="button" class="btn btn-warning">닫기</button>
                </div>
            </div>
    `
            $("#scrumEditDiv").show();
            $("#scrumEditDiv").append(temp_html);
        })
})


// 실제 수정하기 버튼을 눌렀을 시, 데이터를 Edit 해주기
$(document).on("click", "#EditBtn", async function () {
    let pwd = $('#scrumEditPassword').val().trim()
    if (pwd == "gcs") {
        let id = $("#editBox").data("value").toString();
        let teamAim = $("#editteamAim").val();
        let editghGoal = $("#editghGoal").val();
        let editcjGoal = $("#editcjGoal").val();
        let editsyGoal = $("#editsyGoal").val();
        let date = $("#editBoxdatevalue").data("value").toString();
        let ghcheck = " ";
        let cjcheck = " ";
        let sycheck = " ";
        if ($("#ghEditCheckbox").prop("checked")) {
            ghcheck = "checked";
        }
        if ($("#cjEditCheckbox").prop("checked")) {
            cjcheck = "checked";
        }
        if ($("#syEditCheckbox").prop("checked")) {
            sycheck = "checked";
        }


        $(document).on("click", "#editScrumBtn", async function () {
            // PATCH 요청으로 데이터 업데이트
            fetch(`https://firestore.googleapis.com/v1/projects/tododata-e3181/databases/(default)/documents/Scrum/${id}?` +
                `updateMask.fieldPaths=date&updateMask.fieldPaths=teamAim&updateMask.fieldPaths=ghGoal&` +
                `updateMask.fieldPaths=cjGoal&updateMask.fieldPaths=syGoal&updateMask.fieldPaths=ghcheck&` +
                `updateMask.fieldPaths=cjcheck&updateMask.fieldPaths=sycheck`, {
                method: "PATCH",
                headers: {
                    "x-goog-api-key": `AIzaSyC_AWLt1X27LrQB9j4H67Zf0N5v0Hc4Vig`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fields: {
                        date: { stringValue: date },
                        teamAim: { stringValue: teamAim },
                        ghGoal: { stringValue: editghGoal },
                        cjGoal: { stringValue: editcjGoal },
                        syGoal: { stringValue: editsyGoal },
                        ghcheck: { stringValue: ghcheck },
                        cjcheck: { stringValue: cjcheck },
                        sycheck: { stringValue: sycheck }
                    }
                })
            })
                .then(response => {
                    if (response.ok) {
                        location.reload(); // 페이지 새로고침
                        return response.json();
                    } else {
                        throw new Error("업데이트 실패");
                    }
                })
                .then(responseData => {
                    console.log(JSON.stringify(responseData));
                })

        })
    }
    else {
        $("#editScrumModal").modal("hide");
        $("#pwdScrumModal").modal("show");
    }
})

$(document).on('click', "#EditcloseBtn", async function () {
    $("#scrumEditDiv").hide();
    $("#editBox").remove();
})
