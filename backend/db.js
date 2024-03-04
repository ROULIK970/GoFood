const mongoose = require("mongoose");
require("dotenv").config();

//  const fs = require("fs");
//  const { MongoClient } = require("mongodb");
const mongoURI = process.env.MONGO_ATLAS_URL;

async function mongoDB() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB!");

    //  const data1 = fs.readFileSync(
    //    "C:/Users/Pritish/Downloads/foodData2.json",
    //    "utf8"
    //  );
    //  const jsonData = JSON.parse(data1);
    //  const client = await MongoClient.connect(mongoURI);

    //  const db = client.db("gofoodmern");
    //  const collection = db.collection("food_items");
    //  // Insert JSON data into the collection
    //  await collection.insertMany(jsonData);
    //  client.close();

    const fetched_data = await mongoose.connection.db.collection("food_items");
    const foodCategory = await mongoose.connection.db.collection("foodCategory");

    const data = await fetched_data.find({}).toArray();
    const catData = await foodCategory.find({}).toArray();
    global.food_items = data;
    global.foodCategory = catData;
  } catch (error) {
    console.error("Connection failed:", error);
  }
}

module.exports = mongoDB;
