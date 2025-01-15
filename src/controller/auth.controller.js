const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    ServerError,
    ResponseSuccess,
    InvalidParameterException,
} = require("../helper/responseHttp");

exports.registerController = async (req, res) => {
    try {
        const { password, name, email } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await user.create({
            name: name,
            email: email,
            password: hashedPassword,
        });
        const token = jwt.sign({ id: newUser.id }, process.env.TOKEN_KEY);
        return ResponseSuccess(
            {
                name: newUser.name,
                token,
            },
            res
        );
    } catch (e) {
        console.error(e);
        return ServerError(res);
    }
};

exports.loginController = async (req, res) => {
    const { email } = req.body;
    try {
        const userLogin = await user.findOne({
            where: {
                email,
            },
            attributes: {
                exclude: ["status", "createdAt", "updatedAt"],
            },
        });
        const isValid = await bcrypt.compare(req.body.password, userLogin.password);
        if (!isValid) {
            return InvalidParameterException("email and password not match", res);
        }
        const token = jwt.sign({ id: userLogin.id }, process.env.TOKEN_KEY);
        return ResponseSuccess(
            {
                user: {
                    name: userLogin.name,
                    email: userLogin.email,
                    role: userLogin.role,
                    image: userLogin.image,
                    token,
                },
            },
            res
        );
    } catch (e) {
        console.log(e);
        return ServerError(res);
    }
};
