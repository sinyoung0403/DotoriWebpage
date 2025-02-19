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
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// 날씨 환산 함수
function getTodayDate() {
    let today = new Date();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    return `${month < 10 ? '0' + month : month}월 ${day < 10 ? '0' + day : day}일`;
}

// DB 에 보내기
$("#addScrumBtn").click(async function () {
    let teamAim = $('#teamAim').val();
    let ghGoal = $('#ghGoal').val();
    let cjGoal = $('#cjGoal').val();
    let syGoal = $('#syGoal').val();
    let customId = Date.now().toString();
    let date = getTodayDate();

    const docRef = doc(db, "Scrum", customId);
    await setDoc(docRef, {
        id: customId,
        teamAim: teamAim,
        ghGoal: ghGoal,
        cjGoal:cjGoal,
        syGoal:syGoal,
        ghcheck:" ",
        cjcheck:" ",
        sycheck:" ",
        date:date
    });
    window.location.reload();
})

// 데이터 띄우기
let scrums = await getDocs(collection(db,"Scrum"));
scrums.forEach(scrum=> {
    let teamAim= scrum.data()['teamAim']
    let ghGoal= scrum.data()['ghGoal']
    let cjGoal= scrum.data()['cjGoal']
    let syGoal= scrum.data()['syGoal']
    let id= scrum.data()['id']
    let date= scrum.data()['date']
    let ghcheck = scrum.data()['ghcheck']
    let cjcheck = scrum.data()['cjcheck']
    let sycheck = scrum.data()['sycheck']
    let temp_html = ``

    temp_html= 
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
                        <div>
                            <h5>개별 목표 달성 여부</h5>
                            <div class="form-check">
                                <input class="form-check-input ghcheckbox" type="checkbox" value="" id="flexCheckDefault" ${ghcheck}>
                                <label class="form-check-label" for="flexCheckDefault">
                                    ${ghGoal}
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input cjcheckbox"  type="checkbox" value="" id="flexCheckDefault" ${cjcheck}>
                                <label class="form-check-label" for="flexCheckDefault">
                                    ${cjGoal}
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input sycheckbox" type="checkbox" value="" id="flexCheckDefault" ${sycheck}>
                                <label class="form-check-label" for="flexCheckDefault">
                                    ${syGoal}
                                </label>
                            </div>
                        </div>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button id="scrumEditBtn" class="btn btn-warning" type="button">수정하기</button>
                            <button id="scrumDeleteBtn" class="btn btn-warning" type="button">삭제하기</button>
                        </div>
                    </div>
                </div>
            </div>    
    `
    $("#accordionExample").append(temp_html);
});



// check 박스가 변경 되면 그걸 DB 에 연결해주어야함.
$('.ghcheckbox').change(async function () {
    let id = $(this).parent().parent().parent().parent().parent().attr("id");
    const docRef = doc(db, "Scrum", id);
    if ($(this).is(':checked')) {
        await updateDoc(docRef, {
            ghcheck: "checked"
        });
        window.location.reload();
    } else {
        await updateDoc(docRef, {
            ghcheck: " "
        });
        window.location.reload();
    }
});

$('.cjcheckbox').change(async function () {
    let id = $(this).parent().parent().parent().parent().parent().attr("id");

    const docRef = doc(db, "Scrum", id);
    if ($(this).is(':checked')) {
        await updateDoc(docRef, {
            cjcheck: "checked"
        });
        window.location.reload();

    } else {
        await updateDoc(docRef, {
            cjcheck: " "
        });
        window.location.reload();
    }
});

$('.sycheckbox').change(async function () {
    let id = $(this).parent().parent().parent().parent().parent().attr("id");

    const docRef = doc(db, "Scrum", id);
    if ($(this).is(':checked')) {
        await updateDoc(docRef, {
            sycheck: "checked"
        });
        window.location.reload();

    } else {
        await updateDoc(docRef, {
            sycheck: " "
        });
        window.location.reload();
    }
});

// 삭제 버튼을 클릭했을 시,
$(document).on("click","#scrumDeleteBtn",async function () {
    let id = $(this).parent().parent().parent().parent().attr("id");


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
        } else {
            console.error("삭제 실패:", response.statusText);
        }
    })
    .catch(error => console.error("오류 발생:", error));
})


// Edit Div 창 띄우기
$(document).on("click","#scrumEditBtn",async function () {
    // 1. 해당 버튼을 누른 요소의 상위 id 값을 저장해야함.
    let id = $(this).parent().parent().parent().parent().attr("id");
    // 2. id 말고 다른 것도 불러오자. get 으로 .. 다 땡겨오자.
    fetch(`https://firestore.googleapis.com/v1/projects/tododata-e3181/databases/(default)/documents/Scrum/${id}`, {
        method: "GET",
        headers: {
            "x-goog-api-key": `AIzaSyC_AWLt1X27LrQB9j4H67Zf0N5v0Hc4Vig`
        }
    })
    .then(response => response.json()) // json 으로 파싱.
    .then(data => {
        const cjGoal = data.fields.cjGoal.stringValue;
        const cjcheck = data.fields.cjcheck.stringValue;
        const date = data.fields.date.stringValue;
        const ghGoal = data.fields.ghGoal.stringValue;
        const ghcheck = data.fields.ghcheck.stringValue;
        const id = data.fields.id.stringValue;
        const syGoal = data.fields.syGoal.stringValue;
        const sycheck = data.fields.sycheck.stringValue;
        const teamAim = data.fields.teamAim.stringValue;
    
    let temp_html = `
            <div class="mypostingbox" id="editBox" data-value="${id}">
                <h3>데일리 스크럼 수정</h3>
                <br>
                <h3>오늘의 팀 목표</h3>
                <div class="form-floating">
                    <textarea class="form-control" placeholder="Leave a comment here" id="editteamAim"
                        style="height: 100px">${teamAim}</textarea>
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
                    <input class="form-control" id="editsjGoal" value="${syGoal}">
                    <label for="floatingInput">신영 목표</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input sycheckbox" type="checkbox" value="" id="syEditCheckbox" ${sycheck}>
                        <label class="form-check-label" for="flexCheckDefault"> 신영 완료 여부 
                        </label>
                </div>
                <br>
                <div class="mybtn">
                    <!-- 수정하기 버튼 / 모달 작동 시키면 됩니다. -->
                    <button id="EditBtn" type="button" class="btn btn-warning">수정하기</button>
                    <button id="EditcloseBtn" type="button" class="btn btn-warning">닫기</button>
                </div>
            </div>
    `
    $("#scrumEditDiv").show();
    $("#scrumEditDiv").append(temp_html);
    })
})


