import express from "express";
import Products from "../models/products.mjs";
import upload from "../middlewares/uploadimg.mjs";
const router = express.Router();

router.get("/",async(req,res)=>{
    const allProducts = await Products.find();
    res.send({message: "All products fetched successfully", Data: allProducts});
})



router.get('/:id',async(req,res)=>{
    try{
        const singleProduct=await Products.findById(req.params.id)
        res.send({message:"single product fetched successfully", Data: singleProduct})
    }
    catch(e){
        res.status(500).send({message:e.message})

}
})

    router.post('/product',upload.single('image'),async(req,res)=>{
        try{
            const imageUrl = req.file?.path; // Get the image URL from the uploaded file
            const productData = {
                ...req.body,
                image: imageUrl // Add the image URL to the product data
            };

            const postProduct=new Products(productData);
            await 
            postProduct.save() 
            res.send({ message: 'data posted successfully' })
            console.log("data:", req.body);
            
        }
        catch(e){
            res.status(500).send({message:e.message})
        }
    })

     router.put('/update',(req,res)=>{
    console.log('req',req.body)
    res.send({message:'You Updated Successfully'})
})

     router.delete('/:id',(req,res)=>{
    console.log('req',req.params.id)
    res.send({message:'Product delete successfully'})
})





export default router;