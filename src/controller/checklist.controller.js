const { ResponseSuccess, ServerError, InvalidParameterException } = require("../helper/responseHttp");
const { checklist, item } = require("../../models");

exports.getChecklists = async (req, res) => {
    try {
        let data = await checklist.findAll({
            attributes: {
                exclude: ["createdAt", "updateAt"],
            },
        });

        return ResponseSuccess(data, res);
    } catch (error) {
        console.error(error);
        return ServerError(res);
    }
};

exports.addChecklist = async (req, res) => {
    try {
        const check = await checklist.findAll({
            where: {
                name: req.body.name
            }
        })
        if (check.length > 0) {
            return InvalidParameterException(`checklist dengan nama ${req.body.name} sudah ada`, res)
        }
        let datas = await checklist.create(
            req.body
        );
        return ResponseSuccess(datas, res);
    } catch (e) {
        console.log(e);
        return ServerError(res);
    }
};

exports.deleteChecklist = async (req, res) => {
    try {
        const { checklistId } = req.params;
        let data = await checklist.destroy({
            where: {
                id: checklistId,
            },
            attributes: {
                exclude: ["createdAt", "updateAt"],
            },
        });
        await item.destroy({
            where: {
                checklistId
            },
            attributes: {
                exclude: ["createdAt", "updateAt"],
            },
        });
        data = JSON.parse(JSON.stringify(data));

        return ResponseSuccess('Sukses Delete', res);
    } catch (error) {
        console.error(error);
        return ServerError(res);
    }
};
