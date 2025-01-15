exports.ResponseSuccess = (data, res) => {
    return res.status(200).send({
        statusCode: 200,
        data
    })
}

exports.Unauthorized = (message, res) => {
    return res.status(401).send({
        statusCode: 401,
        message
    })
}

exports.NotFoundException = (message, res) => {
    return res.status(404).send({
        statusCode: 404,
        message
    })
}

exports.InvalidParameterException = (message, res) => {
    return res.status(400).send({
        statusCode: 400,
        message
    })
}

exports.ServerError = (res) => {
    return res.status(500).send({
        statusCode: 500,
        message: "Error Service"
    })
}