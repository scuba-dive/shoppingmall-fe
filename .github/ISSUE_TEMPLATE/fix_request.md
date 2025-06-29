---
name: 🛠️ 버그 수정 요청
about: 기존 버그를 수정하거나 비정상 동작을 바로잡기 위한 작업을 등록합니다.
title: '[Fix] '
labels: ['bug', 'fix']
assignees: []
---

## 🐛 문제 설명

어떤 문제가 있었고, 어떻게 수정할 계획인가요?

예시:

- 페이지 이동 시 스크롤이 상단으로 초기화되지 않음
- 잘못된 사용자 입력에 대한 에러 처리가 없음

---

## 🔍 원인 분석

문제의 원인을 간단히 분석해보세요.  
(예상 원인 또는 실제 디버깅 결과)

예시:

- 상태 초기화 누락
- try-catch 누락으로 인한 예외 미처리

---

## ✅ 수정 항목

- [ ] 잘못된 초기 상태 설정 수정
- [ ] 에러 핸들링 로직 추가
- [ ] UI 경고 메시지 표시 추가

---

## 🧪 테스트 방법

- 수정된 기능을 어떻게 테스트할 수 있는지 작성해주세요.

예시:

- 페이지 이동 후 스크롤이 최상단에 위치하는지 확인
- 잘못된 이메일 입력 시 오류 메시지 출력 여부 확인

---

## 📎 관련 이슈 또는 참고자료

- 관련 이슈: #123
- 참고 로그/캡처:
