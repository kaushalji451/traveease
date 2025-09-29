import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId : {
        type : String,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    }
});

export default mongoose.model("User",userSchema);