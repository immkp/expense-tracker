import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import TransactionModel from './models/Transaction.js';
import bodyParser from 'body-parser';

mongoose.set('strictQuery', true);
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/api/test', (req, res) => {
  res.json('success')
})

app.post('/api/transaction', async(req, res) => {
 await mongoose.connect(process.env.MONGO_URL)
 console.log(req.body)
 const {name,description,datetime,price} = req.body;
 const transaction = await TransactionModel.create({name,description,datetime,price})
  res.json(transaction)
});

app.get('/api/transactions',async(req,res)=>{
 await mongoose.connect(process.env.MONGO_URL)
  const transactions = await TransactionModel.find()
  res.json(transactions)

})

if (process.env.API_PORT) app.listen(process.env.API_PORT)

export default  app;
