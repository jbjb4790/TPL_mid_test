// Young's Physics 공개 설정 파일입니다.
// 이 파일은 GitHub Pages에 공개됩니다. 절대로 정답을 넣지 마세요.
// 정답과 채점은 private-admin/GoogleAppsScript_Code.gs 안에서만 관리합니다.

window.YP_EXAM_CONFIG = {
  brandName: "Young's Physics",
  siteTitle: "Young's Physics Online Exam",

  // Google Apps Script 배포 후 /exec 로 끝나는 웹 앱 URL을 붙여 넣으세요.
  appsScriptUrl: "https://script.google.com/macros/s/AKfycbyjKYfhepP_jUD55eqCeCasn7Lx6tjMuimkl-PyLwwipK2jo4Ejlpl_Rzmig-oB4PU/exec",

  // 공개 가능한 채점 안내입니다. 실제 채점은 Apps Script의 SCORING_POLICY로 진행됩니다.
  scoring: {
    totalPoints: 100,
    wrongPenaltyFraction: 1 / 4,
    blankPoints: 0,
    showScoreImmediately: true,
    label: "100점 만점 · 정답 +배점 · 오답 -배점의 1/4 · 미응답 0점"
  },

  defaultExamId: "physics-2026-mid-1",
  autoAdvance: true,
  autoAdvanceDelayMs: 220,
  allowQuestionNavigation: true,


  // openAt/closeAt이 null이면 학생들은 언제든 시작할 수 있고,
  // 시작한 순간부터 durationSeconds 동안만 응시할 수 있습니다.
  exams: [
    {
      id: "physics-2026-mid-1",
      title: "2026년 제1회 물리대회 중급과정",
      shortTitle: "2026 제1회 중급",
      description: "The Physics League 중급과정 18문항",
      year: "2026",
      round: "제1회",
      folder: "2026-1-mid",
      durationSeconds: 60 * 60,
      openAt: null,
      closeAt: null,
      defaultChoiceCount: 5,
      questions: makeQuestions("2026-1-mid", 18)
    },
    {
      id: "physics-2025-mid-2",
      title: "2025년 제2회 물리대회 중급과정",
      shortTitle: "2025 제2회 중급",
      description: "The Physics League 중급과정 18문항",
      year: "2025",
      round: "제2회",
      folder: "2025-2-mid",
      durationSeconds: 60 * 60,
      openAt: null,
      closeAt: null,
      defaultChoiceCount: 5,
      questions: makeQuestions("2025-2-mid", 18)
    },
    {
      id: "physics-2025-mid-1",
      title: "2025년 제1회 물리대회 중급과정",
      shortTitle: "2025 제1회 중급",
      description: "The Physics League 중급과정 18문항",
      year: "2025",
      round: "제1회",
      folder: "2025-1-mid",
      durationSeconds: 60 * 60,
      openAt: null,
      closeAt: null,
      defaultChoiceCount: 5,
      questions: makeQuestions("2025-1-mid", 18)
    },
    {
      id: "physics-2024-mid-2",
      title: "2024년 제2회 물리대회 중급과정",
      shortTitle: "2024 제2회 중급",
      description: "문항별 선택지 수가 일부 다른 시험입니다.",
      year: "2024",
      round: "제2회",
      folder: "2024-2-mid",
      durationSeconds: 60 * 60,
      openAt: null,
      closeAt: null,
      defaultChoiceCount: 5,
      questions: makeQuestions("2024-2-mid", 18, {
        2: 4,
        8: 6,
        9: 4
      })
    },
    {
      id: "physics-2024-mid-1",
      title: "2024년 제1회 물리대회 중급과정",
      shortTitle: "2024 제1회 중급",
      description: "수정 정답지가 반영된 시험입니다.",
      year: "2024",
      round: "제1회",
      folder: "2024-1-mid",
      durationSeconds: 60 * 60,
      openAt: null,
      closeAt: null,
      defaultChoiceCount: 5,
      questions: makeQuestions("2024-1-mid", 18)
    },
    {
      id: "physics-2023-mid-2",
      title: "2023년 제2회 물리대회 중급과정",
      shortTitle: "2023 제2회 중급",
      description: "2023년 9월 물리대회 2회 중급과정 20문항",
      year: "2023",
      round: "제2회",
      folder: "2023-2-mid",
      durationSeconds: 60 * 60,
      openAt: null,
      closeAt: null,
      defaultChoiceCount: 5,
      questions: makeQuestions("2023-2-mid", 20)
    },
    {
      id: "physics-2023-mid-1",
      title: "2023년 제1회 물리대회 중급과정",
      shortTitle: "2023 제1회 중급",
      description: "The Physics League 중급과정 26문항 - 업로드한 2023년 중급 문제 PDF를 반영했습니다.",
      year: "2023",
      round: "제1회",
      folder: "2023-1-mid",
      durationSeconds: 60 * 60,
      openAt: null,
      closeAt: null,
      defaultChoiceCount: 5,
      questions: makeQuestions("2023-1-mid", 26)
    }
  ]
};

function makeQuestions(folder, count, choiceCounts = {}) {
  return Array.from({ length: count }, (_, index) => {
    const id = index + 1;
    return {
      id,
      title: `${id}번`,
      choiceCount: Number(choiceCounts[id] || 5),
      image: `./assets/${folder}/q${String(id).padStart(2, "0")}.png`
    };
  });
}
