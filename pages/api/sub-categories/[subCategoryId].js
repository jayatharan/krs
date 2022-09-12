import dbConnect from "../../../lib/dbConnect";
import authenticated from '../../../middlewares/authenticated'
import SubCategory from '../../../models/SubCategory'
import Product from '../../../models/Product'

async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch(method) {
        case 'GET':
            try {
                const {subCategoryId} = req.query;
                const subCategory = await SubCategory.findById(subCategoryId)
                if(!subCategory) throw new Error("Not Found");
                res.status(200).json({ success: true, data: subCategory })
            } catch (error) {
                res.status(400).json({ success: false, error })
            }
            break
        case 'PUT':
            try {
                const {subCategoryId, moveProducts} = req.query;
                const subCategory = await SubCategory.findById(subCategoryId);
                if(!subCategory) throw new Error("Not Found");
                const data = req.body;
                if(data.name != undefined && data.name) subCategory.name = data.name;
                if(data.active != undefined) subCategory.active = data.active;
                if(data.categoryId != undefined){
                    subCategory.categoryId = data.categoryId
                    await Product.updateMany({
                        subCategoryId
                    },{
                        $set:{
                            categoryId:data.categoryId
                        }
                    })
                }
                await subCategory.save();
                res.status(200).json({ success: true, data: subCategory })
            } catch (error) {
                res.status(400).json({ success: false, error })
            }
            break
        case 'DELETE':
            try {
                const {subCategoryId, deleteProducts} = req.query;
                if(deleteProducts == '1'){
                    await Product.deleteMany({subCategoryId})
                }else{
                    await Product.updateMany(
                        {subCategoryId}, 
                        {
                            $set:{
                                subCategoryId:null
                            }
                        })
                }
                await SubCategory.deleteOne({_id:subCategoryId})
                res.status(200).json({ success: true })
            } catch (error) {
                res.status(400).json({ success: false, error })
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