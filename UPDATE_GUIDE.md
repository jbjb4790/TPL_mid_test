# Young's Physics 2020-2022 시험 추가 가이드

이 ZIP은 이미 운영 중인 GitHub Pages 시험 사이트에 2020, 2021, 2022년 시험을 추가하기 위한 변경분입니다.

## GitHub에 업로드할 파일

ZIP을 풀고 `docs/` 안의 파일과 폴더를 GitHub 저장소의 같은 경로에 업로드합니다.

```text
docs/
├─ index.html                         기존 파일 교체
├─ app.js                             기존 파일 교체
├─ styles.css                         기존 파일 교체
├─ historical-exams-2020-2022.js     새 파일
└─ assets/
   ├─ 2020-mid/                       새 폴더
   ├─ 2021-mid/                       새 폴더
   └─ 2022-mid/                       새 폴더
```

`docs/config.js`는 이 ZIP에 포함하지 않았습니다. 기존 2023-2026 Apps Script `/exec` 주소가 덮어써지는 것을 방지하기 위한 것입니다.

## 새 시험의 제한 시간

- 2020년: 150분
- 2021년: 150분
- 2022년: 90분

각 학생이 시험 시작 버튼을 누른 시각부터 서버 기준으로 제한 시간이 계산됩니다. 시작 가능 날짜와 종료 날짜는 따로 제한하지 않습니다.

## 2020-2022 전용 Apps Script 연결

정답과 상세 해설은 공개 GitHub에 넣지 않았습니다. 별도로 제공된 `youngs-physics-private-admin-2020-2022.zip`의 Apps Script를 웹 앱으로 배포한 뒤, `/exec` URL을 다음 파일에 넣습니다.

```text
docs/historical-exams-2020-2022.js
```

아래 placeholder를 실제 URL로 바꿉니다.

```javascript
const HISTORICAL_BACKEND_URL = "PASTE_HISTORICAL_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
```

## 2020·2021 선택지

2020년과 2021년 원문은 단답·서술형 시험입니다. 한 문제씩 선택하여 제출하는 기존 사이트 형식에 맞추기 위해 각 문항을 5지선다로 변환했습니다. 문제 이미지는 원문을 유지하며, 새로 만든 선택지는 문제 이미지 아래에 표시됩니다.

## 2022 문항 번호

2022년은 제1교시 15문항과 제2교시 15문항을 한 시험으로 합쳤습니다.

- 온라인 1~15번: 제1교시 1~15번
- 온라인 16~30번: 제2교시 1~15번

## 반영 확인

GitHub Pages에서 시험 선택 드롭다운에 다음 세 시험이 표시되어야 합니다.

- 2022년 한국중학생물리대회 중급과정
- 2021년 한국중학생물리대회 중급과정
- 2020년 한국중학생물리대회 중급과정

특정 시험을 바로 열려면 주소 뒤에 다음 쿼리를 붙입니다.

```text
?exam=physics-2022-mid
?exam=physics-2021-mid
?exam=physics-2020-mid
```
