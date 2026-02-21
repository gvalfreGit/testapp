import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    familyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Family', required: true, index: true },
    title: { type: String, required: true, trim: true },
    startsAt: { type: Date, required: true },
    endsAt: { type: Date, required: true },
    location: { type: String, trim: true },
    notes: { type: String, trim: true },
    visibility: { type: String, enum: ['family', 'member'], default: 'family' },
  },
  { timestamps: true }
);

export const Event = mongoose.model('Event', eventSchema);
