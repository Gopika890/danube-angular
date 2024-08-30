const express= require("express");
const { updateBrand, addBrand, deleteBrand, getBrand, getBrands, getBrandById } = require("../handlers/brand-handler");
const router=express.Router();

router.post("",async(req,res)=>{
    console.log("here");
    let model=req.body;
    let result=await addBrand(model);
    res.send(result);
});

router.put("/:id",async(req,res)=>{
    console.log("here");
    let model=req.body;
    let id=req.params["id"];
    await updateBrand(id,model);
    res.send({message:"updated"});
});

router.delete("/:id",async(req,res)=>{
    console.log("here");
    let id=req.params["id"];
    await deleteBrand(id);
    res.send({message:"deleted"});
});

router.get("/:id",async(req,res)=>{
    console.log("here");
    let id=req.params["id"];
    let brand=await getBrandById(id);
    res.send(brand);
});

router.get("",async(req,res)=>{
    console.log("here");
    let brands=await getBrands();
    res.send(brands);
});

module.exports=router;


