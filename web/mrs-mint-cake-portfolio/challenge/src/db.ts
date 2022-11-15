import { ObjectId, MongoClient } from "https://deno.land/x/mongo@v0.31.1/mod.ts";

interface User {
    _id: ObjectId;
    username: string;
    password: string;
}

const mongoUri = Deno.env.get("MONGO_URI");
const adminUsername = Deno.env.get("ADMIN_USERNAME");
if (!adminUsername) {
    throw new Error("ADMIN_USERNAME is not set");
}

const bytes = new Uint8Array(32);
crypto.getRandomValues(bytes);

const letters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]()!@#$%^&*";
let adminPassword = "";
for (let i = 0; i < bytes.length; i++) {
    adminPassword += letters[bytes[i] % letters.length];
}

console.log("Admin username: ", adminUsername);
console.log("Admin password: ", adminPassword);

const client = new MongoClient();
while (true) {
    try {
        await client.connect(mongoUri);
        break;
    } catch (e) {
        console.log("Error connecting to MongoDB, retrying in 5 seconds...");
        await new Promise((resolve) => setTimeout(resolve, 5000));
        continue;
    }
}

const db = client.database("production");
const users = db.collection<User>("users");

await (async () => {
    await users.deleteMany({ username: adminUsername });
    await createUser(adminUsername, adminPassword);
})();

export function getUser(username: string, password: string) {
    return users.findOne({ username, password });
}

function createUser(username: string, password: string) {
    return users.insertOne({ username, password });
}