포트폴리오 레이아웃 업데이트 — 2026-09-03

적용 방법
1. 이 ZIP을 별도 폴더에 압축 해제합니다.
2. App.tsx, portfolio.css, pages, public을 기존 heeji-portfolio 폴더 안에 복사합니다.
3. 같은 이름의 파일은 덮어씁니다. 기존 pages/public 폴더 자체를 삭제하지 마세요.
4. GitHub Desktop에서 변경 내용을 확인하고 Commit → Push origin을 진행합니다.

변경 내용
- 검은 배경, 상단 중앙 이름, 배경 영상 → 쇼릴 → 2열 프로젝트 구성
- 왼쪽 고정 제목과 새 썸네일을 사용하는 Additional Work 가로 슬라이드
- 메인/추가 프로젝트 상세 페이지를 같은 세로 스크롤 구성으로 통일
- 자료가 있는 섹션만 표시, 원본 이미지 비율 유지
- 기존 영상, 설명, PDF, 링크 및 SOL 보조 캐릭터 자료 유지
- SOL 및 Additional Work 7개 프로젝트의 새 썸네일 반영

복구 방법
함께 제공한 layout-redesign-rollback.zip을 별도 폴더에 압축 해제하고,
그 안의 App.tsx와 pages를 동일한 프로젝트 폴더에 덮어쓰세요.
그 후 다시 Commit → Push origin 하면 이전 화면으로 복구됩니다.
추가된 portfolio.css, Media.tsx, extraProjects.ts, 새 썸네일 파일은
복구 후 사용되지 않으므로 남겨두어도 됩니다. 별도 삭제는 필요 없습니다.

확인 범위
새 버전과 복구 버전 모두 TypeScript 검사 및 배포용 빌드 통과.
5개 메인 / 7개 추가 / 2개 SOL 보조 프로젝트의 자료 보존 검사 통과.
실제 브라우저 화면과 외부 YouTube/Vimeo 재생은 별도 확인이 필요합니다.
이 ZIP은 기존 사이트에 덮어쓰는 업데이트이며 전체 사이트 복제본은 아닙니다.
