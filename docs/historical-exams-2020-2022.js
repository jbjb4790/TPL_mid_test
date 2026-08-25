// 2020-2022 한국중학생물리대회 공개 시험 설정입니다.
// 이 파일에는 정답과 해설이 없습니다. 정답·채점·해설은 별도 Apps Script에만 저장됩니다.

(() => {
  "use strict";

  const HISTORICAL_BACKEND_URL = "PASTE_HISTORICAL_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
  const cfg = window.YP_EXAM_CONFIG;

  if (!cfg || !Array.isArray(cfg.exams)) {
    console.error("YP_EXAM_CONFIG가 먼저 로드되어야 합니다.");
    return;
  }

  const historicalExams = [
  {
    "id": "physics-2022-mid",
    "title": "2022년 한국중학생물리대회 중급과정",
    "shortTitle": "2022 중급",
    "description": "제1·2교시를 하나의 시험으로 구성한 객관식 30문항입니다.",
    "year": "2022",
    "round": "통합",
    "folder": "2022-mid",
    "durationSeconds": 5400,
    "openAt": null,
    "closeAt": null,
    "defaultChoiceCount": 5,
    "questions": [
      {
        "id": 1,
        "title": "1번",
        "choiceCount": 5,
        "image": "./assets/2022-mid/q01.png"
      },
      {
        "id": 2,
        "title": "2번",
        "choiceCount": 5,
        "image": "./assets/2022-mid/q02.png"
      },
      {
        "id": 3,
        "title": "3번",
        "choiceCount": 5,
        "image": "./assets/2022-mid/q03.png"
      },
      {
        "id": 4,
        "title": "4번",
        "choiceCount": 5,
        "image": "./assets/2022-mid/q04.png"
      },
      {
        "id": 5,
        "title": "5번",
        "choiceCount": 5,
        "image": "./assets/2022-mid/q05.png"
      },
      {
        "id": 6,
        "title": "6번",
        "choiceCount": 5,
        "image": "./assets/2022-mid/q06.png"
      },
      {
        "id": 7,
        "title": "7번",
        "choiceCount": 5,
        "image": "./assets/2022-mid/q07.png"
      },
      {
        "id": 8,
        "title": "8번",
        "choiceCount": 5,
        "image": "./assets/2022-mid/q08.png"
      },
      {
        "id": 9,
        "title": "9번",
        "choiceCount": 5,
        "image": "./assets/2022-mid/q09.png"
      },
      {
        "id": 10,
        "title": "10번",
        "choiceCount": 5,
        "image": "./assets/2022-mid/q10.png"
      },
      {
        "id": 11,
        "title": "11번",
        "choiceCount": 5,
        "image": "./assets/2022-mid/q11.png"
      },
      {
        "id": 12,
        "title": "12번",
        "choiceCount": 5,
        "image": "./assets/2022-mid/q12.png"
      },
      {
        "id": 13,
        "title": "13번",
        "choiceCount": 5,
        "image": "./assets/2022-mid/q13.png"
      },
      {
        "id": 14,
        "title": "14번",
        "choiceCount": 5,
        "image": "./assets/2022-mid/q14.png"
      },
      {
        "id": 15,
        "title": "15번",
        "choiceCount": 5,
        "image": "./assets/2022-mid/q15.png"
      },
      {
        "id": 16,
        "title": "16번",
        "choiceCount": 5,
        "image": "./assets/2022-mid/q16.png"
      },
      {
        "id": 17,
        "title": "17번",
        "choiceCount": 5,
        "image": "./assets/2022-mid/q17.png"
      },
      {
        "id": 18,
        "title": "18번",
        "choiceCount": 5,
        "image": "./assets/2022-mid/q18.png"
      },
      {
        "id": 19,
        "title": "19번",
        "choiceCount": 5,
        "image": "./assets/2022-mid/q19.png"
      },
      {
        "id": 20,
        "title": "20번",
        "choiceCount": 5,
        "image": "./assets/2022-mid/q20.png"
      },
      {
        "id": 21,
        "title": "21번",
        "choiceCount": 5,
        "image": "./assets/2022-mid/q21.png"
      },
      {
        "id": 22,
        "title": "22번",
        "choiceCount": 5,
        "image": "./assets/2022-mid/q22.png"
      },
      {
        "id": 23,
        "title": "23번",
        "choiceCount": 5,
        "image": "./assets/2022-mid/q23.png"
      },
      {
        "id": 24,
        "title": "24번",
        "choiceCount": 5,
        "image": "./assets/2022-mid/q24.png"
      },
      {
        "id": 25,
        "title": "25번",
        "choiceCount": 5,
        "image": "./assets/2022-mid/q25.png"
      },
      {
        "id": 26,
        "title": "26번",
        "choiceCount": 5,
        "image": "./assets/2022-mid/q26.png"
      },
      {
        "id": 27,
        "title": "27번",
        "choiceCount": 5,
        "image": "./assets/2022-mid/q27.png"
      },
      {
        "id": 28,
        "title": "28번",
        "choiceCount": 5,
        "image": "./assets/2022-mid/q28.png"
      },
      {
        "id": 29,
        "title": "29번",
        "choiceCount": 5,
        "image": "./assets/2022-mid/q29.png"
      },
      {
        "id": 30,
        "title": "30번",
        "choiceCount": 5,
        "image": "./assets/2022-mid/q30.png"
      }
    ]
  },
  {
    "id": "physics-2021-mid",
    "title": "2021년 한국중학생물리대회 중급과정",
    "shortTitle": "2021 중급",
    "description": "원문 단답·서술형 30문항을 온라인 응시용 5지선다로 변환했습니다.",
    "year": "2021",
    "round": "중급",
    "folder": "2021-mid",
    "durationSeconds": 9000,
    "openAt": null,
    "closeAt": null,
    "defaultChoiceCount": 5,
    "questions": [
      {
        "id": 1,
        "title": "1번",
        "choiceCount": 5,
        "image": "./assets/2021-mid/q01.png",
        "options": [
          "h",
          "3h/2",
          "2h",
          "5h/2",
          "3h"
        ]
      },
      {
        "id": 2,
        "title": "2번",
        "choiceCount": 5,
        "image": "./assets/2021-mid/q02.png",
        "options": [
          "(3√3-4)g",
          "(4√3-6)g",
          "(5√3-8)g",
          "(2√3-2)g",
          "(6√3-10)g"
        ]
      },
      {
        "id": 3,
        "title": "3번",
        "choiceCount": 5,
        "image": "./assets/2021-mid/q03.png",
        "options": [
          "ㄱ",
          "ㄴ",
          "ㄱ, ㄴ",
          "ㄱ, ㄷ",
          "ㄱ, ㄴ, ㄷ"
        ]
      },
      {
        "id": 4,
        "title": "4번",
        "choiceCount": 5,
        "image": "./assets/2021-mid/q04.png",
        "options": [
          "√3",
          "1/√3",
          "1/2",
          "√2/2",
          "2/√3"
        ]
      },
      {
        "id": 5,
        "title": "5번",
        "choiceCount": 5,
        "image": "./assets/2021-mid/q05.png",
        "options": [
          "√5 rad/s",
          "√8 rad/s",
          "√10 rad/s",
          "2√3 rad/s",
          "√15 rad/s"
        ]
      },
      {
        "id": 6,
        "title": "6번",
        "choiceCount": 5,
        "image": "./assets/2021-mid/q06.png",
        "options": [
          "ㄱ",
          "ㄴ",
          "ㄷ",
          "ㄱ, ㄴ",
          "ㄱ, ㄴ, ㄷ"
        ]
      },
      {
        "id": 7,
        "title": "7번",
        "choiceCount": 5,
        "image": "./assets/2021-mid/q07.png",
        "options": [
          "1/2",
          "2/3",
          "1",
          "3/2",
          "2"
        ]
      },
      {
        "id": 8,
        "title": "8번",
        "choiceCount": 5,
        "image": "./assets/2021-mid/q08.png",
        "options": [
          "ㄱ",
          "ㄴ",
          "ㄱ, ㄴ",
          "ㄱ, ㄷ",
          "ㄱ, ㄴ, ㄷ"
        ]
      },
      {
        "id": 9,
        "title": "9번",
        "choiceCount": 5,
        "image": "./assets/2021-mid/q09.png",
        "options": [
          "1/4",
          "√2/4",
          "1/2",
          "√2/2",
          "2"
        ]
      },
      {
        "id": 10,
        "title": "10번",
        "choiceCount": 5,
        "image": "./assets/2021-mid/q10.png",
        "options": [
          "ㄱ",
          "ㄴ",
          "ㄷ",
          "ㄱ, ㄷ",
          "ㄱ, ㄴ, ㄷ"
        ]
      },
      {
        "id": 11,
        "title": "11번",
        "choiceCount": 5,
        "image": "./assets/2021-mid/q11.png",
        "options": [
          "2",
          "3",
          "4",
          "5",
          "6"
        ]
      },
      {
        "id": 12,
        "title": "12번",
        "choiceCount": 5,
        "image": "./assets/2021-mid/q12.png",
        "options": [
          "ㄱ",
          "ㄴ",
          "ㄱ, ㄴ",
          "ㄱ, ㄷ",
          "ㄱ, ㄴ, ㄷ"
        ]
      },
      {
        "id": 13,
        "title": "13번",
        "choiceCount": 5,
        "image": "./assets/2021-mid/q13.png",
        "options": [
          "8 N",
          "10 N",
          "12 N",
          "14 N",
          "16 N"
        ]
      },
      {
        "id": 14,
        "title": "14번",
        "choiceCount": 5,
        "image": "./assets/2021-mid/q14.png",
        "options": [
          "18 m",
          "20 m",
          "200/9 m",
          "24 m",
          "25 m"
        ]
      },
      {
        "id": 15,
        "title": "15번",
        "choiceCount": 5,
        "image": "./assets/2021-mid/q15.png",
        "options": [
          "√(Rg sinθ)",
          "√(Rg sinθ/2)",
          "√(Rg sinθ/3)",
          "√(2Rg sinθ/3)",
          "√(3Rg sinθ)"
        ]
      },
      {
        "id": 16,
        "title": "16번",
        "choiceCount": 5,
        "image": "./assets/2021-mid/q16.png",
        "options": [
          "(√13+√3)V",
          "(√21+√3)V",
          "(√39+√3)V",
          "(√39-√3)V",
          "2√39 V"
        ]
      },
      {
        "id": 17,
        "title": "17번",
        "choiceCount": 5,
        "image": "./assets/2021-mid/q17.png",
        "options": [
          "㉠=2, ㉡=+x",
          "㉠=3, ㉡=+x",
          "㉠=4, ㉡=+x",
          "㉠=4, ㉡=-x",
          "㉠=6, ㉡=+x"
        ]
      },
      {
        "id": 18,
        "title": "18번",
        "choiceCount": 5,
        "image": "./assets/2021-mid/q18.png",
        "options": [
          "ㄱ",
          "ㄴ",
          "ㄱ, ㄴ",
          "ㄱ, ㄷ",
          "ㄱ, ㄴ, ㄷ"
        ]
      },
      {
        "id": 19,
        "title": "19번",
        "choiceCount": 5,
        "image": "./assets/2021-mid/q19.png",
        "options": [
          "160 cal",
          "180 cal",
          "200 cal",
          "220 cal",
          "240 cal"
        ]
      },
      {
        "id": 20,
        "title": "20번",
        "choiceCount": 5,
        "image": "./assets/2021-mid/q20.png",
        "options": [
          "15√2/8",
          "15√2/16",
          "15/16",
          "5√2/8",
          "3√2/4"
        ]
      },
      {
        "id": 21,
        "title": "21번",
        "choiceCount": 5,
        "image": "./assets/2021-mid/q21.png",
        "options": [
          "ㄱ",
          "ㄴ",
          "ㄱ, ㄴ",
          "ㄱ, ㄷ",
          "ㄱ, ㄴ, ㄷ"
        ]
      },
      {
        "id": 22,
        "title": "22번",
        "choiceCount": 5,
        "image": "./assets/2021-mid/q22.png",
        "options": [
          "3 : 7 : 21",
          "6 : 14 : 63",
          "9 : 14 : 63",
          "9 : 21 : 63",
          "14 : 9 : 63"
        ]
      },
      {
        "id": 23,
        "title": "23번",
        "choiceCount": 5,
        "image": "./assets/2021-mid/q23.png",
        "options": [
          "ㄱ",
          "ㄴ",
          "ㄱ, ㄴ",
          "ㄱ, ㄷ",
          "ㄱ, ㄴ, ㄷ"
        ]
      },
      {
        "id": 24,
        "title": "24번",
        "choiceCount": 5,
        "image": "./assets/2021-mid/q24.png",
        "options": [
          "1 m/s",
          "√2 m/s",
          "2 m/s",
          "2√2 m/s",
          "3 m/s"
        ]
      },
      {
        "id": 25,
        "title": "25번",
        "choiceCount": 5,
        "image": "./assets/2021-mid/q25.png",
        "options": [
          "ㄱ",
          "ㄴ",
          "ㄱ, ㄴ",
          "ㄴ, ㄷ",
          "ㄱ, ㄴ, ㄷ"
        ]
      },
      {
        "id": 26,
        "title": "26번",
        "choiceCount": 5,
        "image": "./assets/2021-mid/q26.png",
        "options": [
          "A 증가 / B 증가",
          "A 증가 / B 감소",
          "A 감소 / B 증가",
          "A 감소 / B 감소",
          "A 일정 / B 증가"
        ]
      },
      {
        "id": 27,
        "title": "27번",
        "choiceCount": 5,
        "image": "./assets/2021-mid/q27.png",
        "options": [
          "ㄱ",
          "ㄴ",
          "ㄱ, ㄴ",
          "ㄴ, ㄷ",
          "ㄱ, ㄴ, ㄷ"
        ]
      },
      {
        "id": 28,
        "title": "28번",
        "choiceCount": 5,
        "image": "./assets/2021-mid/q28.png",
        "options": [
          "18/5 A",
          "27/5 A",
          "36/5 A",
          "54/5 A",
          "12 A"
        ]
      },
      {
        "id": 29,
        "title": "29번",
        "choiceCount": 5,
        "image": "./assets/2021-mid/q29.png",
        "options": [
          "ㄱ",
          "ㄴ",
          "ㄱ, ㄴ",
          "ㄱ, ㄷ",
          "ㄱ, ㄴ, ㄷ"
        ]
      },
      {
        "id": 30,
        "title": "30번",
        "choiceCount": 5,
        "image": "./assets/2021-mid/q30.png",
        "options": [
          "25 mm",
          "100/3 mm",
          "50 mm",
          "200/3 mm",
          "100 mm"
        ]
      }
    ]
  },
  {
    "id": "physics-2020-mid",
    "title": "2020년 한국중학생물리대회 중급과정",
    "shortTitle": "2020 중급",
    "description": "원문 단답·서술형 30문항을 온라인 응시용 5지선다로 변환했습니다.",
    "year": "2020",
    "round": "중급",
    "folder": "2020-mid",
    "durationSeconds": 9000,
    "openAt": null,
    "closeAt": null,
    "defaultChoiceCount": 5,
    "questions": [
      {
        "id": 1,
        "title": "1번",
        "choiceCount": 5,
        "image": "./assets/2020-mid/q01.png",
        "options": [
          "√(3g/L)",
          "√(6g/L)",
          "√(9g/L)",
          "√(12g/L)",
          "√(2g/L)"
        ]
      },
      {
        "id": 2,
        "title": "2번",
        "choiceCount": 5,
        "image": "./assets/2020-mid/q02.png",
        "options": [
          "ㄱ",
          "ㄴ",
          "ㄱ, ㄴ",
          "ㄱ, ㄷ",
          "ㄱ, ㄴ, ㄷ"
        ]
      },
      {
        "id": 3,
        "title": "3번",
        "choiceCount": 5,
        "image": "./assets/2020-mid/q03.png",
        "options": [
          "√(gL)/2",
          "√(gL)",
          "√(3gL)/2",
          "√(2gL)",
          "√(3gL)"
        ]
      },
      {
        "id": 4,
        "title": "4번",
        "choiceCount": 5,
        "image": "./assets/2020-mid/q04.png",
        "options": [
          "√5 A",
          "√6 A",
          "2A",
          "√10 A",
          "3A"
        ]
      },
      {
        "id": 5,
        "title": "5번",
        "choiceCount": 5,
        "image": "./assets/2020-mid/q05.png",
        "options": [
          "(5/8)mg",
          "(11/16)mg",
          "(3/4)mg",
          "(13/16)mg",
          "mg"
        ]
      },
      {
        "id": 6,
        "title": "6번",
        "choiceCount": 5,
        "image": "./assets/2020-mid/q06.png",
        "options": [
          "t - 2s/a",
          "√(t² - 2s/a)",
          "√(t² - 4s/a)",
          "t - √(4s/a)",
          "√(2t² - 4s/a)"
        ]
      },
      {
        "id": 7,
        "title": "7번",
        "choiceCount": 5,
        "image": "./assets/2020-mid/q07.png",
        "options": [
          "ㄱ",
          "ㄴ",
          "ㄱ, ㄴ",
          "ㄱ, ㄷ",
          "ㄱ, ㄴ, ㄷ"
        ]
      },
      {
        "id": 8,
        "title": "8번",
        "choiceCount": 5,
        "image": "./assets/2020-mid/q08.png",
        "options": [
          "2mg",
          "(5/2)mg",
          "3mg",
          "(7/2)mg",
          "4mg"
        ]
      },
      {
        "id": 9,
        "title": "9번",
        "choiceCount": 5,
        "image": "./assets/2020-mid/q09.png",
        "options": [
          "ㄱ",
          "ㄴ",
          "ㄱ, ㄴ",
          "ㄴ, ㄷ",
          "ㄱ, ㄴ, ㄷ"
        ]
      },
      {
        "id": 10,
        "title": "10번",
        "choiceCount": 5,
        "image": "./assets/2020-mid/q10.png",
        "options": [
          "2/23",
          "3/23",
          "4/23",
          "5/23",
          "4/19"
        ]
      },
      {
        "id": 11,
        "title": "11번",
        "choiceCount": 5,
        "image": "./assets/2020-mid/q11.png",
        "options": [
          "2π√(mh/RT)",
          "2πh√(m/RT)",
          "πh√(m/RT)",
          "2πh√(RT/m)",
          "2π√(m/(RTh))"
        ]
      },
      {
        "id": 12,
        "title": "12번",
        "choiceCount": 5,
        "image": "./assets/2020-mid/q12.png",
        "options": [
          "ㄱ",
          "ㄴ",
          "ㄷ",
          "ㄱ, ㄴ",
          "ㄱ, ㄴ, ㄷ"
        ]
      },
      {
        "id": 13,
        "title": "13번",
        "choiceCount": 5,
        "image": "./assets/2020-mid/q13.png",
        "options": [
          "ㄱ",
          "ㄴ",
          "ㄱ, ㄴ",
          "ㄱ, ㄷ",
          "ㄱ, ㄴ, ㄷ"
        ]
      },
      {
        "id": 14,
        "title": "14번",
        "choiceCount": 5,
        "image": "./assets/2020-mid/q14.png",
        "options": [
          "ㄱ",
          "ㄴ",
          "ㄷ",
          "ㄱ, ㄴ",
          "ㄱ, ㄴ, ㄷ"
        ]
      },
      {
        "id": 15,
        "title": "15번",
        "choiceCount": 5,
        "image": "./assets/2020-mid/q15.png",
        "options": [
          "15개",
          "16개",
          "17개",
          "18개",
          "19개"
        ]
      },
      {
        "id": 16,
        "title": "16번",
        "choiceCount": 5,
        "image": "./assets/2020-mid/q16.png",
        "options": [
          "1, 2, 3",
          "1, 2, 4",
          "1, 3, 4",
          "2, 3, 4",
          "1, 2, 3, 4"
        ]
      },
      {
        "id": 17,
        "title": "17번",
        "choiceCount": 5,
        "image": "./assets/2020-mid/q17.png",
        "options": [
          "V/3",
          "2V/3",
          "V",
          "4V/3",
          "3V/2"
        ]
      },
      {
        "id": 18,
        "title": "18번",
        "choiceCount": 5,
        "image": "./assets/2020-mid/q18.png",
        "options": [
          "ㄱ",
          "ㄴ",
          "ㄱ, ㄴ",
          "ㄱ, ㄷ",
          "ㄱ, ㄴ, ㄷ"
        ]
      },
      {
        "id": 19,
        "title": "19번",
        "choiceCount": 5,
        "image": "./assets/2020-mid/q19.png",
        "options": [
          "ㄱ",
          "ㄴ",
          "ㄷ",
          "ㄱ, ㄴ",
          "ㄱ, ㄴ, ㄷ"
        ]
      },
      {
        "id": 20,
        "title": "20번",
        "choiceCount": 5,
        "image": "./assets/2020-mid/q20.png",
        "options": [
          "ㄱ",
          "ㄴ",
          "ㄱ, ㄴ",
          "ㄱ, ㄷ",
          "ㄱ, ㄴ, ㄷ"
        ]
      },
      {
        "id": 21,
        "title": "21번",
        "choiceCount": 5,
        "image": "./assets/2020-mid/q21.png",
        "options": [
          "ㄱ",
          "ㄴ",
          "ㄱ, ㄴ",
          "ㄱ, ㄷ",
          "ㄱ, ㄴ, ㄷ"
        ]
      },
      {
        "id": 22,
        "title": "22번",
        "choiceCount": 5,
        "image": "./assets/2020-mid/q22.png",
        "options": [
          "kI/(2a)",
          "kI/(3a)",
          "kI/(4a)",
          "kI/(6a)",
          "kI/(8a)"
        ]
      },
      {
        "id": 23,
        "title": "23번",
        "choiceCount": 5,
        "image": "./assets/2020-mid/q23.png",
        "options": [
          "ㄱ",
          "ㄴ",
          "ㄱ, ㄴ",
          "ㄴ, ㄷ",
          "ㄱ, ㄴ, ㄷ"
        ]
      },
      {
        "id": 24,
        "title": "24번",
        "choiceCount": 5,
        "image": "./assets/2020-mid/q24.png",
        "options": [
          "3.8분",
          "4.6분",
          "5.0분",
          "5.6분",
          "6.4분"
        ]
      },
      {
        "id": 25,
        "title": "25번",
        "choiceCount": 5,
        "image": "./assets/2020-mid/q25.png",
        "options": [
          {
            "image": "./assets/2020-mid/options/q25_o2.png",
            "alt": "오른쪽 아래로 꺾인 ㄴ자"
          },
          {
            "image": "./assets/2020-mid/options/q25_o3.png",
            "alt": "오른쪽 위로 꺾인 ㄴ자"
          },
          {
            "image": "./assets/2020-mid/options/q25_o1.png",
            "alt": "문제의 구멍과 같은 방향의 ㄴ자"
          },
          {
            "image": "./assets/2020-mid/options/q25_o4.png",
            "alt": "왼쪽 위로 꺾인 ㄴ자"
          },
          {
            "image": "./assets/2020-mid/options/q25_o5.png",
            "alt": "V자 모양"
          }
        ]
      },
      {
        "id": 26,
        "title": "26번",
        "choiceCount": 5,
        "image": "./assets/2020-mid/q26.png",
        "options": [
          "ㄱ",
          "ㄴ",
          "ㄷ",
          "ㄱ, ㄷ",
          "ㄱ, ㄴ, ㄷ"
        ]
      },
      {
        "id": 27,
        "title": "27번",
        "choiceCount": 5,
        "image": "./assets/2020-mid/q27.png",
        "options": [
          "ㄱ",
          "ㄴ",
          "ㄱ, ㄴ",
          "ㄱ, ㄷ",
          "ㄱ, ㄴ, ㄷ"
        ]
      },
      {
        "id": 28,
        "title": "28번",
        "choiceCount": 5,
        "image": "./assets/2020-mid/q28.png",
        "options": [
          "1 : 2",
          "2 : 3",
          "2 : 5",
          "3 : 5",
          "5 : 2"
        ]
      },
      {
        "id": 29,
        "title": "29번",
        "choiceCount": 5,
        "image": "./assets/2020-mid/q29.png",
        "options": [
          "ㄱ",
          "ㄴ",
          "ㄷ",
          "ㄱ, ㄷ",
          "ㄱ, ㄴ, ㄷ"
        ]
      },
      {
        "id": 30,
        "title": "30번",
        "choiceCount": 5,
        "image": "./assets/2020-mid/q30.png",
        "options": [
          "1/2",
          "√2/2",
          "√3/2",
          "√5/2",
          "5/2"
        ]
      }
    ]
  }
];

  for (const exam of historicalExams) {
    exam.appsScriptUrl = HISTORICAL_BACKEND_URL;
    if (!cfg.exams.some((item) => item.id === exam.id)) cfg.exams.push(exam);
  }
})();
