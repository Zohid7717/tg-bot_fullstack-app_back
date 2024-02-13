import mongoose from "mongoose"

const TgSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    number: {
      type: Number,
      required: true
    }
  },
  {timestamps: true}
)

export default mongoose.model('TgMessage', TgSchema)