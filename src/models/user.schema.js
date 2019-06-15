import mongoose from "mongoose";

const Schema = mongoose.Schema
const schema = new Schema({
  userId: {
    type: String,
    unique: true
  },
  displayName: {
    type: String,
  },
})

export default mongoose.model('user',schema)