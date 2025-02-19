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


// DB 에 보내기
$("#addCommentBtn").click(async function () {
    let name = $('#name').val();
    let content = $('#content').val();
    let customId = Date.now().toString();
    const docRef = doc(db, "Dotori", customId);
    await setDoc(docRef, {
        id: customId,
        name: name,
        coment: content
    });
    window.location.reload();
})



// 화면에 띄우기
let dotori = await getDocs(collection(db, "Dotori"));
dotori.forEach((coments) => {
    let id = coments.data()['id'];
    let name = coments.data()['name'];
    let content = coments.data()['coment'];
    let temp_html = ``
    temp_html = `
    <div class="col" id="${id}">
        <div class="card h-100">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${content}</p>
            </div>
            <button id="guestDelete" data-bs-toggle="modal" data-bs-target="#delCommentModal">
                <div class="card-footer">삭제
                </div>
            </button>
        </div>
    </div>`;

    $('#guestBook').append(temp_html);
});


// 방명록 삭제하기 
$(document).on("click", "#guestDelete", async function () {
    let id = $(this).parent().parent().attr("id");
    $(document).on("click", "#deleteCommentBtn", async function () {
        const docRef = doc(db, "Dotori", id);
        await deleteDoc(docRef);
        window.location.reload();
    })
})


var apiUrl = "https://api.openweathermap.org/data/2.5/weather?id=1835848&APPID=2b26f0cb27375511054fc26654fb56b6&lang=kr&units=metric";
fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
        var temperature = data.main.temp;
        var description = data.weather[0].description;
        $('#tempInfo').text(temperature);
        $('#weatherInfo').text(description);
    })
