import jwt from "jsonwebtoken";
import * as authRepository from "../data/auth.mjs";
const JWT_SECRET = "your_jwt_secret";
const EXPIRES_IN = "1h";

export async function signup(req, res) {
  try {
    const { userid, password, name, email } = req.body;
    console.log("받은 데이터:", { userid, password, name, email }); // ✅ 확인용 로그

    if (!userid || !password || !name || email === undefined) {
      return res
        .status(400)
        .json({ message: "입력 누락: 모든 필드가 필요합니다" });
    }

    const user = await authRepository.createUser(userid, password, name, email);
    res.status(201).json(user);
  } catch (err) {
    console.error("회원가입 오류:", err);
    res.status(500).json({ message: "서버 내부 오류" });
  }
}

export async function login(req, res) {
  const { userid, password } = req.body;
  const user = await authRepository.login(userid, password);
  if (!user) {
    return res.status(401).json({ message: "아이디 또는 비밀번호 오류" });
  }
  const token = jwt.sign(
    { id: user.id, userid: user.userid, name: user.name },
    JWT_SECRET,
    { expiresIn: EXPIRES_IN }
  );
  res.status(200).json({ message: "로그인 성공", token });
}
