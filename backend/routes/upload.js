const express=require('express')
const path=require('path')
const multer=require('multer')
const router=express.Router()

const storage=multer.diskStorage({
    destination(req,file,cb){
        cb(null,'uploads/')
    },
    filename(req,file,cb){
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null,  fileName)
    }
})
function checkFileType(file,cb){
    const fileTypes=/jpg|jpeg|png/
    const extname=fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype=fileTypes.test(file.mimetype)
    if(extname && mimetype){
        return cb(null,true)
    }else{
        cb('images only')
    }  
}
const upload=multer({
    storage,
    fileFilter:function(req,file,cb){
        checkFileType(file,cb)
    }
})
router.post('/upload',upload.single('image'),(req,res)=>{
    const url=req.protocol + '://' + req.get('host')
    console.log(url)
    res.send(url+'/uploads/'+req.file.filename)
})

module.exports=router