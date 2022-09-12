import dbConnect from '../../../lib/dbConnect'
import authenticated from '../../../middlewares/authenticated';
import Category from '../../../models/Category'

async function handler(req, res) {
    const { method } = req;

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const categories = await Category.find({}).sort({'order': 1});
                res.status(200).json({ success:true, data: categories });
            }catch (error) {
                res.status(400).json({ success: false });
            }
            break
        case 'POST':
            try{
                const category = await Category.create(req.body)
                res.status(201).json({ success: true, data: category })
            }catch (error) {
                res.status(400).json({ success: false });
            }
            break
        default:
            res.status(400).json({ success: false });
            break;
    }
}

export default authenticated(handler, {
    'POST':{
        active:true,
        roles:['admin', 'super-admin']
    }
})