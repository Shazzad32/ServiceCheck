const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceCheckSchema = new Schema({
  //   _id: mongoose.Schema.Types.ObjectId,

  device_id: { type: String },
  reg_no: { type: String },
  customer_number: { type: String },
  address: { type: String },
  district: { type: String },
  problems: { type: String },
  is_complete: { type: Boolean, default: false },
});

serviceCheckSchema.index({ reg_no: 1 });

module.exports =
  mongoose.models.ServiceCheck ||
  mongoose.model("ServiceCheck", serviceCheckSchema);
