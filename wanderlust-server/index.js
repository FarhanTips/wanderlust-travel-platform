import express from "express";
import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config'
import cors from "cors";

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());     // Important: Put app.use(express.json()) before your routes so the middleware can parse the request body before those routes execute.

const client = new MongoClient(process.env.MONGODB_URL);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const connectedClient = await connectToMongoDB();

const db = connectedClient.db("wanderlust");
const destinationCollection = db.collection("destination");


app.get('/', (req, res) => {
  res.send('Working')
})

app.post("/add-destination", async (req, res) => {
  const newData = req.body;
  console.log(newData);

  const result = await destinationCollection.insertOne(newData);
  console.log(result);
  res.send(result);
})

app.get('/destinations', async (req, res) => {
  const result = await destinationCollection.find().toArray();
  res.send(result);
})

app.get('/destination/:id', async (req, res) => {
  const id = req.params.id;
  const result = await destinationCollection.findOne({_id: new ObjectId(id)});
  res.send(result);
})

app.patch('/destination/:id', async (req, res) => {
  const id = req.params.id;
  const result = await destinationCollection.updateOne(
    {_id: new ObjectId(id)},
    {$set: req.body}
  );

  res.send(result);
})

app.delete('/destination/:id', async (req, res) => {
  const id = req.params.id;
  const result = await destinationCollection.deleteOne({_id: new ObjectId(id)});

  res.send(result);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
