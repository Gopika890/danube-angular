const Brand=require("./../db/brand");
const mongoose = require('mongoose');


async function getBrands(){
    let brands=await Brand.find();
    return brands.map((x)=>x.toObject());
}

// async function getBrandById(id){
//     let brand=await Brand.findById(id);
//     return brand.toObject();
// }
async function getBrandById(id) {
    if (!id) {
      throw new Error('Brand ID is required');
    }
    
    try {
      let brand = await Brand.findById(id);
      if (!brand) {
        throw new Error('Brand not found');
      }
      return brand.toObject();
    } catch (error) {
      console.error('Error in getBrand:', error);
      throw error;
    }
  }

// async function getBrand(id) {
//     // Check if the id is provided and is a valid ObjectId
//     if (!id) {
//         throw new Error("ID is required.");
//     }
    
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         throw new Error("Invalid ID format.");
//     }

//     let brand = await Brand.findById(id);

//     // Check if brand was found
//     if (!brand) {
//         throw new Error("Brand not found.");
//     }

//     return brand.toObject();
// }

async function addBrand(model){     //create a new schema model as we r adding new brands
    let brand=new Brand({
        name:model.name,
    });
    await brand.save();
    return brand.toObject();
}

async function updateBrand(id,model){
     await Brand.findByIdAndUpdate({_id:id},model);

}
async function deleteBrand(id){
    await Brand.findByIdAndDelete(id);
}

module.exports={getBrands,getBrandById,updateBrand,addBrand,deleteBrand};