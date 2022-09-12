import dbConnect from '../../../lib/dbConnect'
import authenticated from '../../../middlewares/authenticated'
import SubCategory from '../../../models/SubCategory'

async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const subCategories = await SubCategory.find({})
                res.status(200).json({ success:true, data:subCategories })
            } catch (error) {
                res.status(400).json({ success: false, error })
            }
            break
        case 'POST':
            try{
                const subCategory = await SubCategory.create(req.body)
                res.status(201).json({success:true, data:subCategory})
            } catch (error) {
                res.status(400).json({ success: false, error })
            }
            break
        default:
            res.status(401).json({ success: false })
            break
    }
}

export default authenticated(handler, {
    'POST':{
        active:true,
        roles:['admin', 'super-admin']
    }
})