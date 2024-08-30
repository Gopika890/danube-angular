const { ModuleDetectionKind } = require("typescript");
const Order=require("./../db/order");
const { clearCart } = require("./shopping-cart-handler");

async function addOrder(userId,orderModel){
    let order=new Order({
        ...orderModel,
        userId:userId,
        status:"In Progress",
    });
    await order.save();
    

}

async function getCustomerOrder(userId){
    let orders = await Order.find({userId:userId});
    return orders.map((x)=>x.toObject());
}

module.exports={addOrder,getCustomerOrder}