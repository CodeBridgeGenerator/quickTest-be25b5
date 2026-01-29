
    module.exports = function (app) {
        const modelName = "suppliers";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            supplierName: { type:  String , comment: "Supplier Name, p, false, false, false, false, false, false, false, , , , ," },
contactPerson: { type:  String , comment: "Contact Person, p, false, false, false, false, false, false, false, , , , ," },
phoneNumber: { type:  String , comment: "Phone Number, p, false, false, false, false, false, false, false, , , , ," },
email: { type:  String , comment: "Email, p, false, false, false, false, false, false, false, , , , ," },
address: { type:  String , comment: "Address, p, false, false, false, false, false, false, false, , , , ," },

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