const createError = (statusCode, message, field) => {
    const error = new Error(message)
    error.statusCode = statusCode
    error.field = field || null

    throw error
}

export default createError