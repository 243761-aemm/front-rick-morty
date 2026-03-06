'use client';
import Image from 'next/image';
import { useState } from 'react';
import type { Character } from '../services/types';
import StatusBadge from './StatusBadge';

interface CharacterCardProps {
  character: Character;
  onClick?: (character: Character) => void;
}

export default function CharacterCard({ character, onClick }: CharacterCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onClick={() => onClick?.(character)}
      className="group cursor-pointer rounded-2xl overflow-hidden bg-[#1a1f2e] border border-white/5 hover:border-green-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-green-500/10"
    >
      
      <div className="relative w-full h-52 overflow-hidden bg-[#0d1117]">
        {!imgError ? (
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">👾</div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f2e] via-transparent to-transparent" />
      </div>

      
      <div className="p-4 space-y-2">
        <h3 className="font-bold text-white text-sm leading-tight line-clamp-1 group-hover:text-green-300 transition-colors">
          {character.name}
        </h3>
        <StatusBadge status={character.status} />
        <div className="text-xs text-gray-500 space-y-0.5 pt-1">
          <p><span className="text-gray-600">Especie:</span> {character.species}</p>
          <p className="line-clamp-1"><span className="text-gray-600">Ubicación:</span> {character.location.name}</p>
        </div>
        <p className="text-xs text-green-500/60 font-mono">#{character.id}</p>
      </div>
    </div>
  );
}
