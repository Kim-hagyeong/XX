import express from "express";
import * as authControllenr from "../controller/auth.mjs";
import { body } from "express-validator";
import { validate } from "../middleware/validator.mjs";

const router = express.Router();

const validateSignup = [];

const validateLogin = [
  body("userid")
    .trim()
    .isLength({ min: 4 })
    .withMessage("최소 4자 이상 입력")
    .matches(/^[a-zA-Z0-9]*$/)
    .withMessage("특수문자는 사용 불가"),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("최소 8자 이상 입력"),
];

// 회원가입
router.post("/signup", authControllenr.signup);

// 로그인
router.post("/login", authControllenr.login);

// 로그인 유지

export default router;
