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
## 4. 사용자 페이지 구현하기
1. **User Page**
  - Ant-Design: PageHeader, Row, Col, Descriptions, Typography
  - 표 형식의 이름, 소속, 태그, 수정 내역 등 유저 정보를 보여주는 페이지
  - React-Router 기능을 이용해서 Search, User 페이지를 구분
2. **UserInfo: Redux state**
  - 위 autoComplete와 마찬가지로 Redux로 상태값을 관리
  - 먼저 `user.state.js`에 **타입과 액션** 정의
  - **Reducer 생성**: `setValueReducer(...)`
  - 아직 기능하지 않는 `user.saga.js` 생성
  - store에 생성한 Reducer와 Saga를 Combine 해줌
3. **Search 페이지에서 사용자 검색시 User 페이지로의 전환**
  - react-router-dom: `useHistory` 사용
  - user 검색 시 autoComplete 배열을 find 함수로 user의 이름을  
  찾은 뒤 일치하는 user 페이지로 이동: `history.push(...)` 사용
  - 페이지 이동 전 dispatch 함수로 userAction 중 setValue 로  
  유저의 정보를 먼저 세팅해줌: `dispatch(...)`
4. **UserPage 와 연동하기**
  - 리덕스에 저장되어 있는 유저 정보를 가져옴: `useSelector(...)`
  - 유저 정보 헤더에 뒤로가기 버튼 활성화: `useHistory()`와 `history.goBack()`
  - *여기서 문제 발생!!*
    + Search 페이지에서 User 페이지로 이동 시 API 연동이 되지만  
    User 페이지에서 User 페이지를 다시 로드할 때 연동이 되지 않음
    + react-router의 match 속성을 이용하여 해결 가능
      + match.params.name 을 유저의 name에 할당
      + 리덕스에 액션인 fetchUser 기능을 추가하여 User 페이지를  
      렌더할 때 마다 fetchUser를 실행시킴: `useEffect(...)`
  - **Redux에 fetchUser 추가하기**
    + 리덕스의 유저 상태 코드인 Types, Actions에 fetchUser를 할당
    + FetchUser Type: 'user/FetchUser' 지정
    + fetchUser Action: name 값을 Types.FetchUser에 전달
  - **fetchUser Saga 기능 구현**
    + 먼저 callApi로 API를 불러온 뒤, 유저의 name을 params인  
    keyword 값에 할당하고 호출 성공과 data 정보가 있을 시  
    data의 name값이 같은 정보를 찾아: `data.find(...)`  
    리덕스 User Action인 setValue에 user 정보를 넣음: `put(...)`
    + Search Saga 와 같이 fetchUser가 실행될 때 마다   
    FetchUser Type과 fetchUser Action을 가져옴: `all([takeEvery(...)])`
5. **존재 하지 않는 사용자 페이지에 접근 시**
  - user의 정보가 존재할 때와 없을 때의 상황 부여
    + `user === true`: 사용자 정보 페이지 렌더링
    + `user === false(!user)` : 존재하지 않는 사용자 입니다.. 렌더링
  - *여기서 문제 발생!*
    + 존재하는 사용자의 페이지를 접근할 때 데이터를 불러 오기전까지  
    존재하지 않는 사용자의 페이지가 렌더링되는 이슈가 발생
    + `isFetched`, `isFetching` 이라는 상태를 구현해서  
    성능 이슈를 해결할 예정
-----------
## 5. API 통신 상태값 관리하기: makeFetchSaga (코드 분석 중점)
-----
<img width="516" alt="스크린샷 2020-12-17 오후 4 26 00" src="https://user-images.githubusercontent.com/70752848/102456585-ba46e080-4084-11eb-96c8-a57570a88f87.png">

1. **fetch 상태값 관리: Saga 에서 주로 처리**
  - `all([takeEvery(...)])` 부분에서 makeFetchSaga 함수를 추가
    + fetchSaga를 fetchUser로 설정
    + canCache라는 파라미터를 추가로 설정
  - **canCache** 란?
    + true: 정해진 시간동안 해당 API가 응답하는 값을 캐싱  
    액션이 발생 했을 때 API를 다시 호출하는 방식이 아닌  
    그 캐싱된 데이터를 활용함
    + 가장 중요한 역할은 **fetch 상태값을 관리 해줌**

