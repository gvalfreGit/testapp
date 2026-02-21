import mongoose from 'mongoose';

const familySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

export const Family = mongoose.model('Family', familySchema);
