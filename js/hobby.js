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
$("#addhobbybtn").click(async function () {
    let img = $('#img').val();
    let hobby = $('#hobby').val();
    let name = $('#name').val();
    let customId = Date.now().toString();
    const docRef = doc(db, "Dotorihobby", customId);
    await setDoc(docRef, {

        img: img,
        hobby: hobby,
        name: name
    });
    window.location.reload();
})

// 화면에 띄우기
let dotorihobby = await getDocs(collection(db, "Dotorihobby"));
dotorihobby.forEach(coments => {
    let id = coments.data()['id'];
    let img = coments.data()['#img'];
    let hobby = coments.data()['#hobby'];
    let name= coments.data()['#name'];
    let temp_html = ``
    temp_html = `
    <div class="card" style="width: 18rem;" data-value= "${id}" >
        <img src="${img}" class="card-img-top" alt="...">
        <div class="card-body">
        <p class="card-text"><strong>${hobby}</strong></p>
        <p class="card-text">${name}(Spring_6기)</p>
        <button type="button" class="btn btn-dark">기록하기</button>
    </div>
    `;

    $('#hobbybook').append(temp_html);
});