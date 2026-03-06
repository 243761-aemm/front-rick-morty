'use client';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      {/* Portal gun glitch icon */}
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
        <div className="relative w-24 h-24 rounded-full bg-[#1a1f2e] border-2 border-green-500/40 flex items-center justify-center">
          <span className="text-4xl">☠️</span>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">
        ¡Dimensión equivocada!
      </h3>
      <p className="text-gray-400 mb-6 max-w-xs">
        {message || 'No se pudo conectar con el Consejo de Ricks. Intenta de nuevo.'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2.5 rounded-xl bg-green-500/20 border border-green-500/40 text-green-300 font-semibold hover:bg-green-500/30 transition-all duration-200"
        >
          Abrir portal de nuevo
        </button>
      )}
    </div>
  );
}
