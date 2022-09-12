import dbConnect from "../../../../lib/dbConnect"
import authenticated from "../../../../middlewares/authenticated"
import Category from "../../../../models/Category"
import Product from "../../../../models/Product"

async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch(method) {
        case 'GET':
            try {
                const {categoryId} = req.query;
                const category = await Category.findById(categoryId)
                if(!category) throw new Error("Not Found");
                res.status(200).json({ success: true, data: category })
            } catch (error) {
                res.status(400).json({ success: false, error })
            }
            break
        case 'PUT':
            try {
                const {categoryId} = req.query;
                const category = await Category.findById(categoryId);
                if(!category) throw new Error("Not Found");
                const data = req.body;
                if(data.name != undefined) category.name = data.name;
                if(data.active != undefined) category.active = data.active;
                if(data.image != undefined) category.image = data.image
                await category.save()
                res.status(200).json({ success: true, data: category })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'DELETE':
            try {
                const {categoryId} = req.query;
                await Product.deleteMany({categoryId})
                await Category.deleteOne({_id:categoryId})
                res.status(200).json({ success: true })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }

}

export default authenticated(handler, {
    'PUT':{
        active:true,
        roles:['admin','manager','super-admin']
    },
    'DELETE':{
        active:true,
        roles:['super-admin']
    }
})