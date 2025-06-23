import authServices from  "../services/auth.service.js"
import jwtService from "../services/jwt.service.js"
import createError from "../utils/create-error.js"

const authenticate = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization
        if(!authorization || ! authorization.startsWith("Bearer")) {
            createError(401, "Unauthorization authorization")
        }

        const token = authorization.split(" ")[1]
        if(!token) {
            createError(401, "Unauthorization token")
        }

        const payload = jwtService.verifyToken(token)
        const user = await authServices.findUserById(payload.id)
        if(!user) {
            createError(401, "Unauthorization findUserById")
        }
        req.user = user
        next()
    } catch (error) {
        console.log(error)
    }
}

export default authenticate