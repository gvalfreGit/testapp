import { useState } from 'react';

export default function CalendarPanel({ events, onCreate }) {
  const [form, setForm] = useState({ title: '', startsAt: '', endsAt: '', location: '' });

  const submit = (e) => {
    e.preventDefault();
    onCreate(form);
    setForm({ title: '', startsAt: '', endsAt: '', location: '' });
  };

  return (
    <section className="card">
      <h2>Calendário</h2>
      <ul className="list">
        {events.map((event) => (
          <li key={event._id}>
            <strong>{event.title}</strong>
            <div>{new Date(event.startsAt).toLocaleString('pt-BR')}</div>
          </li>
        ))}
      </ul>

      <form onSubmit={submit} className="form-grid">
        <input
          placeholder="Título"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="datetime-local"
          value={form.startsAt}
          onChange={(e) => setForm({ ...form, startsAt: e.target.value })}
          required
        />
        <input
          type="datetime-local"
          value={form.endsAt}
          onChange={(e) => setForm({ ...form, endsAt: e.target.value })}
          required
        />
        <input
          placeholder="Local"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <button type="submit">Criar evento</button>
      </form>
    </section>
  );
}
