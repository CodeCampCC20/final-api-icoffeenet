import jwt from "jsonwebtoken"

const jwtService = {}

jwtService.createToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET, { expiresIn: "1h", algorithm: "HS256" })
}

jwtService.verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET, { algorithm: ["HS256"] })
}

export default jwtService