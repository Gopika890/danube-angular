// creating routes for customers
const express= require("express");
const { getNewProducts, getFeaturedProducts, getProductForListing, getProduct, } = require("../handlers/product-handler");
const { getCategories } = require("../handlers/category-handler");
const { getBrands } = require("../handlers/brand-handler");
const { getCartItems, addToCart, removeFromCart, clearCart } = require("../handlers/shopping-cart-handler");
const{addOrder,getCustomerOrder}=require("./../handlers/order-handler");
const router=express.Router()


router.get("/new-products",async(req,res)=>{
    const products=await getNewProducts();
    res.send(products);
});

router.get("/featured-products",async(req,res)=>{
    const products=await getFeaturedProducts();
    res.send(products);
});

//Api for customer to get all the products without portction

router.get("/categories",async(req,res)=>{
    const categories=await getCategories();
    res.send(categories);
});
router.get("/brands",async(req,res)=>{
    const brands=await getBrands();
    res.send(brands);
});


router.get("/products",async(req,res)=>{
    const{searchTerm,categoryId,sortBy,sortOrder,brandId,pageSize,page}=req.query;
    const products=await getProductForListing(searchTerm,categoryId,page,pageSize,sortBy,sortOrder,brandId,);
    res.send(products);
});

router.get("/product/:id" ,async(req,res)=>{
    const id = req.params["id"];
    const product=await getProduct(id);
    res.send(product);
});

router.get("/carts",async(req,res)=>{
    console.log(req.user);
    const userId=req.user.id;
    const items= await getCartItems(userId);
    res.send(items);
});

router.post("/carts/:productId",async(req,res)=>{
    console.log(req.user);
    const userId=req.user.id;
    const productId=req.params.productId;
    const quantity=req.body.quantity;
    const items= await addToCart(userId,productId,quantity);
    res.send(items);
});

router.delete("/carts/:productId",async(req,res)=>{
    console.log(req.user);
    const userId=req.user.id;
    const productId=req.params.productId;
    const items= await removeFromCart(userId,productId);
    res.send({message:"item removed from cart"});
});

router.post("/order" ,async(req,res)=>{
    const userId=req.user.id;
    const order=req.body;
    await addOrder(userId,order);
    await clearCart(userId);
    return res.send({
        message:"Order created"
    });

})






module.exports=router;