(() => {
  "use strict";

  const cfg = window.YP_EXAM_CONFIG;
  const $ = (id) => document.getElementById(id);
  const choiceLabels = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧"];

  const elements = {
    headerExamPill: $("headerExamPill"),
    timerBox: $("timerBox"),
    timerText: $("timerText"),
    landingSection: $("landingSection"),
    examCountText: $("examCountText"),
    previewFirstExamBtn: $("previewFirstExamBtn"),
    startCard: $("startCard"),
    examSelect: $("examSelect"),
    examQuickList: $("examQuickList"),
    selectedExamBadge: $("selectedExamBadge"),
    selectedExamTitle: $("selectedExamTitle"),
    selectedExamDescription: $("selectedExamDescription"),
    selectedExamQuestions: $("selectedExamQuestions"),
    selectedExamDuration: $("selectedExamDuration"),
    selectedExamWindow: $("selectedExamWindow"),
    selectedExamScoring: $("selectedExamScoring"),
    startForm: $("startForm"),
    startBtn: $("startBtn"),
    startMessage: $("startMessage"),
    quizCard: $("quizCard"),
    sideExamTitle: $("sideExamTitle"),
    sideStudentInfo: $("sideStudentInfo"),
    answeredCountText: $("answeredCountText"),
    questionNav: $("questionNav"),
    sideSubmitBtn: $("sideSubmitBtn"),
    questionCounter: $("questionCounter"),
    questionTitle: $("questionTitle"),
    choiceCountPill: $("choiceCountPill"),
    answeredPill: $("answeredPill"),
    questionImage: $("questionImage"),
    choiceGrid: $("choiceGrid"),
    progressBar: $("progressBar"),
    prevBtn: $("prevBtn"),
    nextBtn: $("nextBtn"),
    submitBtn: $("submitBtn"),
    quizMessage: $("quizMessage"),
    resultCard: $("resultCard"),
    resultTitle: $("resultTitle"),
    resultScore: $("resultScore"),
    resultPercent: $("resultPercent"),
    resultBreakdown: $("resultBreakdown"),
    resultScoringRule: $("resultScoringRule"),
    resultReviewSection: $("resultReviewSection"),
    resultReviewSummary: $("resultReviewSummary"),
    resultReviewList: $("resultReviewList"),
    resultMessage: $("resultMessage"),
    restartUiBtn: $("restartUiBtn"),
    confirmOverlay: $("confirmOverlay"),
    modalCloseBtn: $("modalCloseBtn"),
    modalCancelBtn: $("modalCancelBtn"),
    modalSubmitBtn: $("modalSubmitBtn"),
    confirmSummary: $("confirmSummary"),
    modalScoringRule: $("modalScoringRule"),
    answerReviewGrid: $("answerReviewGrid")
  };

  const state = {
    exam: null,
    student: null,
    attemptId: null,
    currentIndex: 0,
    answers: [],
    deadlineMs: null,
    timerHandle: null,
    submitting: false,
    startedClientAt: null,
    modalOpen: false
  };

  init();

  function init() {
    if (!cfg || !Array.isArray(cfg.exams) || cfg.exams.length === 0) {
      document.body.innerHTML = "<main class='fatal-error'>시험 설정을 찾을 수 없습니다. config.js를 확인해 주세요.</main>";
      return;
    }

    elements.examCountText.textContent = String(cfg.exams.length);
    buildExamSelector();
    buildQuickExamCards();

    const initialExamId = getExamIdFromUrl() || cfg.defaultExamId || cfg.exams[0].id;
    selectExam(initialExamId, false);

    elements.examSelect.addEventListener("change", () => selectExam(elements.examSelect.value, true));
    elements.previewFirstExamBtn.addEventListener("click", () => {
      selectExam(cfg.exams[0].id, true);
      elements.startCard.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    elements.startForm.addEventListener("submit", onStartSubmit);
    elements.choiceGrid.addEventListener("click", onChoiceClick);
    elements.questionNav.addEventListener("click", onQuestionNavClick);
    elements.prevBtn.addEventListener("click", () => goToQuestion(state.currentIndex - 1));
    elements.nextBtn.addEventListener("click", () => goToQuestion(state.currentIndex + 1));
    elements.submitBtn.addEventListener("click", openSubmitConfirm);
    elements.sideSubmitBtn.addEventListener("click", openSubmitConfirm);
    elements.modalCloseBtn.addEventListener("click", closeSubmitConfirm);
    elements.modalCancelBtn.addEventListener("click", closeSubmitConfirm);
    elements.modalSubmitBtn.addEventListener("click", () => submitQuiz(false));
    elements.confirmOverlay.addEventListener("click", (event) => {
      if (event.target === elements.confirmOverlay) closeSubmitConfirm();
    });
    elements.restartUiBtn.addEventListener("click", () => window.location.assign(window.location.pathname));
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && state.modalOpen) closeSubmitConfirm();
    });
  }

  function buildExamSelector() {
    elements.examSelect.innerHTML = cfg.exams.map((exam) => (
      `<option value="${escapeHtml(exam.id)}">${escapeHtml(exam.title)}</option>`
    )).join("");
  }

  function buildQuickExamCards() {
    elements.examQuickList.innerHTML = cfg.exams.map((exam) => `
      <button class="exam-chip" type="button" data-exam-id="${escapeHtml(exam.id)}">
        <span>${escapeHtml(exam.year || "")}</span>
        <strong>${escapeHtml(exam.shortTitle || exam.title)}</strong>
      </button>
    `).join("");

    elements.examQuickList.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-exam-id]");
      if (!button || elements.quizCard.hidden === false) return;
      selectExam(button.dataset.examId, true);
    });
  }

  function selectExam(examId, updateUrl) {
    const exam = cfg.exams.find((item) => item.id === examId) || cfg.exams[0];
    state.exam = exam;
    state.answers = new Array(exam.questions.length).fill(null);
    state.currentIndex = 0;

    elements.examSelect.value = exam.id;
    elements.headerExamPill.textContent = exam.shortTitle || exam.title;
    elements.selectedExamTitle.textContent = exam.title;
    elements.selectedExamBadge.textContent = exam.shortTitle || "선택됨";
    elements.selectedExamDescription.textContent = exam.description || "선택한 시험을 한 문제씩 풀이합니다.";
    elements.selectedExamQuestions.textContent = `${exam.questions.length}문항`;
    elements.selectedExamDuration.textContent = formatDuration(exam.durationSeconds);
    elements.selectedExamWindow.textContent = formatWindow(exam.openAt, exam.closeAt);
    elements.selectedExamScoring.textContent = getScoringText(exam);

    for (const button of elements.examQuickList.querySelectorAll("button[data-exam-id]")) {
      button.classList.toggle("selected", button.dataset.examId === exam.id);
    }

    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set("exam", exam.id);
      window.history.replaceState({}, "", url.toString());
    }
  }

  async function onStartSubmit(event) {
    event.preventDefault();
    clearMessage(elements.startMessage);

    const form = new FormData(elements.startForm);
    const student = {
      schoolGrade: String(form.get("schoolGrade") || "").trim(),
      studentName: String(form.get("studentName") || "").trim()
    };

    if (!student.schoolGrade || !student.studentName) {
      showMessage(elements.startMessage, "학교/학년과 이름을 입력해 주세요.", true);
      return;
    }

    if (!isConfigured()) {
      showMessage(elements.startMessage, "config.js의 appsScriptUrl을 먼저 설정해야 합니다.", true);
      return;
    }

    elements.startBtn.disabled = true;
    elements.startBtn.textContent = "서버 확인 중...";

    try {
      const response = await callServer("start", { student });
      if (!response.ok) throw new Error(response.message || "시험을 시작할 수 없습니다.");

      state.student = student;

      if (response.alreadySubmitted && response.result) {
        state.answers = Array.isArray(response.result.answers) ? response.result.answers : state.answers;
        elements.landingSection.hidden = true;
        elements.startCard.hidden = true;
        elements.quizCard.hidden = true;
        elements.timerBox.hidden = true;
        elements.resultCard.hidden = false;
        showResult(response.result);
        return;
      }

      state.attemptId = response.attemptId;
      state.startedClientAt = Date.now();
      state.deadlineMs = Date.now() + Math.max(0, Number(response.remainingSeconds || state.exam.durationSeconds)) * 1000;
      state.submitting = false;

      elements.landingSection.hidden = true;
      elements.startCard.hidden = true;
      elements.quizCard.hidden = false;
      elements.resultCard.hidden = true;
      elements.timerBox.hidden = false;
      elements.examSelect.disabled = true;

      elements.sideExamTitle.textContent = state.exam.title;
      elements.sideStudentInfo.textContent = `${student.schoolGrade} · ${student.studentName}`;
      buildQuestionNav();
      renderQuestion();
      startTimer();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      showMessage(elements.startMessage, error.message, true);
    } finally {
      elements.startBtn.disabled = false;
      elements.startBtn.textContent = "시험 시작";
    }
  }

  function onChoiceClick(event) {
    const button = event.target.closest("button[data-choice]");
    if (!button || state.submitting) return;

    const choice = Number(button.dataset.choice);
    state.answers[state.currentIndex] = choice;
    renderChoices();
    updateProgressUi();

    const shouldAdvance = cfg.autoAdvance !== false && state.currentIndex < state.exam.questions.length - 1;
    if (shouldAdvance) {
      window.setTimeout(() => goToQuestion(state.currentIndex + 1), Number(cfg.autoAdvanceDelayMs || 220));
    } else if (state.currentIndex === state.exam.questions.length - 1) {
      showMessage(elements.quizMessage, "마지막 문항입니다. 제출 확인을 눌러 답안을 검토하세요.", false);
    }
  }

  function onQuestionNavClick(event) {
    const button = event.target.closest("button[data-index]");
    if (!button || state.submitting) return;
    if (cfg.allowQuestionNavigation === false) return;
    goToQuestion(Number(button.dataset.index));
  }

  function goToQuestion(index) {
    const nextIndex = Math.max(0, Math.min(index, state.exam.questions.length - 1));
    if (nextIndex === state.currentIndex) return;
    state.currentIndex = nextIndex;
    renderQuestion();
    const questionPanel = document.querySelector(".question-panel");
    if (questionPanel) questionPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function buildQuestionNav() {
    elements.questionNav.innerHTML = state.exam.questions.map((question, index) => `
      <button type="button" data-index="${index}" aria-label="${question.id}번 문항으로 이동">${question.id}</button>
    `).join("");
  }

  function renderQuestion() {
    const question = state.exam.questions[state.currentIndex];
    const selected = state.answers[state.currentIndex];

    elements.questionCounter.textContent = `${state.currentIndex + 1} / ${state.exam.questions.length}`;
    elements.questionTitle.textContent = question.title || `${question.id}번`;
    elements.choiceCountPill.textContent = `${getChoiceCount(question)}지선다`;
    elements.answeredPill.textContent = selected ? `${choiceLabels[selected - 1]} 선택됨` : "미응답";
    elements.answeredPill.classList.toggle("answered", Boolean(selected));
    elements.questionImage.src = question.image;
    elements.questionImage.alt = `${state.exam.title} ${question.title || question.id + "번"} 문제 이미지`;
    elements.prevBtn.disabled = state.currentIndex === 0 || state.submitting;
    elements.nextBtn.disabled = state.currentIndex === state.exam.questions.length - 1 || state.submitting;
    clearMessage(elements.quizMessage);

    renderChoices();
    updateProgressUi();
  }

  function renderChoices() {
    const question = state.exam.questions[state.currentIndex];
    const count = getChoiceCount(question);
    const selected = state.answers[state.currentIndex];

    elements.choiceGrid.style.setProperty("--choice-count", String(count));
    elements.choiceGrid.innerHTML = Array.from({ length: count }, (_, index) => {
      const choice = index + 1;
      const isSelected = choice === selected;
      return `
        <button type="button" data-choice="${choice}" class="${isSelected ? "selected" : ""}" ${state.submitting ? "disabled" : ""}>
          <span class="choice-symbol">${choiceLabels[index] || choice}</span>
          <span class="choice-text">${choice}번 선택</span>
        </button>
      `;
    }).join("");
  }

  function updateProgressUi() {
    const total = state.exam.questions.length;
    const answered = state.answers.filter((answer) => answer !== null).length;
    elements.answeredCountText.textContent = `${answered} / ${total} 응답`;
    elements.progressBar.style.width = `${total ? (answered / total) * 100 : 0}%`;

    for (const button of elements.questionNav.querySelectorAll("button[data-index]")) {
      const index = Number(button.dataset.index);
      const isCurrent = index === state.currentIndex;
      const isAnswered = state.answers[index] !== null;
      button.classList.toggle("current", isCurrent);
      button.classList.toggle("answered", isAnswered);
      button.classList.toggle("unanswered", !isAnswered);
      button.setAttribute("aria-current", isCurrent ? "true" : "false");
    }
  }

  function startTimer() {
    updateTimer();
    state.timerHandle = window.setInterval(updateTimer, 500);
  }

  function updateTimer() {
    const remainingMs = Math.max(0, state.deadlineMs - Date.now());
    const remainingSeconds = Math.ceil(remainingMs / 1000);
    elements.timerText.textContent = formatSeconds(remainingSeconds);
    elements.timerBox.classList.toggle("danger", remainingSeconds <= 60);

    if (remainingSeconds <= 0) {
      window.clearInterval(state.timerHandle);
      submitQuiz(true);
    }
  }

  function openSubmitConfirm() {
    if (state.submitting) return;

    const total = state.exam.questions.length;
    const unanswered = state.answers.filter((answer) => answer === null).length;
    const answered = total - unanswered;
    elements.confirmSummary.textContent = `${state.exam.shortTitle || state.exam.title} · ${state.student.studentName}님의 답안 ${answered}/${total}문항이 입력되었습니다. 미응답 ${unanswered}문항을 확인하세요. 최종 제출 후 서버 채점 점수가 바로 표시됩니다.`;
    elements.modalScoringRule.innerHTML = `<strong>채점 규칙</strong><span>${escapeHtml(getScoringText(state.exam))}</span>`;

    elements.answerReviewGrid.innerHTML = state.exam.questions.map((question, index) => {
      const answer = state.answers[index];
      return `
        <button type="button" data-review-index="${index}" class="${answer ? "answered" : "missing"}">
          <span>${question.id}</span>
          <strong>${answer ? choiceLabels[answer - 1] : "-"}</strong>
        </button>
      `;
    }).join("");

    elements.answerReviewGrid.querySelectorAll("button[data-review-index]").forEach((button) => {
      button.addEventListener("click", () => {
        closeSubmitConfirm();
        goToQuestion(Number(button.dataset.reviewIndex));
      });
    });

    elements.confirmOverlay.hidden = false;
    state.modalOpen = true;
    elements.modalSubmitBtn.focus();
  }

  function closeSubmitConfirm() {
    elements.confirmOverlay.hidden = true;
    state.modalOpen = false;
  }

  async function submitQuiz(autoSubmit) {
    if (state.submitting) return;
    if (state.modalOpen) closeSubmitConfirm();

    state.submitting = true;
    setQuizDisabled(true);
    showMessage(elements.quizMessage, autoSubmit ? "시간이 종료되어 자동 제출 중입니다..." : "제출 중입니다...", false);

    try {
      const elapsedSeconds = Math.max(0, Math.round((Date.now() - state.startedClientAt) / 1000));
      const response = await callServer("submit", {
        student: state.student,
        attemptId: state.attemptId,
        answers: state.answers,
        elapsedSeconds,
        autoSubmit: Boolean(autoSubmit)
      });

      if (!response.ok) throw new Error(response.message || "제출에 실패했습니다.");
      const resultPayload = response.alreadySubmitted && response.result ? response.result : response;
      showResult(resultPayload);
    } catch (error) {
      state.submitting = false;
      setQuizDisabled(false);
      showMessage(elements.quizMessage, error.message, true);
    }
  }

  function showResult(response) {
    window.clearInterval(state.timerHandle);
    elements.quizCard.hidden = true;
    elements.timerBox.hidden = true;
    elements.resultCard.hidden = false;

    const policy = getScoringPolicy();
    const questionCount = getNumberOrDefault(response.questionCount, state.exam.questions.length);
    const totalPoints = getNumberOrDefault(response.totalPoints, getNumberOrDefault(response.total, policy.totalPoints));
    const score = getNumberOrDefault(response.score, 0);
    const correctCount = getNumberOrDefault(response.correctCount, 0);
    const wrongCount = getNumberOrDefault(response.wrongCount, 0);
    const blankCount = getNumberOrDefault(response.blankCount, Math.max(0, questionCount - correctCount - wrongCount));
    const correctRate = getNumberOrDefault(response.correctRate, questionCount ? Math.round((correctCount / questionCount) * 1000) / 10 : 0);
    const pointsPerQuestion = getNumberOrDefault(response.pointsPerQuestion, questionCount ? totalPoints / questionCount : 0);
    const penaltyPerWrong = getNumberOrDefault(response.penaltyPerWrong, pointsPerQuestion * policy.wrongPenaltyFraction);

    elements.resultTitle.textContent = "점수가 계산되었습니다.";
    elements.resultScore.textContent = `${formatPoint(score)}점`;
    elements.resultPercent.textContent = `${formatPoint(totalPoints)}점 만점 · 정답률 ${formatPoint(correctRate)}%`;
    elements.resultBreakdown.innerHTML = `
      <div><span>정답</span><strong>${correctCount}</strong><small>+${formatPoint(pointsPerQuestion)}점씩</small></div>
      <div><span>오답</span><strong>${wrongCount}</strong><small>-${formatPoint(penaltyPerWrong)}점씩</small></div>
      <div><span>미응답</span><strong>${blankCount}</strong><small>${formatPoint(policy.blankPoints)}점</small></div>
      <div><span>총 문항</span><strong>${questionCount}</strong><small>문항</small></div>
    `;
    elements.resultScoringRule.textContent = `채점 기준: ${getScoringText(state.exam)}. 총점 하한은 적용하지 않습니다.`;
    renderPostExamReview(Array.isArray(response.reviewItems) ? response.reviewItems : []);
    elements.resultMessage.textContent = response.message || "구글 시트에 기록되었습니다.";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderPostExamReview(reviewItems) {
    elements.resultReviewSection.hidden = false;

    const items = Array.isArray(reviewItems) ? reviewItems : [];
    if (items.length === 0) {
      elements.resultReviewSummary.textContent = "해설 데이터가 아직 서버에서 전달되지 않았습니다. Apps Script를 최신 private-admin 코드로 다시 배포해 주세요.";
      elements.resultReviewList.innerHTML = `
        <div class="review-perfect review-empty">
          <strong>해설 데이터 없음</strong>
          <span>점수는 계산되었지만 문항별 해설 목록을 불러오지 못했습니다.</span>
        </div>
      `;
      return;
    }

    const correctItems = items.filter((item) => item.status === "correct");
    const wrongItems = items.filter((item) => item.status === "wrong");
    const blankItems = items.filter((item) => item.status === "blank");
    const firstOpenIndex = Math.max(0, items.findIndex((item) => item.status !== "correct"));

    elements.resultReviewSummary.textContent = `정답 ${correctItems.length}문항, 오답 ${wrongItems.length}문항, 미응답 ${blankItems.length}문항입니다. 각 문항을 열면 문제 이미지, 내 답안, 정답, 계산 과정과 보기 판단이 포함된 상세 풀이를 확인할 수 있습니다.`;
    elements.resultReviewList.innerHTML = items.map((item, itemIndex) => {
      const questionNumber = Number(item.questionNumber || item.id || itemIndex + 1);
      const question = getQuestionByNumber(questionNumber);
      const statusClass = getReviewStatusClass(item.status);
      const statusText = getReviewStatusText(statusClass);
      const title = question ? (question.title || `${questionNumber}번`) : `${questionNumber}번`;
      const image = question ? question.image : "";
      const topic = item.topic ? `<span class="review-topic">${escapeHtml(item.topic)}</span>` : "";
      const explanation = formatExplanationHtml(item.explanation || "이 문항의 해설이 아직 등록되지 않았습니다.");

      return `
        <details class="review-item ${statusClass}" ${itemIndex === firstOpenIndex ? "open" : ""}>
          <summary>
            <span class="review-qno">${escapeHtml(title)}</span>
            <span class="review-status ${statusClass}">${statusText}</span>
            <span class="review-answer">내 답안 <strong>${escapeHtml(formatChoice(item.submitted))}</strong></span>
            <span class="review-answer correct">정답 <strong>${escapeHtml(formatChoice(item.correct))}</strong></span>
          </summary>
          <div class="review-body">
            <div class="review-answer-bar">
              <div><span>내가 고른 답</span><strong>${escapeHtml(formatChoice(item.submitted))}</strong></div>
              <div><span>정답</span><strong>${escapeHtml(formatChoice(item.correct))}</strong></div>
            </div>
            <div class="review-explanation">
              <div class="review-explanation-head">
                <strong>상세 풀이</strong>
                ${topic}
              </div>
              <div class="solution-content">${explanation}</div>
            </div>
            ${image ? `<figure class="review-question-figure"><img src="${escapeHtml(image)}" alt="${escapeHtml(state.exam.title)} ${escapeHtml(title)} 문제 이미지" /></figure>` : ""}
          </div>
        </details>
      `;
    }).join("");
  }

  function getReviewStatusClass(status) {
    if (status === "blank") return "blank";
    if (status === "wrong") return "wrong";
    return "correct";
  }

  function getReviewStatusText(statusClass) {
    if (statusClass === "blank") return "미응답";
    if (statusClass === "wrong") return "오답";
    return "정답";
  }

  function formatExplanationHtml(text) {
    const titlePattern = /^(정답|핵심 원리|계산|풀이|보기 판단|정리|실험 절차|결론|주의):\s*(.*)$/;

    return String(text || "")
      .split(/\r?\n/)
      .map((rawLine) => {
        const line = rawLine.trim();
        if (!line) return '<span class="solution-spacer" aria-hidden="true"></span>';

        const titleMatch = line.match(titlePattern);
        if (titleMatch) {
          const title = escapeHtml(titleMatch[1]);
          const body = escapeHtml(titleMatch[2] || "");
          const modifier = titleMatch[1] === "결론" ? " conclusion" : (titleMatch[1] === "주의" ? " caution" : "");
          return `<span class="solution-block${modifier}"><strong>${title}</strong>${body ? `<span>${body}</span>` : ""}</span>`;
        }

        if (/^\d+[.)]\s*/.test(line) || /^[ㄱ-ㅎ][.)]\s*/.test(line) || /^[-•]\s*/.test(line)) {
          return `<span class="solution-step">${escapeHtml(line)}</span>`;
        }

        return `<span class="solution-text">${escapeHtml(line)}</span>`;
      })
      .join("");
  }

  function setQuizDisabled(disabled) {
    elements.submitBtn.disabled = disabled;
    elements.sideSubmitBtn.disabled = disabled;
    elements.prevBtn.disabled = disabled || state.currentIndex === 0;
    elements.nextBtn.disabled = disabled || state.currentIndex === state.exam.questions.length - 1;
    for (const button of elements.choiceGrid.querySelectorAll("button")) button.disabled = disabled;
    for (const button of elements.questionNav.querySelectorAll("button")) button.disabled = disabled;
  }

  function callServer(action, data) {
    const payload = {
      action,
      examId: state.exam.id,
      clientTime: new Date().toISOString(),
      userAgent: navigator.userAgent,
      ...data
    };
    return jsonp(cfg.appsScriptUrl, payload);
  }

  function jsonp(baseUrl, payload) {
    return new Promise((resolve, reject) => {
      const callbackName = `ypQuizCallback_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      const timeoutMs = 20000;
      let timeoutId;

      window[callbackName] = (response) => {
        cleanup();
        resolve(response);
      };

      const script = document.createElement("script");
      const url = new URL(baseUrl);
      url.searchParams.set("callback", callbackName);
      url.searchParams.set("payload", JSON.stringify(payload));
      script.src = url.toString();
      script.async = true;
      script.onerror = () => {
        cleanup();
        reject(new Error("서버에 연결하지 못했습니다. Apps Script 배포 URL을 확인해 주세요."));
      };

      timeoutId = window.setTimeout(() => {
        cleanup();
        reject(new Error("서버 응답 시간이 초과되었습니다."));
      }, timeoutMs);

      function cleanup() {
        window.clearTimeout(timeoutId);
        delete window[callbackName];
        script.remove();
      }

      document.body.appendChild(script);
    });
  }

  function getQuestionByNumber(questionNumber) {
    return state.exam.questions.find((question) => Number(question.id) === Number(questionNumber)) || state.exam.questions[Number(questionNumber) - 1];
  }

  function formatChoice(choice) {
    if (choice === null || choice === "" || typeof choice === "undefined") return "미응답";
    const number = Number(choice);
    if (!Number.isFinite(number)) return String(choice);
    return `${choiceLabels[number - 1] || number} (${number}번)`;
  }

  function getScoringPolicy() {
    const scoring = cfg.scoring || {};
    const totalPoints = Number(scoring.totalPoints || scoring.totalScore || 100);
    const wrongPenaltyFraction = Number(
      typeof scoring.wrongPenaltyFraction === "number" ? scoring.wrongPenaltyFraction :
      typeof scoring.wrongPenaltyRatio === "number" ? scoring.wrongPenaltyRatio : 0.25
    );
    const blankPoints = Number(
      typeof scoring.blankPoints === "number" ? scoring.blankPoints :
      typeof scoring.blankScore === "number" ? scoring.blankScore : 0
    );
    return { totalPoints, wrongPenaltyFraction, blankPoints };
  }

  function getScoringText(exam) {
    const policy = getScoringPolicy();
    const questionCount = exam && Array.isArray(exam.questions) ? exam.questions.length : 0;
    const pointsPerQuestion = questionCount ? policy.totalPoints / questionCount : 0;
    const penaltyPerWrong = pointsPerQuestion * policy.wrongPenaltyFraction;
    return `${formatPoint(policy.totalPoints)}점 만점 · 문항당 ${formatPoint(pointsPerQuestion)}점 · 오답 ${formatPoint(penaltyPerWrong)}점 감점 · 미응답 ${formatPoint(policy.blankPoints)}점`;
  }

  function getChoiceCount(question) {
    return Number(question.choiceCount || state.exam.defaultChoiceCount || 5);
  }

  function getNumberOrDefault(value, fallback) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
  }

  function isConfigured() {
    return cfg.appsScriptUrl && !cfg.appsScriptUrl.includes("PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE");
  }

  function getExamIdFromUrl() {
    const url = new URL(window.location.href);
    return url.searchParams.get("exam");
  }

  function formatSeconds(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.max(0, totalSeconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function formatDuration(totalSeconds) {
    const minutes = Math.round(Number(totalSeconds || 0) / 60);
    return `${minutes}분`;
  }

  function formatWindow(openAt, closeAt) {
    if (!openAt && !closeAt) return "언제든 시작 가능";
    if (openAt && !closeAt) return `${formatDateTime(openAt)}부터 시작 가능`;
    if (!openAt && closeAt) return `${formatDateTime(closeAt)}까지 시작 가능`;
    return `${formatDateTime(openAt)} ~ ${formatDateTime(closeAt)}`;
  }

  function formatDateTime(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat("ko-KR", {
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  }

  function formatPoint(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return "0";
    const rounded = Math.round((number + Number.EPSILON) * 100) / 100;
    return rounded.toLocaleString("ko-KR", {
      minimumFractionDigits: Number.isInteger(rounded) ? 0 : 2,
      maximumFractionDigits: 2
    });
  }

  function showMessage(element, text, isError) {
    element.textContent = text;
    element.classList.toggle("error", Boolean(isError));
  }

  function clearMessage(element) {
    showMessage(element, "", false);
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
})();
