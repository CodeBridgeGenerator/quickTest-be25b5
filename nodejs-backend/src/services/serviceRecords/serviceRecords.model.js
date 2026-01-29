
    module.exports = function (app) {
        const modelName = "service_records";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            invoiceId: { type: Number, comment: "Invoice ID, p_number, false, false, false, false, false, false, false, , , , ," },
serviceId: { type: Number, comment: "Service ID, p_number, false, false, false, false, false, false, false, , , , ," },
vehicleId: { type: Number, comment: "Vehicle ID, p_number, false, false, false, false, false, false, false, , , , ," },
technicianId: { type: Number, comment: "Technician ID, p_number, false, false, false, false, false, false, false, , , , ," },
serviceDate: { type: Number, comment: "Service Date, p_number, false, false, false, false, false, false, false, , , , ," },

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