2. **makeFetchSaga 관련 코드 분석**
  - **Redux에 fetch 관련 상태를 지정**함: Types, Actions
  - Types(SetValue, SetIsSlow, SetFetchStatus): 'commom/...'
  - Actions
    + Setvalue : setValue 관련 액션을 생성하고 설정함
    + setIsSlow : payload 로 입력해 설정
    + setFetchStatus: 위와 동일
  - 초기값으로 **fetch와 관련된 상태값** 설정 (fetchInfo)
    > 각 액션마다 액션이 어떤 상태인지 나타냄
    + fetchStatusMap(Request, Success, Fali)
    + isSlowMap(boolean) : 설정한 시간동안 응답이 오지 않을 시 true
    + totalCountMap : Pagination시 사용(추후 다룸)
    + errorMessageMap : error가 있을 시 출력할 Message 저장
    + nextPageMap : Pagination시 사용
  - **Reducer 생성**
    + SetFetchStatus 액션 발생 시 호출할 5가지 상태값 설정
    + 각 상태의 해당 actionType 또는 fetchKey를 설정
  - 마찬가지로 Redux Store에 commonReducer를 combine 함
  - **makeFetchSaga의 기능을 수행할 fetch.js 코드 분석**
    + 먼저, redux-helper에 `FETCH_KEY`와 `FETCH_PAGE` Immer 작성
    + fetch 기능에 필요한 모든 요소들을 불러옴 : Fetch 상태값들, API 호출,  
    fetch 액션들, FETCH_KEY&PAGE, 캐시를 저장할 lruCache
    + makeFetchSaga 함수를 보면
      + fetchSaga, canCache, getTotalCount 를 매개변수로 가짐
      + fetchSaga 함수를 실행할 제너레이트한 객체를 생성
      + **중요한 포인트는!** CallApi 함수를 호출하려할 때  
      `setFetchStatus` 액션을 발생시킴( Success or Fail )
      + 캐싱과 관련된 처리: `cacheKey`  
      캐싱된 데이터가 있으면 캐싱된 Result 값을 가져와 사용
      없다면 사가 미들웨어에 전달하고 API 호출
      + makeFetchSlowSaga: 0.5초 이상 딜레이시 Slow 상태 설정
      + 최종적으로, 응답된 apiResult(...params) 값을 받아서  
      `yield put(...)`으로 설정
  - **useFetchInfo hook 생성**
    + actionType과 fetchKey 불러와 앞서 작성했던 fetch 관련  
    상태값을 FetchStatus에 맞춰서 설정
    + state 설정한 뒤 react-redux의 내장함수인 `shallowEqual`  
    을 사용해 객체 안의 가장 겉에 있는 값들을 모두 비교해줌  
    즉, state 상태인 fetchStatus, isFetching, isFetched 등을 비교
  - **User Page에 적용하기**
    + useFetchInfo 훅에 생성한 상태 표현 기능을 불러와 리덕스툴에  
    상태를 표현해주도록 설정 : `isFetched? Success, Fail`
    + 데이터 불러오기 지연시 로딩 Spin 활용 : `Ant-Disign: Spin`
  - **결과 확인**
    + 데이터 불러오기 성공 시 
  <img width="378" alt="스크린샷 2020-12-20 오후 9 33 08" src="https://user-images.githubusercontent.com/70752848/102713350-04d98e80-430b-11eb-819b-4d7684757686.png">
    + Network에 Slow 3G로 변경하고 IsSlow 상태 확인하기
    <img width="353" alt="스크린샷 2020-12-20 오후 9 40 16" src="https://user-images.githubusercontent.com/70752848/102713510-2be49000-430c-11eb-8ad7-9fc1aca328af.png">  
    > 이처럼 데이터를 불러오기 전까지 로딩 스핀이 보여짐  

    <img width="487" alt="스크린샷 2020-12-20 오후 9 41 34" src="https://user-images.githubusercontent.com/70752848/102713512-2dae5380-430c-11eb-83d2-616c4d498e74.png">

    > 데이터 호출이 설정한 0.5초 이상 지연시 isSlow 상태가 true 상태  
    였다가 false로 전환된 상태
  - makeFetchSaga 의 canCache 기능을 적용해 keyword를 검색할 때  
  중복적인 keyword 검색 이슈 제거하기 : 캐시된 검색 keyword는 더이상  
  중복 호출이 되지 않음