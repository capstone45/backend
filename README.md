# 2022 Capstone10 Backend
# 참여자 및 주요 역할

- 이원주
    - DB 설계 및 구현
    - 레시피 추천 기능 구현
    - 구독/북마크 기능 구현
- 이세희
     - 회원가입/로그인 구현
- 공통 역할
    - Backend API 서비스 구조에 따라 기능 구현
    - 백엔드 서비스 Backlog 작성
    - API 명세서 작성
# How to Start

### yarn package 설치
```shell
// yarn 설치 후 진행
// package.json 패키지 설치 

yarn install
```
### API 테스트 환경 설정
```shell
// vscode extensions `rest client` 설치
// `.rest` 파일 생성
// API 명세서 참고하여 확인

### 유저 정보 확인  
GET http://localhost:4000/users/1 HTTP/1.1

```
### DB(MySQL) 연동 설정 방법
```shell
// .env 생성 후 작성
DB_LOCAL_HOST = 0.0.0.0 //IP address
DB_LOCAL_PORT = 3306 // Port number
DB_LOCAL_USERNAME = root // Username
DB_LOCAL_PASSWORD = 0000 // Password of DB
DB_LOCAL_DATABASENAME = capstone // DB name
```

## 서버 실행

### 1. 로컬 환경

```shell
yarn local
```

# Backend 구조

## Contanier 구조 설정

### 1. Contanier
- 
### 2. Bean
- 
## Entity 관리 및 API 서비스 구조

```
...
├── type
│   ├── controller.d.ts
│   ├── service.d.ts
│   ├── repository.d.ts
│   ├── dto.ts
│   └── error.ts
├── controller.ts
├── service.ts
├── repository.ts
└── entity.ts
```

### 1. `controller.d.ts`, `controller.ts`

- API address
- API method

### 2. `service.d.ts`, `service.ts`

- API service

### 3. `repository.d.ts`, `repository.ts`

- Data CRUD

### 4. `entity.ts`, `dto.ts`

- MySQL
- TypeORM
- DTO

## 그 외 정보
- [DB 구조 보러가기](https://coal-bee-2c7.notion.site/DB-295b97c06f034e38a40c1c1876d8b2f3)

- [API 명세서 보러가기](https://coal-bee-2c7.notion.site/API-0f1484a8eeb648d3b3b9cbc1fc5542b9)

# 기능

## 레시피 추천
### 1. 레시피 추천 원리
- 
## 구독/북마크 
### 1. 구독 원리
- 
### 2. 북마크 원리
- 
## 회원가입/로그인

### 1. 회원가입 구현

- bcrypt 사용하여 비밀번호 암호화

### 2. 로그인 구현

- jsonwebtoken 이용하여 토큰 생성
