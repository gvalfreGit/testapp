import { Family } from '../models/Family.js';

export async function listFamilies(_req, res) {
  const families = await Family.find().sort({ createdAt: -1 });
  res.json(families);
}

export async function createFamily(req, res) {
  const family = await Family.create({
    name: req.body.name,
    description: req.body.description,
  });

  res.status(201).json(family);
}
