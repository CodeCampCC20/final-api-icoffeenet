import * as Yup from "yup"

export const schemaRegister = Yup.object({
    username: Yup.string().required(),
    password: Yup.string().min(8).required()
}) 

export const schemaLogin = Yup.object({
    username: Yup.string().required(),
    password: Yup.string().min(8).required()
}) 