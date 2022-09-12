import dbConnect from "../../../../lib/dbConnect";
import SubCategory from '../../../../models/SubCategory';

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try{
                const {categoryId, page = 1, limit = 100} = req.query;
                const p = Number.parseInt(page)
                const l = Number.parseInt(limit)
                const subCategories = await SubCategory.find({
                    categoryId
                }).limit(l).skip((p-1)*l).sort({'createdAt': -1})
                res.status(200).json({ success: true, data: subCategories })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}