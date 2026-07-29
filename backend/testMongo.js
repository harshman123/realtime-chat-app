const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://keshari321harsh:vishal123@cluster0.g5apwpl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function test() {
  try {
    const client = new MongoClient(uri);

    await client.connect();

    console.log("✅ Connected successfully");

    await client.close();
  } catch (err) {
    console.error(err);
  }
}

test();