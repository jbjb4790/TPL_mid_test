# 학교/학년 입력 방식 업데이트

이 ZIP은 이미 GitHub Pages 사이트를 운영 중인 경우에 사용하는 변경분입니다.

## GitHub에서 교체할 파일

- `docs/index.html`
- `docs/app.js`
- `docs/styles.css`
- `README.md` (선택)

`docs/config.js`는 포함하지 않았습니다. 따라서 기존에 입력한 Apps Script `/exec` URL이 덮어써지지 않습니다.

## Apps Script에서 교체할 파일

별도의 `youngs-physics-private-admin.zip` 안에 있는 `private-admin/GoogleAppsScript_Code.gs` 전체 내용을 Apps Script의 `Code.gs`에 붙여 넣습니다.
그 뒤 다음 순서로 반영합니다.

1. `SPREADSHEET_ID` 확인
2. `setupSheets()` 한 번 실행
3. `배포 > 배포 관리 > 수정 > 새 버전 > 배포`

학생은 이제 `학교/학년`과 `이름`만 입력합니다. 별도의 고유 ID 입력란은 없습니다.
시험 ID + 학교/학년 + 이름 조합으로 중복 응시, 이어보기, 결과 재확인을 처리합니다.
