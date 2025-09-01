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

router.post('/post', upload.single('image'), async (req, res) => {
  try {
    console.log("Incoming body:", req.body);
    console.log("Incoming file:", req.file);

    const imageUrl = req.file ? req.file.path : null;

    const productData = {
      ...req.body,
      image: imageUrl
    };

    const postProduct = new Products(productData);
    await postProduct.save();

    res.status(201).send({ message: 'Product posted successfully', product: postProduct });
  } catch (e) {
    console.error("Error saving product:", e);
    res.status(500).send({ message: e.message });
  }
});

            //To post product without image upload middleware
            
//     router.post('/post', async (req, res) => {
//     try {
//         const ad = new Ads(req.body)
//         await ad.save()
//         console.log(req.body)
//         res.send({ message: 'Ad posted successfully' })
//     } catch (e) {
//         res.send({ message: e.message })
//     }
// })


//             To update and delete product that are not required now

//     router.put('/update',(req,res)=>{
// console.log('req',req.body)
// res.send({message:'You Updated Successfully'})
// })

//     router.delete('/:id',(req,res)=>{
// console.log('req',req.params.id)
// res.send({message:'Product delete successfully'})
// })


router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Products.findOneAndUpdate(
            req.params.id,
            req.body,
           { new: true } // To return the updated document
        );
        res.send({ message: 'Product updated successfully', updatedProduct });
    } catch (e) {
        res.send({ message: 'Error updating ad', error: e.message });
    }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Products.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).send({ message: ' Product not found ' });
    }

    res.send({ message: ' Product deleted successfully', deletedProduct });
  } catch (e) {
    res.status(500).send({ message: 'Error deleting ad', error: e.message });
  }
});

export default router;