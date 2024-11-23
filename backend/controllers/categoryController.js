const Category = require('../models/category');

exports.create = async (req, res, next) => {

    try{
    
        const category = await Category.create(req.body);
        res.json({
            message: "Success",
            category: category,
        })

    }catch (error)
    {
        console.log(error);
    }
}

exports.getCategory = async (req, res, next) => {

    try{

        const category = await Category.findById(req.params.id);
        res.json({
            message: "Category ID Found",
            category: category,
        })
    } catch(error){

        console.log(error);

    }
}

exports.getAllCategory = async (req, res, next) => {

    try{

        const categories = await Category.find();
        res.json({
            message: "Category Retrieved",
            categories: categories,
        })
    } catch(error){

        console.log(error);

    }
}

exports.updateCategory = async (req, res, next) => {

    try{
        // One Way //
        // const category = await Category.findById(req.params.id);
        // category.name = req.body.name
        // category.description = req.body.description
        // category.save();

        const category = await Category.findByIdAndUpdate(req.params.id, req.body);
       

        res.json({
            message: "Category Updated",
            category: category,
        });
        }
     catch(error){

        console.log(error);

    }

}

exports.deleteCategory = async (req, res, next) => {

    try {

        await Category.findByIdAndDelete(req.params.id);
        res.json({
            message: "Deleted Pare"
        })
    } catch (error){
        console.log(error);
    }
}

