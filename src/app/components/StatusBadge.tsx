'use client';
import type { CharacterStatus } from '../services/types';

interface StatusBadgeProps {
  status: CharacterStatus;
}

const statusConfig: Record<CharacterStatus, { label: string; dot: string; bg: string; text: string }> = {
  Alive:   { label: 'Vivo',     dot: 'bg-green-400',  bg: 'bg-green-400/10',  text: 'text-green-300' },
  Dead:    { label: 'Muerto',   dot: 'bg-red-400',    bg: 'bg-red-400/10',    text: 'text-red-300'   },
  unknown: { label: 'Desconocido', dot: 'bg-gray-400', bg: 'bg-gray-400/10', text: 'text-gray-400'  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const cfg = statusConfig[status] ?? statusConfig['unknown'];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} animate-pulse`} />
      {cfg.label}
    </span>
  );
}
