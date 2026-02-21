import { useState } from 'react';

const roles = [
  { value: 'parent', label: 'Pai/Mãe' },
  { value: 'child', label: 'Filho(a)' },
  { value: 'guardian', label: 'Responsável' },
  { value: 'guest', label: 'Convidado' },
];

export default function MembersPanel({ members, onCreate }) {
  const [form, setForm] = useState({ name: '', role: 'child', email: '' });

  const submit = (e) => {
    e.preventDefault();
    onCreate(form);
    setForm({ name: '', role: 'child', email: '' });
  };

  return (
    <section className="card">
      <h2>Membros</h2>
      <ul className="list">
        {members.map((member) => (
          <li key={member._id}>
            <strong>{member.name}</strong> <span className="tag">{member.role}</span>
          </li>
        ))}
      </ul>

      <form onSubmit={submit} className="form-grid">
        <input
          placeholder="Nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          {roles.map((role) => (
            <option key={role.value} value={role.value}>
              {role.label}
            </option>
          ))}
        </select>
        <input
          placeholder="Email (opcional)"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button type="submit">Adicionar membro</button>
      </form>
    </section>
  );
}
