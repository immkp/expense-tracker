import { Schema,model } from "mongoose";

const TransactionSchema = new Schema({
  name: { type: String},
  price: { type: Number},
  description: { type: String, required: true },
  datetime: { type: Date, required: true },
})

const TransactionModel = model('Transaction',TransactionSchema)

export default TransactionModel;

// module.exports = TransactionModel;