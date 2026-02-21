import { Event } from '../models/Event.js';

export async function listEvents(req, res) {
  const events = await Event.find({ familyId: req.params.familyId }).sort({ startsAt: 1 });
  res.json(events);
}

export async function createEvent(req, res) {
  const event = await Event.create({
    familyId: req.params.familyId,
    title: req.body.title,
    startsAt: req.body.startsAt,
    endsAt: req.body.endsAt,
    location: req.body.location,
    notes: req.body.notes,
    visibility: req.body.visibility,
  });

  res.status(201).json(event);
}
