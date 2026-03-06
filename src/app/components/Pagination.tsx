'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | '...')[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push('...');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm disabled:opacity-30 hover:bg-white/10 transition-all"
      >
        ← Anterior
      </button>

      <div className="flex gap-1">
        {pages.map((page, i) =>
          page === '...' ? (
            <span key={`dots-${i}`} className="px-2 py-2 text-gray-600 text-sm">…</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${
                currentPage === page
                  ? 'bg-green-500/30 border border-green-500/50 text-green-300'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm disabled:opacity-30 hover:bg-white/10 transition-all"
      >
        Siguiente →
      </button>
    </div>
  );
}
