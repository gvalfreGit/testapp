import { useEffect, useState } from 'react';
import { api } from './services/api';
import FamilySelector from './components/FamilySelector';
import MembersPanel from './pages/MembersPanel';
import CalendarPanel from './pages/CalendarPanel';
import TasksPanel from './pages/TasksPanel';

export default function App() {
  const [families, setFamilies] = useState([]);
  const [selectedFamilyId, setSelectedFamilyId] = useState('');
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  const refreshFamilies = async () => {
    try {
      setFamilies(await api.getFamilies());
    } catch (err) {
      setError(err.message);
    }
  };

  const refreshFamilyData = async (familyId) => {
    if (!familyId) return;
    try {
      const [membersResult, eventsResult, tasksResult] = await Promise.all([
        api.getMembers(familyId),
        api.getEvents(familyId),
        api.getTasks(familyId),
      ]);
      setMembers(membersResult);
      setEvents(eventsResult);
      setTasks(tasksResult);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    refreshFamilies();
  }, []);

  useEffect(() => {
    refreshFamilyData(selectedFamilyId);
  }, [selectedFamilyId]);

  const createFamily = async () => {
    const name = prompt('Nome da família:');
    if (!name) return;
    const family = await api.createFamily({ name });
    await refreshFamilies();
    setSelectedFamilyId(family._id);
  };

  const createMember = async (payload) => {
    await api.createMember(selectedFamilyId, payload);
    await refreshFamilyData(selectedFamilyId);
  };

  const createEvent = async (payload) => {
    await api.createEvent(selectedFamilyId, payload);
    await refreshFamilyData(selectedFamilyId);
  };

  const createTask = async (payload) => {
    await api.createTask(selectedFamilyId, payload);
    await refreshFamilyData(selectedFamilyId);
  };

  const updateTaskStatus = async (taskId, status) => {
    await api.updateTaskStatus(taskId, status);
    await refreshFamilyData(selectedFamilyId);
  };

  return (
    <main className="container">
      <header>
        <h1>FamilyHub</h1>
        <p>React + MongoDB | Gestão familiar responsiva</p>
      </header>

      {error && <p className="error">{error}</p>}

      <FamilySelector
        families={families}
        selectedFamilyId={selectedFamilyId}
        onSelect={setSelectedFamilyId}
        onCreate={createFamily}
      />

      {selectedFamilyId && (
        <div className="grid">
          <MembersPanel members={members} onCreate={createMember} />
          <CalendarPanel events={events} onCreate={createEvent} />
          <TasksPanel tasks={tasks} onCreate={createTask} onUpdateStatus={updateTaskStatus} />
        </div>
      )}
    </main>
  );
}
