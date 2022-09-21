import dbConnect from '../../../lib/dbConnect'
import authenticated from '../../../middlewares/authenticated'
import CarouselSlide from '../../../models/CarouselSlide'

async function handler(req, res) {
    const {method} = req

    await dbConnect()

    switch(method) {
        case 'GET':
            try{
                const { showIn } =  req.query;
                let filter = {}
                if(showIn){
                    filter = {showIn}
                }
                const carouselSlides = await CarouselSlide.find(filter).sort({'updatedAt': 1})
                res.status(200).json({ success:true, data:carouselSlides })
            }catch (error) {
                res.status(400).json({ success: false, error })
            }
            break
        case 'POST':
            try{
                const carouselSlide = await CarouselSlide.create(req.body)
                res.status(201).json({ success: true, data: carouselSlide })
            }catch (error) {
                res.status(400).json({ success: false, error })
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