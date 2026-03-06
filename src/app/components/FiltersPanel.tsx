'use client';
import { useState } from 'react';
import type { CharacterFilters } from '../services/types';

interface FiltersPanelProps {
  filters: CharacterFilters;
  onChange: (filters: CharacterFilters) => void;
}

export default function FiltersPanel({ filters, onChange }: FiltersPanelProps) {
  const [name, setName] = useState(filters.name || '');

  const handleSearch = () => {
    onChange({ ...filters, name, page: 1 });
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleStatus = (status: string) => {
    onChange({ ...filters, status: filters.status === status ? '' : status, page: 1 });
  };

  const handleClear = () => {
    setName('');
    onChange({ page: 1 });
  };

  const statuses = ['Alive', 'Dead', 'unknown'];
  const statusLabels: Record<string, string> = { Alive: 'Vivo', Dead: 'Muerto', unknown: 'Desconocido' };

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      {/* Search input */}
      <div className="relative flex-1 max-w-sm">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">🔍</span>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Buscar personaje..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-green-500/50 transition-colors"
        />
      </div>

      <button
        onClick={handleSearch}
        className="px-4 py-2.5 rounded-xl bg-green-500/20 border border-green-500/30 text-green-300 text-sm font-semibold hover:bg-green-500/30 transition-all"
      >
        Buscar
      </button>

      
      <div className="flex gap-2 flex-wrap">
        {statuses.map(s => (
          <button
            key={s}
            onClick={() => handleStatus(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              filters.status === s
                ? 'bg-green-500/30 border-green-500/50 text-green-300'
                : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
            }`}
          >
            {statusLabels[s]}
          </button>
        ))}
      </div>

      
      {(filters.name || filters.status) && (
        <button
          onClick={handleClear}
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors underline underline-offset-2"
        >
          Limpiar
        </button>
      )}
    </div>
  );
}
