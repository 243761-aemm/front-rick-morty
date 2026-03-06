'use client';
import Image from 'next/image';
import { useEffect } from 'react';
import type { Character } from '../services/types';
import StatusBadge from './StatusBadge';

interface CharacterModalProps {
  character: Character | null;
  onClose: () => void;
}

export default function CharacterModal({ character, onClose }: CharacterModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!character) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#141923] border border-green-500/20 rounded-3xl overflow-hidden shadow-2xl shadow-green-500/10 animate-in"
        onClick={e => e.stopPropagation()}
      >
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
        >
          ✕
        </button>

        
        <div className="relative h-64 w-full">
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="object-cover"
            sizes="448px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141923] via-[#141923]/40 to-transparent" />
        </div>

        
        <div className="px-6 pb-6 -mt-8 relative space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{character.name}</h2>
            <StatusBadge status={character.status} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Especie',  value: character.species },
              { label: 'Género',   value: character.gender },
              { label: 'Tipo',     value: character.type || 'N/A' },
              { label: 'Origen',   value: character.origin.name },
              { label: 'Ubicación actual', value: character.location.name },
              { label: 'Episodios', value: `${character.episode.length} apariciones` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/5 rounded-xl p-3">
                <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                <p className="text-sm text-white font-medium line-clamp-2">{value}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-600 font-mono text-center">
            ID #{character.id} · Creado: {new Date(character.created).toLocaleDateString('es-MX')}
          </p>
        </div>
      </div>
    </div>
  );
}
