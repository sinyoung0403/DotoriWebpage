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
        cjGoal: cjGoal,
        syGoal: syGoal,
        ghcheck: " ",
        cjcheck: " ",
        sycheck: " ",
        date: date
    });
    window.location.reload();
})

// 데이터 띄우기
let scrums = await getDocs(collection(db, "Scrum"));
scrums.forEach(scrum => {
    let teamAim = scrum.data()['teamAim']
    let ghGoal = scrum.data()['ghGoal']
    let cjGoal = scrum.data()['cjGoal']
    let syGoal = scrum.data()['syGoal']
    let id = scrum.data()['id']
    let date = scrum.data()['date']
    let ghcheck = scrum.data()['ghcheck']
    let cjcheck = scrum.data()['cjcheck']
    let sycheck = scrum.data()['sycheck']
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
                        <div>
                            <h5>개별 목표 달성 여부</h5>
                            <div class="form-check">
                                <input class="form-check-input ghcheckbox" type="checkbox" value="" id="flexCheckDefault" ${ghcheck} disabled>
                                <label class="form-check-label" for="flexCheckDefault">
                                    ${ghGoal}
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input cjcheckbox"  type="checkbox" value="" id="flexCheckDefault" ${cjcheck} disabled>
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
                            <button id="scrumDeleteBtn" class="btn btn-warning" type="button" data-bs-toggle="modal" data-bs-target="#deleteScrumModal">삭제하기</button>
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
$(document).on("click", "#scrumDeleteBtn", async function () {
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
            } else {
                console.error("삭제 실패:", response.statusText);
            }
        })
        .catch(error => console.error("오류 발생:", error));
    });
})


// Update 만들기
