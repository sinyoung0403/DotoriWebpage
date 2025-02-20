| 🌰 DotoriWebpage 🌰 |  
|:-------------:|
|  ![image](https://i.pinimg.com/236x/5a/83/d5/5a83d549e586c7071c1ed6dceeeac46a.jpg) |


## 🎫 배포 사이트

### ✔️ https://sinyoung0403.github.io/DotoriWebpage/
- 메인 페이지에서 방명록을 쓸 수 있습니다.
- 상세 페이지에서는 각 팀원의 소개를 볼 수 있습니다.
- 취미 페이지에서는 취미 등록 및 삭제가 가능합니다.
- 스크럼 페이지에서는 목표를 추가, 삭제, 편집, 완료 여부를 저장할 수 있는 기능을 제공합니다.
<br>
<br>


## ⚒ 개발 팀 소개

| 역할 | 팀장 |  팀원 | 팀원|
|:-------------:|:-------------:|:-------------:|:-------------:|
|프로필|![image](https://avatars.githubusercontent.com/u/94594402?v=4&size=64)|![image](https://avatars.githubusercontent.com/u/196007904?v=4&size=64)|![image](https://avatars.githubusercontent.com/u/109498876?v=4&size=64)|
|이름|박신영|김규현|김채진|
|GitHub|sinyoung0403|0122-0|kmchaejin|
|기술블로그|[신영tistory](https://sintory-04.tistory.com/)|[규현velog](https://velog.io/@flowercat95/posts)|[채진tistory](https://go-getter1kim.tistory.com/)|

<br>
<br>

## ⚒ 프로젝트

### ✔️ 프로젝트 이름

- **" Dotori Webpage "**

### ✔️ 프로젝트 소개

- 저희의 Web application은 메인페이지(방명록), 취미페이지, 데일리 스크럼 페이지로 구성되어 있습니다.
- 각 페이지에서는 직관적인 인터페이스를 통해 항목을 추가, 삭제, 및 편집을 할 수 있습니다.
- Firebase의 `JavaScript SDK`와 `Fetch`를 활용하여 real-time data storage를 구현했습니다.
- `HTML`, `CSS`, `Bootstrap` 으로 디자인 하였으며, `JS`와 `Jqery`를 활용하여 데이터의 실시간 반영, 동적관리 등을 통해 사용자와의 상호작용을 강화했습니다.

<br>
<br>

## 🌟 주요 기능 

#### 1️⃣ 방명록 Create, Read, Delete 구현
#### 2️⃣ 데일리 스크럼 Create, Read, Update, Delete 구현
#### 3️⃣ 취미 Create, Read, Delete 구현

<br>
<br>

## 💡 구현된 기능

### ✔️ 메인 페이지 

1️⃣ 조회
- 방명록 조회

2️⃣ 추가
- 방명록 버튼 클릭 시, 입력 폼 토글 동작
- 입력폼 기록하기 버튼 클릭 시, 모달 동작

  → 모달의 생성하기 버튼 클릭 시, 페이지 리로드 & 방명록 데이터 추가

3️⃣ 삭제
- 방명록 삭제 버튼 클릭 시, 모달 동작
  
  → 모달의 삭제하기 버튼 클릭 시, 페이지 리로드 & 방명록 데이터 삭제

4️⃣ 기타

- Bootstrap의 `carousel`를 통해 팀 소개, 팀 목표, 팀 약속 조회
- `Fetch API` 를 통해 날씨 `API` 제공

<br>

### ✔️ 상세 페이지 
- Bootstrap의 `carousel` 배치
- Bootstrap의 `collapse` 배치
- Bootstrap의 `accordion` 배치

<br>

### ✔️ 데일리 스크럼 페이지

1️⃣ 조회
- 일자별 데일리 스크럼 목록 조회
- 데일리 스크럼 버튼 클릭 시, 상세 정보 토글로 조회

2️⃣ 추가
- 입력 폼에 팀 목표, 개별 목표 작성 후 기록하기 버튼 클릭 시, 모달 동작
  
  → 모달의 추가하기 버튼 클릭 시, 페이지 리로드 & 방명록 데이터 추가  

3️⃣ 삭제
- 삭제하기 버튼 클릭 시, 모달 동작

  → 모달의 삭제하기 버튼 클릭 시, 페이지 리로드 & 데이터 삭제

4️⃣ 수정
- 각 스크럼 항목의 수정하기 버튼 클릭 시, 개별 수정 창 동적 동작
- 수정완료 버튼 클릭 시, 모달 동작
  
  → 모달의 완료하기 버튼 클릭 시, 페이지 리로드 & 데이터 수정 구현

<br>

### ✔️ 취미 페이지

1️⃣ 조회

- '펼쳐보기' 버튼을 클릭 시, 토글로 취미 목록 조회

2️⃣ 추가

- 기록하기 버튼 클릭 시, 페이지 리로드 & 취미 데이터 추가 

3️⃣ 삭제

- 삭제하기 버튼 클릭 시, 페이지 리로드 & 취미 데이터 삭제 

4️⃣ 기타
- Bootstrap의 `carousel`를 통해 팀원들의 취미 조회



<br>
<br>


## 🏷️ Data

### ✔️ 메인페이지 (방명록)

> 문서 ID 는 JavaScript SDK 를 이용하여 Custom id로 정했습니다.

| | 데이터 이름 |  데이터 형태 | 데이터 설명|
|:-------------:|:-------------:|:-------------:|:-------------:|
| 1 | id |  String | 방명록을 작성한 시점을 밀리초로 환산하여 Id 값을 지정 |
| 2 | name |  String | 방명록 적은 사람의 닉네임 |
| 3 | coment |  String | 방명록 text |
<br>  

###  ✔️ 데일리 스크럼 페이지

> 문서 ID 는 Firebase 에서 랜덤으로 주어진 값을 사용합니다.

|  | 데이터 이름 |  데이터 형태 | 데이터 설명|
|:-------------:|:-------------:|:-------------:|:-------------:|
| 1 | id | String | 스크럼을 추가한 시점을 밀리초로 환산하여 Id 값을 지정 |
| 2 | date | String | 스크럼을 추가한 날짜를 mm월 dd일 형태 저장 |
| 3 | teamAim | String | 팀원 전체 목표 |
| 4 | ghGoal | String | 규현님 개별 목표 |
| 5 | cjGoal | String | 채진님 개별 목표 |
| 6 | syGoal | String | 신영님 개별 목표 |
| 7 | ghchek | String | 규현님 개별 목표 완료 여부 |
| 8 | cjchek | String | 채진님 개별 목표 완료 여부 |
| 9 | sychek | String | 신영님 개별 목표 완료 여부 |
<br>

###  ✔️ 취미 페이지

> 문서 ID 는 JavaScript SDK 를 이용하여 Custom id로 정했습니다.
> 
| | 데이터 이름 |  데이터 형태 | 데이터 설명|
|:-------------:|:-------------:|:-------------:|:-------------:|
| 1 | id |  String | 취미를 등록한 시점을 밀리초로 환산하여 Id 값을 지정 |
| 2 | name |  String | 기록한 사용자의 이름 |
| 3 | img |  String | 기록한 사용자의 취미를 보여주는 사진 (이미지 주소) |
| 4 | hobby |  String | 기록한 사용자의 취미의 이름 |

<br>
<br>

## 📚 Stacks

### ✔️ Environment 
<img src="https://img.shields.io/badge/visual Studio Code-3776AB?style=for-the-badge&logo=racket&logoColor=white"/> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">

### ✔️ Front-End
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/jquery-0769AD?style=for-the-badge&logo=jquery&logoColor=white"> 

### ✔️ Back-End 
<img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">

<br>
<br>



## 💻 Screen Layout

### 메인 페이지
<p align="center">
<img src="./img/mainPage1.png" width="300" height="200">
<img src="./img/mainPage2.png" width="300" height="200">
<img src="./img/mainPage3.png" width="300" height="200">
</p>

<br>
<br>

### 상세 페이지
#### 규현 개인 페이지
<p align="center">
<img src="./img/ghPage1.png" width="300" height="200">
<img src="./img/ghPage2.png" width="300" height="200">
</p>

#### 채진 개인 페이지
<p align="center">
<img src="./img/cjPage1.png" width="250" height="200">
<img src="./img/cjPage2.png" width="250" height="200">
<img src="./img/cjPage3.png" width="250" height="200">
</p>

#### 신영 개인 페이지
<p align="center">
<img src="./img/syPage1.png" width="300" height="200">
<img src="./img/syPage2.png" width="300" height="200">
<img src="./img/syPage3.png" width="300" height="200">
<img src="./img/syPage4.png" width="300" height="200">
</p>

<br>
<br>

### 취미 페이지

<p align="center">
<img src="./img/취미1.png" width="300" height="200">
<img src="./img/취미2.png" width="300" height="200">
</p>
<p align="center">
<img src="./img/취미3.png" width="300" height="200">
<img src="./img/취미4.png" width="300" height="200">
</p>

### 데일리 스크럼
<p align="center">
<img src="./img/데일리1.png" width="300" height="200">
<img src="./img/데일리4.png" width="300" height="200">
<img src="./img/데일리6.png" width="300" height="200">
<img src="./img/데일리7.png" width="300" height="200">
<img src="./img/데일리8.png" width="300" height="200">
<img src="./img/데일리9.png" width="300" height="200">
</p>

<br>
<br>
