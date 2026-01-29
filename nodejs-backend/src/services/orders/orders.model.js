
    module.exports = function (app) {
        const modelName = "orders";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            name: { type:  String , comment: "Name, p, false, true, true, true, true, true, true, , , , ," },
products: { type: [Schema.Types.ObjectId], ref: "products", description: "isArray", comment: "Products, multiselect, false, true, true, true, true, true, true, products, products, one-to-many, name:sku," },

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