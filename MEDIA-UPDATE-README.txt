적용: ZIP을 풀고 안의 pages, public, refinements.css를 GitHub 저장소 폴더에 덮어쓰기한 뒤 Commit → Push origin.
Summary: Update portfolio media, gallery sizing and additional work order

변경 사항
- 여러 장인 갤러리의 마지막 홀수 이미지는 반폭 유지. 단 한 장인 섹션만 단독 표시.
- 단독 본문 이미지/영상은 상단 메뉴를 제외한 화면 높이에 맞춘 공통 영역에서 비율 유지. 좌우 여백 허용.
- Raven Deathbringer Beauty의 첫 이미지 단독 + 다음 두 이미지 나란히 예외 유지.
- 프로젝트 첫 배경에 검정 50%를 추가하고 기존 하단 그라데이션 유지.
- 전체화면 이미지가 원본 픽셀 크기에 묶여 작아지는 문제 수정. 비율 유지 최대 표시.
- SOL Extra01 얼굴/와이어/UV 확대 시 보유 원본 PNG 연결. 작은 원본은 확대 시 화질 한계가 있음.
- SOL 첫 배경을 Cinematic(2).png로 교체. Valhalla 첫 배경 및 홈 카드 썸네일은 유지.
- Additional Work: Extra01, Extra02, Valhalla, Vampir01, Architect, Zeus, Warlord, Deathbringer, Vampir02.
- 홈 첫 배경 영상 교체. 아래 Showreel 유지.
- 조선 Classic Beauty 이미지 대신 JS_A/B/C/D 영상 배치. 기존 이미지 원본 파일은 삭제하지 않음.
- 영상은 빠른 시작 형식으로 변환하고 조선 확대용은 원본 해상도 유지한 별도 영상 사용.

검사: TypeScript 검사, 제작 빌드, 배치/순서/프로젝트 렌더 검사, 영상 코덱 및 빠른 시작 구조 검사 통과.
브라우저 직접 시각/재생 검사는 미실시.
복구: media-final-rollback.zip 안 파일을 덮어쓰기. 새로 추가된 자산은 남아도 사용되지 않음.
