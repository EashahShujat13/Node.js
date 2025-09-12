import express from "express";
import Products from "../models/products.mjs";
import upload from "../middlewares/uploadimg.mjs";
import verifyToken from "../middlewares/verifyToken.mjs";


const router = express.Router();

router.get("/",async(req,res)=>{
const allProducts = await Products.find();
res.send({message: "All products fetched successfully", Data: allProducts});
})



// router.get('/:id',async(req,res)=>{
// try{
//     const singleProduct=await Products.findById(req.params.id)
//     res.send({message:"single product fetched successfully", Data: singleProduct})
// }
// catch(e){
//     res.status(500).send({message:e.message})

// }
// })

router.post("/post",verifyToken, upload.single("image"), async (req, res) => {
  try {
    // log incoming data for debugging
    console.log("Incoming body:", req.body);
    console.log("Incoming file:", req.file);

   const imageUrl = req.file?.path || req.file?.secure_url || "";
// safe fallback if no file

    // Validate required fields
    const { title, description, price, category } = req.body;
    if (!title || !description || !price || !category) {
      return res.status(400).send({ message: "All fields except image are required" });
    }

    const newProduct = new Products({
      title,
      description,
      price,
      category,
      image: imageUrl,
    });

    await newProduct.save();
    res.status(201).send({ message: "Product posted successfully", Data: newProduct });
  } catch (e) {
    console.error("Error saving product:", e);
    res.status(500).send({ message: "Server error", error: e.message });
  }
});



router.get("/id/:id", async (req, res) => {
  try {
    const ad = await Products.findById(req.params.id);
    res.send({ message: "Data Fetched Successfully", singleProduct: ad });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

// router.get('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).send({ message: "Invalid product ID format" });
//     }

//     const singleProduct = await Products.findById(id);
//     if (!singleProduct) {
//       return res.status(404).send({ message: "Product not found" });
//     }

//     res.status(200).send({ message:"Single product fetched successfully", Data: singleProduct });
//   } catch (e) {
//     res.status(500).send({ message:"Server error", error:e.message });
//   }
// });



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

// yeh wala code update kry ga but id confirm ni kry ga


// router.put('/:id', async (req, res) => {
//     try {
//         const updatedProduct = await Products.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//            { new: true } // To return the updated document
//         );
//         res.send({ message: 'Product updated successfully', updatedProduct });
//     } catch (e) {
//         res.send({ message: 'Error updating ad', error: e.message });
//     }
// });




router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid product ID format" });
    }

    const updatedProduct = await Products.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send({ message: 'Product updated successfully', Data: updatedProduct });
  } catch (e) {
    res.status(500).send({ message: 'Error updating product', error: e.message });
  }
});

// yeh wala code delete kry ga but id confirm ni kry ga


// router.delete('/:id', async (req, res) => {
//   try {
//     const deletedProduct = await Products.findByIdAndDelete(req.params.id);

//     if (!deletedProduct) {
//       return res.status(404).send({ message: ' Product not found ' });
//     }

//     res.send({ message: ' Product deleted successfully', deletedProduct });
//   } catch (e) {
//     res.status(500).send({ message: 'Error deleting ad', error: e.message });
//   }
// });


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid product ID format" });
    }

    const deletedProduct = await Products.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).send({ message: 'Product not found' });
    }

    res.status(200).send({ message: 'Product deleted successfully', Data: deletedProduct });
  } catch (e) {
    res.status(500).send({ message: 'Error deleting product', error: e.message });
  }
});

export default router;