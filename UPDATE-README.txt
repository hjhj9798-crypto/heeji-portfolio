포트폴리오 추가 수정 — 2026-09-04

적용
ZIP 압축을 별도 폴더에 풀고 App.tsx, portfolio.css, refinements.css,
pages, public을 기존 heeji-portfolio 폴더에 복사하여 덮어쓰세요.
기존 폴더 자체를 삭제하지 마세요. 다른 이미지/영상/PDF는 그대로 필요합니다.
이후 GitHub Desktop에서 Commit → Push origin을 진행하세요.

Summary 예시: Refine portfolio typography, media viewing, and project navigation

반영 사항
1. 홈 배경 영상을 새 영상으로 교체. 좌우 여백 없이 16:9로 표시.
   3840×2160, 30fps 유지 / 약 216MB → 53MB / 웹 시작 로딩 최적화.
   무음 배경이므로 웹용 사본에서 오디오 제거. 원본은 수정하지 않음.
2. 상단 이름 및 메뉴 글자 확대. 좁은 화면에서는 겹치지 않게 두 줄로 배치.
3. 메인 영상과 쇼릴 사이에 작은 여백 추가.
4. 메인 및 Additional Work 썸네일 호버 글자 확대.
5. Additional Work 휠 가로 이동 및 얇은 드래그 슬라이드바 추가.
   양 끝에서는 페이지 세로 스크롤 가능. 기존 좌우 버튼 유지.
6. ABOUT~CONTACT 글자 약 1.5배 확대.
7. 하단 우측 Contact 링크만 제거.
8. 상세 페이지 상단 이미지 원본 비율 유지, 크롭하지 않음.
9. 상세 페이지 제목/정보/설명/섹션 제목 확대.
10. 프로젝트 반복 영상 클릭 시 전체화면. Esc 또는 어디든 재클릭하여 닫기.
    브라우저가 전체화면 요청을 허용하지 않으면 창 전체를 채워 표시.
11. 모든 UV 섹션은 한 화면에 들어오도록 자동 격자 배치.
    화면이 작거나 UV가 많으면 작게 보이며, 클릭해서 확대 가능.
12. SOL Extra01/02를 독립된 Additional Work 프로젝트로 이동.
    두 프로젝트 썸네일은 각각 첫 번째 뷰티 이미지를 사용.

복구
refinement-rollback.zip의 App.tsx, portfolio.css, pages를 동일 위치에
덮어쓴 뒤 Commit → Push origin 하면 이번 수정 이전 화면으로 돌아갑니다.
새 refinements.css와 public/video/refinement-20260904는 사용되지 않으므로
남겨두어도 됩니다. 복구 후 삭제 작업은 필요 없습니다.

검사
새 버전과 복구 버전의 타입/배포 빌드 검사 완료.
메인 5개, 추가 9개 페이지의 렌더링 및 자료 보존 검사 완료.
영상 포맷 H.264 및 빠른 시작 구조 확인.
실제 브라우저에서의 전체화면/휠 입력 및 외부 영상 재생은 별도 확인 필요.

이 ZIP은 기존 사이트에 덮어쓰는 업데이트이며 전체 사이트 사본은 아닙니다.
