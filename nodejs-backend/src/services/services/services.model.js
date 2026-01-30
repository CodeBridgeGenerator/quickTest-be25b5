
    module.exports = function (app) {
        const modelName = "services";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            serviceName: { type:  String , comment: "Service Name, p, false, false, false, false, false, false, false, , , , ," },
description: { type:  String , comment: "Description, p, false, false, false, false, false, false, false, , , , ," },
price: { type: Number, comment: "Price, p_number, false, false, false, false, false, false, false, , , , ," },
duration: { type: Number, comment: "Duration, p_number, false, false, false, false, false, false, false, , , , ," },

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