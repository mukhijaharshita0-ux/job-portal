import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  city: {
    type: String
  }
 },
  { timestamps: true });

const profile = mongoose.model('Profile', profileSchema);
export default profile;