
    module.exports = function (app) {
        const modelName = "oil_change_records";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            vehicleId: { type: Number, comment: "Vehicle ID, p_number, false, false, false, false, false, false, false, , , , ," },
serviceRecordId: { type: Number, comment: "Service Record ID, p_number, false, false, false, false, false, false, false, , , , ," },
oilType: { type:  String , comment: "Oil Type, p, false, false, false, false, false, false, false, , , , ," },
mileage: { type: Number, comment: "Mileage, p_number, false, false, false, false, false, false, false, , , , ," },
technicianId: { type: Number, comment: "Technician ID, p_number, false, false, false, false, false, false, false, , , , ," },
dateOfChange: { type: Number, comment: "Date Of Change, p_number, false, false, false, false, false, false, false, , , , ," },

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