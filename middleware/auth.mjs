/*
     Authorization
     - 본인의 신원을 증명하는 과정
 
     Authorization 헤더
     - http 요청을 보낼 때 헤더(Headers)라는 곳에 "추가정보"를 담을 수 있음
     - 인증정보를 담는 표준 위치가 Authorization 헤더임
 
     Bearer
     - Authorization에 실을 수 있는 방식(타입) 중 하나
     - Bearer는 토큰(token)을 가지고 있다는 것 자체로 인증함
         Authorization: Bearer <토큰>       
 */

import jwt from "jsonwebtoken";
const JWT_SECRET = "your_jwt_secret";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "토큰이 필요합니다" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "유효하지 않은 토큰입니다" });
  }
}
