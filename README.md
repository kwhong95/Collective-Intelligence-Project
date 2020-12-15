# 집단지성을 활용한 구성 담당자 찾는 프로젝트
## 1. 프로젝트 설정
1. 사용할 라이브러리 npm install
- Ant-Desgin + icons 
- axios
- react-router-dom
- react-redux / redux / redux-saga
- react-test-renderer
- diff
- @testing-library/react-hooks
- @types/jest

2. Type Check jsconfig.json 설정

3. 폴더 관리법 - 기능별 구분
- components
- pages
- api
- redux
- etc

## 2. MainPage Layout 구성하기
1. Pages - Search Page Layout
- Title 설정 : Typography.Title(antd)
- Settings Dropdown (antd)
  + 로그아웃 버튼 구현
  + 추후 로그인/회원가입 구현시 사용
- 검색 기능을 사용할 Input 구현
  + 진입시 바로 Input으로 포커싱 : Autofocus
  + 서치 아이콘 구현