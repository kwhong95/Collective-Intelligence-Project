# 집단지성을 활용한 구성 담당자 찾는 프로젝트
---------------
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

2. Type Check를 위한 `jsconfig.json` 설정

3. 폴더 관리법 - 기능별 구분
- components
- pages
- api
- redux
- etc
--------------
## 2. MainPage Layout 구성하기
1. Pages - Search Page Layout
- Title 설정 : Typography.Title(antd)
- Settings Dropdown (antd)
  + 로그아웃 버튼 구현
  + 추후 로그인/회원가입 구현시 사용
- 검색 기능을 사용할 Input 구현
  + 진입시 바로 Input으로 포커싱 : Autofocus
  + 서치 아이콘 구현
-------------
## 3. 서버 API 호출 & REDUX - 상태 관리
1. **검색 기능 나열 (AutoComplete)**
  - Ant-Design: AutoComplete
  - `Auto Complete`
    + keyword: redux로 상태 관리
2. **Redux & API 통신**
  - `redux-helper` (3가지 함수 구현) : immer
    + createReducer: 리듀서 생성 => 초기 상태, 액션 관리
    + createSetValueAction -단순 할당
    + setValueReducer - 단순 할당
  - search.state
    + 위 세가지 함수를 통해 Type과 Action 생성
    + keyword, autoCompletes 두가지 상태값 관리
    + reducer 코드 구현
  - .env 환경 변수 세팅: `REACT_APP_API_HOST`
    + .development
    + .production
  - API 호출 코드 작성: `axios`
    + method, url, params, data를 반환
    + 응답된 결과의 상태 관리: ResultCode
      + 성공시 0 반환 실패시 0보다 작은 값 반환
      + ant-desgin의 message를 이용해 error message 호출
  - API 통신을 위한 `Saga` 코드 작성
    + fetchAutoComplete 액선 발생 시 Saga 함수 실행
    + Saga 함수에 URL 과 Params(keyword)를 구성하여  
    keyword 입력시 서버에서 keyword를 포함하는 사용자 목록을 반환
    + 호출 성공과 data 반환 성공 시 리덕스에 데이터 삽입
  - `redux- store` 생성
    + CombineReducer: reducer를 합쳐서 store에 저장
    + SagaMiddleware: Saga 함수 또한 불러와 작동
3. **컴포넌트와의 연동**
  - keyword를 redux에서 `useSelector`를 사용하여 호출
  - action을 redux에서 `useDispatch`를 사용해 로직 구현
    + setValue Action => keyword, value
    + fetchAutoComplete Action => value
  - AutoComplete를 `useSelctor`를 사용해 호출
    + map 함수로 데이터 순회
  -----------