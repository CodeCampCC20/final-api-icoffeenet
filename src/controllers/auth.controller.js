import authService from "../services/auth.service.js"
import hashService from "../services/hash.service.js"
import jwtService from "../services/jwt.service.js"
import createError from "../utils/create-error.js"

const authController = {}

authController.regsiterUser = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const existUser = await authService.findUserByUsername(username)
        if (existUser) {
            createError(400, "User already exist.")
        }
        const hashPassword = hashService.hashPassword(password)

        const newUser = await authService.createUser({ username, password: hashPassword })
        res.status(201).json({ Created: { newUser: { user: newUser.username, password: hashPassword } } })

    } catch (error) {
        next(error)
    }
}

authController.regsiterDoctor = async (req, res, next) => {
    try {
        const { username, password, specialization } = req.body
        const existUser = await authService.findDoctorByUsername(username)
        if (existUser) {
            createError(400, "Doctor already exist.")
        }
        const hashPassword = hashService.hashPassword(password)
        const newUser = await authService.createDoctor({ username, password: hashPassword, specialization: specialization })
        res.status(201).json({ Created: { newUser: { user: newUser.username, password: hashPassword, specialization: specialization } } })

    } catch (error) {
        next(error)
    }
}

authController.loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const existUser = await authService.findUserByUsername(username)
        if (!existUser) {
            createError(400, "User not found.")
        }

        const isMatchPassword = hashService.comparePassword(
            password,
            existUser.password
        )
        console.log("isMatchPassword", isMatchPassword)


        const payload = { username: existUser.username }

        const accessToken = jwtService.createToken(payload)
        res.status(200).json({ token: accessToken })
    } catch (error) {
        next(error)
    }
}

authController.loginDoctor = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const existUser = await authService.findDoctorByUsername(username)
        if (!existUser) {
            createError(400, "User not found.")
        }

        const isMatchPassword = hashService.comparePassword(
            password,
            existUser.password
        )
        console.log("isMatchPassword", isMatchPassword)


        const payload = { username: existUser.username }

        const accessToken = jwtService.createToken(payload)
        res.status(200).json({ token: accessToken })
    } catch (error) {
        next(error)
    }
}

authController.createHealthRecord = async (req, res, next) => {
    try {
        const { type, value } = req.body
        const existHealthRecord = await authService.findHealthRecordByValue(value)
        if (existHealthRecord) {
            createError(400, "HealthRecord already exist.")
        }
        const newHealthRecord = await authService.createHealthRecord({ type: type, value: value })
        res.status(201).json({ Created: { newHealthRecord: { type: newHealthRecord.type, value: newHealthRecord.value } } })
    } catch (error) {
        next(error)
    }
}

authController.viewHealthRecord = async (req, res, next) => {
    try {
        const { type, value } = req.body
        const existHealthRecord = await authService.findHealthRecordByTypeAndValue({ type, value })
        if (existHealthRecord) {
            res.status(201).json({ View: { type, value } })
        }
        createError(404, "No HealthRecord.")
    } catch (error) {
        next(error)
    }
}

export default authController