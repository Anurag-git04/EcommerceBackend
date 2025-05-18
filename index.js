const connectDB = require('./db/db.connect')
const Product = require('./models/product.model')
const Category = require('./models/category.model')
const cors = require('cors')

connectDB()

const express = require('express')
const app = express()
app.use(express.json());
app.use(cors())

async function postCategory(newCategory){
    try{
        const newCat = new Category(newCategory);
        const savedProduct = await newCat.save();
        console.log(savedProduct)
        return savedProduct
    }catch(error){
        console.log("Error",error)
    }
}

app.post('/category', async(req,res)=>{
    try{
        const savedProduct = await postCategory(req.body)
        console.log("New: ", savedProduct)
        if(savedProduct){
            res.status(201).json({ data: { product: savedProduct } });
        }else{
            res.status(500).json({message:`Data is not Saved `})
        }
    }catch(error){
        res.status(500).json({error:`Error while posting data `})
    }
})

async function postData(productdata){
    try{
        const newProduct = new Product(productdata);
        const savedProduct = await newProduct.save();
        console.log(savedProduct)
        return savedProduct
    }catch(error){
        console.log("Error",error)
    }
}

app.post('/product',async(req,res)=>{
    try{
        const savedProduct = await postData(req.body)
        console.log("New: ", savedProduct)
        if(savedProduct){
            res.status(201).json({ data: { product: savedProduct } });
        }else{
            res.status(500).json({message:`Data is not Saved `})
        }
    }catch(error){
        res.status(500).json({error:`Error while psoting data `})
    }
})

const readallproduct = async()=>{
    try{
        const product = await Product.find()
        console.log(product)
        return product
    }catch(error){
        console.log("Error while fetching data", error)
    }
}

app.get('/products', async(req,res)=>{
    try{
        const products = await readallproduct()
        if(products){
            res.status(201).json({ data:{ product:products} });
        }else{
            res.status(404).json({message:"No data found"})
        } 
    }catch(error){
        res.status(500).json({error:`Error fetching product data`})
    }
})

const readById = async (productId)=>{
    try{
        const product = await Product.findById(productId)
        console.log(product)
        return product
    }catch(error){
        console.log("Error while fetching data", error)
    }
}

app.get('/products/:productId', async(req,res)=>{
    try{
        const product = await readById(req.params.productId)
        if(product){
            res.status(201).json({ data:{ product:product} })
        }else{
            res.status(400).json({message:"No data found"})
        }
    }catch(error){
        res.status(500).json({error:`Error fetching product data`})
    }
})

const readcategory= async()=>{
    try{
        const products = await Category.find()
        console.log(products)
        return products
    }catch(error){
        console.log("Error while fetching data in category", error)
    }
}

app.get('/category', async(req,res)=>{
    try{
        const product = await readcategory()
        if(product){
            res.status(201).json({ data:{ product:product} })
        }else{
            res.status(400).json({message:"No data found"})
        }
    }catch(error){
        res.status(500).json({error:`Error fetching product data`})
    }
})

app.post('/products/bulk', async (req, res) => {
    try {
        const products = req.body; 
        const insertedProducts = await Product.insertMany(products);
        res.status(201).json({ data: { products: insertedProducts } });
    } catch (error) {
        console.error("Error inserting multiple products", error);
        res.status(500).json({ error: "Error inserting multiple products" });
    }
});

const readbycategory= async(categoryId)=>{
    try{
        const Items = await Product.find({categoryId:categoryId})
        console.log(Items)
        return Items
    }catch(error){
        console.log("Error while fetching data in category", error)
    } 
}

app.get('/categoryId/:categoryId', async(req,res)=>{
    try{
        const Item = await readbycategory(req.params.categoryId)
        if(Item){
            res.status(200).json({data:{product:Item}})
        }else{
            res.status(400).json({message:"No data found"})
        }
    }catch(error){
        res.status(500).json({error:`Error fetching Category data`})
    }
})

const PORT = 3000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

