"use client";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function SearchBar({
  search,
  setSearch,
}: SearchBarProps) {
  return (
    <div className="mb-8">

      <input
        type="text"
        placeholder="🔍 Search Student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full
          bg-zinc-900
          border
          border-zinc-700
          rounded-xl
          p-4
          text-white
          outline-none
          focus:border-yellow-400
          transition
        "
      />

    </div>
  );
}