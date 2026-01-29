
    module.exports = function (app) {
        const modelName = "technicians";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            firstName: { type:  String , comment: "First Name, p, false, false, false, false, false, false, false, , , , ," },
lastName: { type:  String , comment: "Last Name, p, false, false, false, false, false, false, false, , , , ," },
email: { type:  String , comment: "Email, p, false, false, false, false, false, false, false, , , , ," },
phoneNumber: { type:  String , comment: "Phone Number, p, false, false, false, false, false, false, false, , , , ," },
specialization: { type:  String , comment: "Specialization, p, false, false, false, false, false, false, false, , , , ," },

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