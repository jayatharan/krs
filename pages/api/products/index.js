import dbConnect from '../../../lib/dbConnect'
import authenticated from '../../../middlewares/authenticated'
import Product from '../../../models/Product'

async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const { page = 1, limit = 100, search } = req.query;
                let filter = {};
                if(search){
                    filter = {
                        $or:[
                            {name:{$regex:search, $options:'si'}},
                            {description:{$regex:search, $options:'si'}}
                        ]
                    }
                }
                const p = Number.parseInt(page)
                const l = Number.parseInt(limit)
                const products = await Product.find(filter).limit(l).skip((p-1)*l)
                res.status(200).json({ success: true, data: products })
            } catch (error) {
                res.status(400).json({ success: false, error })
            }
            break
        case 'POST':
            try {
                const product = await Product.create(req.body)
                res.status(201).json({ success: true, data: product })
            } catch (error) {
                res.status(400).json({ success: true, error })
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
        roles:['manager', 'admin', 'super-admin']
    }
})