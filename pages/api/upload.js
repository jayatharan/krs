import nextConnect from 'next-connect'
import multer from 'multer'
import fs from 'fs'

const oneMegabyteInBytes = 1000000;
const outputFolderName = './public/uploads';

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./public/uploads")
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}--${file.originalname}`)
        }
    }),
    /*fileFilter: (req, file, cb) => {
        const acceptFile: boolean = ['image/jpeg', 'image/png'].includes(file.mimetype);
        cb(null, acceptFile);
    },*/
});

const apiRoute = nextConnect({
    onError(error, req, res){
        res.status(501).json({ success: false, message:'Sorry something went wrong.', error});
    },
    onNoMatch(req, res){
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    }
})

apiRoute.use(upload.single('file'));

apiRoute.post((req, res)=>{
    const file = req.file;

    res.status(200).json({ success:true, data: file });
})

export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
};
export default apiRoute;