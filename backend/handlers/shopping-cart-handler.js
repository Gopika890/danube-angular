const Cart = require("./../db/cart");

async function addToCart(userId,productId,quantity){
    let product= await Cart.findOne({userId:userId,productsId:productId});
    if(product){
        if(product.quantity+quantity <=0){
            await removeFromCart(userId,productId);
        }else{
            await Cart.findByIdAndUpdate(product._id,{
                quantity:product.quantity + quantity,
            });
            
        }
        }else{
        product=new Cart({
            userId:userId,
            productsId:productId,
            quantity:quantity,
        });
        await product.save();

    }
    return product;

}

async function removeFromCart(userId,productId){
     await Cart.findOneAndDelete({userId:userId , productsId:productId});

}

async function getCartItems(userId){
    const products = await Cart.find({userId:userId}).populate("productsId");
    return products.map((x)=>{
        return {quantity:x.quantity,product:x.productsId}

    });
}

async function clearCart(userId){
    await Cart.deleteMany({
        userId:userId,
    });
}

module.exports={addToCart,removeFromCart,getCartItems,clearCart}


