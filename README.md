# 2022 Capstone10 Backend

# How to Start

## 초기 환경설정

```shell
yarn add ...
yarn add jsonwebtoken @types/jsonwebtoken
yarn add bcrypt @types/bcrypt
```

## 시작하는 법

### 1. 로컬 환경

```shell
yarn local
```

# Backend 구조

## Contanier 구조 설정

### 1. Contanier

### 2. Bean

## Entity 관리 및 api 서비스 구조

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

- api address
- api method

### 2. `service.d.ts`, `service.ts`

- api service

### 3. `repository.d.ts`, `repository.ts`

- Data CRUD

### 4. `entity.ts`, `dto.ts`

- MySQL
- TypeORM
- DTO

# 기능

## 회원가입/로그인

### 1. 회원가입 구현

- bcrypt 사용하여 비밀번호 암호화

### 2. 로그인 구현

- jsonwebtoken 이용하여 토큰 생성
