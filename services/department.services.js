
const departmentModel = require('../models/department.model');
const createError = require('http-errors');
const timeTableModel = require('../models/timeTable.model');


module.exports.addDepartment = async (req, res, next) => {

    try {
        const { name } = req.body;

        const add = await departmentModel.findOne({ name });

        if (add) {
            return next(createError(201, "this department aready exisit"));
        }
        else {
            await departmentModel.insertMany({ name });
            const department = await departmentModel.findOne({ name });
            await timeTableModel.updateMany({}, { $push: { priorityList: { departmentId: department.id, departmentName: department.name } } })
            res.status(201).json({
                meg: "added successfully",
                isError: false,
                data: department
            });

        }
    } catch (error) {
        return next(createError(405, 'server maintenance now please try again later'))

    }

}

module.exports.getAll = async (req, res, next) => {


    try {

        const department = await departmentModel.find()

        res.status(201).json({
            meg: "sucsess",
            isError: false,
            data: department ?? []
        });

    } catch (error) {
        return next(createError(405, 'server maintenance now please try again later'))

    }






}
module.exports.deleteDepartment = async (req, res, next) => {

    try {
        const { id } = req.body;
        if (id.length < 12) {
            while (id.length < 12) {
                id += "0";
            }
        }


        const dele = await departmentModel.findById(id);
        if (dele) {
            await departmentModel.findByIdAndRemove(id);
            const departs = await departmentModel.find();

            res.status(201).json({
                meg: "Deleted",
                isError: false,
                data: departs
            });
        }
        else {

            return next(createError(201, "this department does not exists"));
        }
    } catch (error) {
        return next(createError(405, 'server maintenance now please try again later'))

    }

}