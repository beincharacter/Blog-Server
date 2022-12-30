const Post = require('../Models/PostModel')
const User = require("../Models/UserModel");
const cloudinary = require('../Cloudinary/cloudinary');
const router = require('express').Router()

router.get('/posts' , async(req,res)=>{
    try{
        const posts = await Post.find() 
        res.status(200).json(posts)

    }catch(e){
        return res.status(400).send(e.message)
    }
})


router.post("/posts",  (req, res) => {
    try {
      // console.log(req,"-----------")
      const file = req.files.image;
      cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
        // console.log(result)
        
          let date = new Date;
          let finalDate = date + "";
          let today = finalDate.split(" ").splice(1, 3).join(" ");
  
          const { title, description, author} = req.body;
      
          const user = await Post.create({
            title,
            image: result.url,
            description,
            date: today,
            author
          });
          res.send(user);
        })
      } catch (e) {
        console.log(e)
      }
  });

router.get("/" ,(req,res)=>{
    res.json({
        "Message":"404 not found"
    })
})

module.exports = router