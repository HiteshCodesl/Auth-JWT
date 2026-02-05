import mongoose, { Schema } from "mongoose"

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String
})

export const UserModel = mongoose.models.user || mongoose.model("user", UserSchema);