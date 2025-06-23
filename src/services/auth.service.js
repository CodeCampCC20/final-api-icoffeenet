import prisma from "../config/prisma.js"

const authService = {}

authService.findUserByUsername = (username) => {
    return prisma.user.findUnique({ where: { username } })
}

authService.findDoctorByUsername = (username) => {
    return prisma.doctor.findUnique({ where: { username } })
}

authService.createUser = (data) => {
    return prisma.user.create({ data })
}

authService.createDoctor = (data) => {
    return prisma.doctor.create({ data })
}

authService.findHealthRecordByValue = (value) => {
    return prisma.HealthRecord.findFirst({ where: { value } })
}

authService.findHealthRecordByTypeAndValue = ({type, value}) => {
    return prisma.HealthRecord.findFirst({ where: { type, value } })
}

authService.createHealthRecord = (data) => {
    return prisma.HealthRecord.create({ data })
}

export default authService