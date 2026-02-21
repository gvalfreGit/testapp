import { useState } from 'react';

export default function TasksPanel({ tasks, onCreate, onUpdateStatus }) {
  const [form, setForm] = useState({ title: '', priority: 'medium' });

  const submit = (e) => {
    e.preventDefault();
    onCreate(form);
    setForm({ title: '', priority: 'medium' });
  };

  return (
    <section className="card">
      <h2>Tarefas</h2>
      <ul className="list">
        {tasks.map((task) => (
          <li key={task._id} className="task-row">
            <div>
              <strong>{task.title}</strong>
              <div className="tag">{task.priority}</div>
            </div>
            <select value={task.status} onChange={(e) => onUpdateStatus(task._id, e.target.value)}>
              <option value="todo">A fazer</option>
              <option value="doing">Em andamento</option>
              <option value="done">Concluída</option>
            </select>
          </li>
        ))}
      </ul>

      <form onSubmit={submit} className="form-grid">
        <input
          placeholder="Título da tarefa"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <select
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option value="low">Baixa</option>
          <option value="medium">Média</option>
          <option value="high">Alta</option>
        </select>
        <button type="submit">Criar tarefa</button>
      </form>
    </section>
  );
}
