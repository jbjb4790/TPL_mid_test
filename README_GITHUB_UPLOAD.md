# Young's Physics GitHub Pages 파일

이 ZIP에는 GitHub에 올릴 공개 파일만 들어 있습니다.

## GitHub에 올릴 폴더

- `docs/`

GitHub 저장소에는 `docs/` 폴더를 업로드하고, Settings > Pages에서 Branch를 `main`, Folder를 `/docs`로 설정하세요.

## 반드시 수정할 파일

`docs/config.js`에서 아래 값을 본인의 Apps Script 웹 앱 URL로 바꿔야 실제 채점과 Google Sheets 기록이 작동합니다.

```js
appsScriptUrl: "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE"
```

## 포함된 시험

- `physics-2026-mid-1` : 2026년 제1회 물리대회 중급과정
- `physics-2025-mid-2` : 2025년 제2회 물리대회 중급과정
- `physics-2025-mid-1` : 2025년 제1회 물리대회 중급과정
- `physics-2024-mid-2` : 2024년 제2회 물리대회 중급과정
- `physics-2024-mid-1` : 2024년 제1회 물리대회 중급과정

## 정답 보안

이 ZIP에는 정답이 없습니다. 정답은 별도 `private-admin/GoogleAppsScript_Code.gs`에만 들어 있습니다.
`private-admin/` 폴더는 공개 GitHub 저장소에 올리지 마세요.
