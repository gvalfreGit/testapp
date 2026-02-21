export default function FamilySelector({ families, selectedFamilyId, onSelect, onCreate }) {
  return (
    <section className="card">
      <h2>Famílias</h2>
      <div className="row-wrap">
        <select value={selectedFamilyId || ''} onChange={(e) => onSelect(e.target.value)}>
          <option value="">Selecione uma família</option>
          {families.map((family) => (
            <option key={family._id} value={family._id}>
              {family.name}
            </option>
          ))}
        </select>
        <button onClick={onCreate}>+ Nova família</button>
      </div>
    </section>
  );
}