// 실제 수정하기 버튼을 눌렀을 시, 데이터를 Edit 해주기
$(document).on("click","#EditBtn",async function () {
    let id = $("#editBox").data("value");
    let teamAim = $("#editteamAim").val();
    let editghGoal = $("#editghGoal").val();
    let editcjGoal = $("#editcjGoal").val();
    let editsjGoal = $("#editsjGoal").val();
    let ghcheck = " ";
    let cjcheck = " ";
    let sycheck = " ";
    console.log(id);
    if ($("#ghEditCheckbox").prop("checked")) {
        ghcheck ="checked";
    }
    if ($("#cjEditCheckbox").prop("checked")) {
        cjcheck ="checked";
    }
    if ($("#syEditCheckbox").prop("checked")) {
        sycheck ="checked";
    }
    
    // json 형태로 저장해두기
    const updatedData = {
        fields: {
            teamAim: { stringValue: teamAim },
            ghGoal: { stringValue: editghGoal },
            cjGoal: { stringValue: editcjGoal },
            syGoal: { stringValue: editsjGoal },
            ghcheck: { stringValue: ghcheck },  
            cjcheck: { stringValue: cjcheck }, 
            sycheck: { stringValue: sycheck }   
        }
    };
    console.log(updatedData)


        // PATCH 요청으로 데이터 업데이트
        fetch(`https://firestore.googleapis.com/v1/projects/tododata-e3181/databases/(default)/documents/Scrum/${id}`, {
            method: "PATCH",
            headers: {
                "x-goog-api-key": `AIzaSyC_AWLt1X27LrQB9j4H67Zf0N5v0Hc4Vig`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData)
        })
        .then(response => {
            if (response.ok) {
                location.reload(); // 페이지 새로고침
            } else {
                throw new Error("업데이트 실패");
            }
        })


})

$(document).on('click',"#EditcloseBtn", async function () {
    $("#scrumEditDiv").hide();
    $("#editBox").remove();
})
