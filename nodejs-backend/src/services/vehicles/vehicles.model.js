
    module.exports = function (app) {
        const modelName = "vehicles";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            customerId: { type: Number, comment: "Customer ID, p_number, false, false, false, false, false, false, false, , , , ," },
make: { type:  String , comment: "Make, p, false, false, false, false, false, false, false, , , , ," },
model: { type:  String , comment: "Model, p, false, false, false, false, false, false, false, , , , ," },
year: { type: Number, comment: "Year, p_number, false, false, false, false, false, false, false, , , , ," },
licensePlate: { type:  String , comment: "License Plate, p, false, false, false, false, false, false, false, , , , ," },
vin: { type:  String , comment: "VIN, p, false, false, false, false, false, false, false, , , , ," },

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