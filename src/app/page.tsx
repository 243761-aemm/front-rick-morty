'use client';
import { useState, useEffect, useCallback } from 'react';
import type { Character, CharactersResponse, CharacterFilters } from './services/types';
import { getCharacters } from './services/api';
import CharacterCard from './components/CharacterCard';
import CharacterModal from './components/CharacterModal';
import FiltersPanel from './components/FiltersPanel';
import Pagination from './components/Pagination';
import ErrorState from './components/ErrorState';
import { SkeletonGrid } from './components/Skeletons';

type UIState = 'loading' | 'success' | 'error';

export default function HomePage() {
  const [uiState, setUiState] = useState<UIState>('loading');
  const [data, setData] = useState<CharactersResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [filters, setFilters] = useState<CharacterFilters>({ page: 1 });
  const [selected, setSelected] = useState<Character | null>(null);

  const fetchCharacters = useCallback(async (currentFilters: CharacterFilters) => {
    setUiState('loading');
    setErrorMsg('');
    try {
      const result = await getCharacters(currentFilters);
      setData(result);
      setUiState('success');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error desconocido';
      setErrorMsg(msg);
      setUiState('error');
    }
  }, []);

  useEffect(() => {
    fetchCharacters(filters);
  }, [filters, fetchCharacters]);

  const handleFilterChange = (newFilters: CharacterFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#0d1117]">
      
      <header className="relative overflow-hidden border-b border-white/5">
        {/* Animated portal bg */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-green-500/5 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-2xl animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            SOA · Rick and Morty API
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white tracking-tight">
            <span className="text-green-400">Rick</span> & <span className="text-cyan-400">Morty</span>
          </h1>
          <p className="mt-3 text-gray-400 text-lg max-w-lg">
            Explora el multiverso. {data?.info.count ?? '...'} personajes conocidos del Consejo de Ricks.
          </p>
        </div>
      </header>

      
      <div className="max-w-7xl mx-auto px-4 py-5 border-b border-white/5">
        <FiltersPanel filters={filters} onChange={handleFilterChange} />
      </div>

      
      <div className="max-w-7xl mx-auto px-4 py-8">

        
        {uiState === 'loading' && <SkeletonGrid count={20} />}

        
        {uiState === 'error' && (
          <ErrorState
            message={errorMsg}
            onRetry={() => fetchCharacters(filters)}
          />
        )}

        
        {uiState === 'success' && data && (
          <>
            
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                Mostrando{' '}
                <span className="text-white font-semibold">{data.results.length}</span>
                {' '}de{' '}
                <span className="text-white font-semibold">{data.info.count}</span>
                {' '}personajes — Página{' '}
                <span className="text-green-400 font-semibold">{filters.page}</span>
                {' '}de{' '}
                <span className="text-white font-semibold">{data.info.pages}</span>
              </p>
            </div>

            
            {data.results.length === 0 ? (
              <ErrorState message="No se encontraron personajes con esos filtros." onRetry={() => handleFilterChange({ page: 1 })} />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {data.results.map(character => (
                  <CharacterCard
                    key={character.id}
                    character={character}
                    onClick={setSelected}
                  />
                ))}
              </div>
            )}

            
            <Pagination
              currentPage={filters.page ?? 1}
              totalPages={data.info.pages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>

      
      <CharacterModal character={selected} onClose={() => setSelected(null)} />

      
      <footer className="border-t border-white/5 py-6 text-center text-xs text-gray-600 font-mono">
        SOA Project · Universidad Politécnica de Chiapas · Frontend → Backend (port 4000) → Rick &amp; Morty API
      </footer>
    </main>
  );
}
