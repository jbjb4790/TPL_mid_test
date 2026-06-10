// Young's Physics 공개 설정 파일입니다.
// 이 파일은 GitHub Pages에 공개됩니다. 절대로 정답을 넣지 마세요.
// 정답과 채점은 private-admin/GoogleAppsScript_Code.gs 안에서만 관리합니다.

window.YP_EXAM_CONFIG = {
  brandName: "Young's Physics",
  siteTitle: "Young's Physics Online Exam",

  // Google Apps Script 배포 후 /exec 로 끝나는 웹 앱 URL을 붙여 넣으세요.
  appsScriptUrl: "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE",

  defaultExamId: "physics-2026-mid-1",
  autoAdvance: true,
  autoAdvanceDelayMs: 220,
  allowQuestionNavigation: true,

  exams: [
    {
      id: "physics-2026-mid-1",
      title: "2026년 제1회 물리대회 중급과정",
      shortTitle: "2026 제1회 중급",
      description: "The Physics League 중급과정 18문항",
      year: "2026",
      round: "제1회",
      folder: "2026-1-mid",
      durationSeconds: 40 * 60,
      openAt: "2026-06-09T09:00:00+09:00",
      closeAt: "2026-06-09T18:00:00+09:00",
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
      durationSeconds: 40 * 60,
      openAt: "2026-06-09T09:00:00+09:00",
      closeAt: "2026-06-09T18:00:00+09:00",
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
      durationSeconds: 40 * 60,
      openAt: "2026-06-09T09:00:00+09:00",
      closeAt: "2026-06-09T18:00:00+09:00",
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
      durationSeconds: 40 * 60,
      openAt: "2026-06-09T09:00:00+09:00",
      closeAt: "2026-06-09T18:00:00+09:00",
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
      durationSeconds: 40 * 60,
      openAt: "2026-06-09T09:00:00+09:00",
      closeAt: "2026-06-09T18:00:00+09:00",
      defaultChoiceCount: 5,
      questions: makeQuestions("2024-1-mid", 18)
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
