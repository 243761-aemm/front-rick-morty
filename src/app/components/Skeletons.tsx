'use client';

export function CharacterCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-[#1a1f2e] border border-white/5 animate-pulse">
      <div className="w-full h-52 bg-white/10" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-white/10 rounded w-3/4" />
        <div className="h-3 bg-white/10 rounded w-1/3" />
        <div className="h-3 bg-white/10 rounded w-1/2" />
        <div className="h-3 bg-white/10 rounded w-2/3" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 20 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <CharacterCardSkeleton key={i} />
      ))}
    </div>
  );
}