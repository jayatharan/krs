import dbConnect from "../../../../lib/dbConnect"
import authenticated from "../../../../middlewares/authenticated"
import CarouselSlide from "../../../../models/CarouselSlide"

async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch(method) {
        case 'GET':
            try{
                const {carouselSlideId} = req.query;
                const carouselSlide = await CarouselSlide.findById(carouselSlideId);
                if(!carouselSlide) throw new Error("Not Found");
                res.status(200).json({ success:true, data:carouselSlide })
            } catch (error) {
                res.status(400).json({ success: false, error })
            }
            break
        case 'PUT':
            try{
                const {carouselSlideId} = req.query;
                const carouselSlide = await CarouselSlide.findById(carouselSlideId);
                if(!carouselSlide) throw new Error("Not Found");
                const data = req.body;
                if(data.image != undefined) carouselSlide.image = data.image
                if(data.active != undefined) carouselSlide.active = data.active
                if(data.showIn != undefined) carouselSlide.showIn = data.showIn
                if(data.redirectTo != undefined) carouselSlide.redirectTo = data.redirectTo
                await carouselSlide.save()
                res.status(200).json({ success:true, data:carouselSlide })
            } catch (error) {
                res.status(400).json({ success: false, error })
            }
            break
        case 'DELETE':
            try{
                const {carouselSlideId} = req.query;
                await CarouselSlide.deleteOne({_id:carouselSlideId})
                res.status(200).json({success: true});
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