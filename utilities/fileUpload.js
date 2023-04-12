
const multer=require("multer")
exports.uploadSingleFile = ()=>{
    const storage = multer.diskStorage({})
      
      const upload = multer({ storage: storage })
     return upload.single('photo');
}
