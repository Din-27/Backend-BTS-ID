const { ResponseSuccess, ServerError, InvalidParameterException } = require("../helper/responseHttp");
const { item } = require("../../models");

exports.getItems = async (req, res) => {
    try {
        const { checklistId } = req.params
        let data = await item.findAll({
            where: {
                checklistId
            },
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

exports.getItemById = async (req, res) => {
    try {
        const { checklistId, checklistItemId } = req.params;
        let data = await item.findOne({
            where: {
                id: checklistItemId,
                checklistId
            },
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

exports.addItem = async (req, res) => {
    try {
        const { itemName } = req.body;
        const { checklistId } = req.params
        const check = await item.findAll({
            where: {
                name: itemName,
                checklistId
            }
        })
        if (check.length > 0) {
            return InvalidParameterException(`item dengan nama ${itemName} di checklist ${checklistId} sudah ada`, res)
        }
        const datas = await item.create({
            name: itemName,
            checklistId,
            aktif: 0,
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });
        return ResponseSuccess(datas, res);
    } catch (e) {
        console.log(e);
        return ServerError(res);
    }
};

exports.updateStatusItem = async (req, res) => {
    try {
        const { checklistId, checklistItemId } = req.params;
        const data = await item.update({ aktif: 1 }, {
            where: {
                id: checklistItemId,
                checklistId
            },
            attributes: {
                exclude: ["createdAt", "updateAt"],
            },
        });
        return ResponseSuccess('Sukses Update status', res);
    } catch (error) {
        console.error(error);
        return ServerError(res);
    }
};

exports.updateNameItem = async (req, res) => {
    try {
        const { itemName } = req.body;
        const { checklistId, checklistItemId } = req.params;
        const data = await item.update({ name: itemName }, {
            where: {
                id: checklistItemId,
                checklistId
            },
            attributes: {
                exclude: ["createdAt", "updateAt"],
            },
        });
        return ResponseSuccess('Sukses Update Nama', res);
    } catch (error) {
        console.error(error);
        return ServerError(res);
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const { checklistId, checklistItemId } = req.params;
        let data = await item.destroy({
            where: {
                id: checklistItemId,
                checklistId
            },
            attributes: {
                exclude: ["createdAt", "updateAt"],
            },
        });
        return ResponseSuccess(`Sukses delete ${checklistItemId}`, res);
    } catch (error) {
        console.error(error);
        return ServerError(res);
    }
};
