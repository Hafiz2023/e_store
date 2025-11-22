import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import UserModel from "@/app/models/User.models";

dotenv.config();

async function hashOldPasswords() {
  await mongoose.connect(process.env.MONGODB_URI!);
  const users = await UserModel.find().select("+password");

  for (const user of users) {
    if (!user.password.startsWith("$2a$")) {
      console.log(`🔄 Hashing password for ${user.email}...`);
      user.password = await bcrypt.hash(user.password, 10);
      await user.save();
      console.log(`✅ Updated ${user.email}`);
    } else {
      console.log(`⏭ Already hashed: ${user.email}`);
    }
  }

  console.log("🎉 Done! All passwords hashed.");
  process.exit(0);
}

hashOldPasswords().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
