import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema(
  {
    familyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Family', required: true, index: true },
    name: { type: String, required: true, trim: true },
    role: {
      type: String,
      enum: ['parent', 'child', 'guardian', 'guest'],
      default: 'child',
      required: true,
    },
    email: { type: String, trim: true },
    points: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Member = mongoose.model('Member', memberSchema);
