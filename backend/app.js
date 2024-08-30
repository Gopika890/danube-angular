const expores = require("express");
const mongoose = require("mongoose");
const app = expores();
const port = 3000;
const cors=require("cors");


const categoryRoutes=require("./routes/category");
const brandRoutes=require("./routes/brand");
const productRoutes=require("./routes/product");
const customerRoutes=require("./routes/customer");
const authRoutes=require("./routes/auth");
const { verifyToken, isAdmin } = require("./middlewear/auth-middlewear");


app.use(cors());
app.use(expores.json());


app.get("/",(req,res)=>{
    res.send("Server is running");
});


// registering all the routes after creating:
app.use("/category",verifyToken,isAdmin,categoryRoutes);
app.use("/brand",verifyToken,isAdmin,brandRoutes);
app.use("/product",verifyToken,isAdmin,productRoutes);
app.use("/customer",verifyToken,customerRoutes);
app.use("/auth",authRoutes);


async function connectDb(){
     await mongoose.connect("mongodb://localhost:27017",{
        dbName:"FINALPROJECT-ECOMMERCE-db",

     });
     console.log("mongodb is connected");

}
connectDb().catch((err)=>{
    console.error(err);

})
app.listen(port,()=>{
    console.log("Server running on port,3000",port);
});

