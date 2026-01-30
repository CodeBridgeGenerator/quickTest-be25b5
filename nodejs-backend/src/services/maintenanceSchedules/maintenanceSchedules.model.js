
    module.exports = function (app) {
        const modelName = "maintenance_schedules";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            vehicleId: { type: Number, comment: "Vehicle ID, p_number, false, false, false, false, false, false, false, , , , ," },
serviceId: { type: Number, comment: "Service ID, p_number, false, false, false, false, false, false, false, , , , ," },
nextServiceDate: { type: Number, comment: "Next Service Date, p_number, false, false, false, false, false, false, false, , , , ," },
notes: { type:  String , comment: "Notes, p, false, false, false, false, false, false, false, , , , ," },

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