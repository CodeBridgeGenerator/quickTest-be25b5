
    module.exports = function (app) {
        const modelName = "invoices";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            customerId: { type: Number, comment: "Customer ID, p_number, false, false, false, false, false, false, false, , , , ," },
vehicleId: { type: Number, comment: "Vehicle ID, p_number, false, false, false, false, false, false, false, , , , ," },
serviceDate: { type: Number, comment: "Service Date, p_number, false, false, false, false, false, false, false, , , , ," },
totalAmount: { type: Number, comment: "Total Amount, p_number, false, false, false, false, false, false, false, , , , ," },
paymentStatus: { type:  String , comment: "Payment Status, p, false, false, false, false, false, false, false, , , , ," },
paymentMethod: { type:  String , comment: "Payment Method, p, false, false, false, false, false, false, false, , , , ," },
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