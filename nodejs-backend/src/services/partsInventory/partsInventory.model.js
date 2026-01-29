
    module.exports = function (app) {
        const modelName = "parts_inventory";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            partName: { type:  String , comment: "Part Name, p, false, false, false, false, false, false, false, , , , ," },
description: { type:  String , comment: "Description, p, false, false, false, false, false, false, false, , , , ," },
quantityInStock: { type: Number, comment: "Quantity In Stock, p_number, false, false, false, false, false, false, false, , , , ," },
price: { type: Number, comment: "Price, p_number, false, false, false, false, false, false, false, , , , ," },
supplierId: { type: Number, comment: "Supplier ID, p_number, false, false, false, false, false, false, false, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };