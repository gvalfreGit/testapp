import { Member } from '../models/Member.js';

export async function listMembers(req, res) {
  const members = await Member.find({ familyId: req.params.familyId }).sort({ createdAt: -1 });
  res.json(members);
}

export async function createMember(req, res) {
  const member = await Member.create({
    familyId: req.params.familyId,
    name: req.body.name,
    role: req.body.role,
    email: req.body.email,
  });

  res.status(201).json(member);
}
