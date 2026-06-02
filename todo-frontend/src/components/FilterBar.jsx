export default function FilterBar({ filter, onFilterChange, total, completed }) {
  return (
    <div>

      <div className="stats-bar">
        <div className="stat-box">
          <div className="stat-number">{total}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">{completed}</div>
          <div className="stat-label">Done</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">{total - completed}</div>
          <div className="stat-label">Remaining</div>
        </div>
      </div>

      <div className="filter-bar">
        {['all', 'active', 'completed'].map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => onFilterChange(f)}
          >
            {f}
          </button>
        ))}
      </div>

    </div>
  )
}