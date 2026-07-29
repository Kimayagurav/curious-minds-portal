"use client";

interface FilterTabsProps {
  std: string;
  batch: string;
  setStd: (value: string) => void;
  setBatch: (value: string) => void;
}

export default function FilterTabs({
  std,
  batch,
  setStd,
  setBatch,
}: FilterTabsProps) {
  return (
    <div className="space-y-6 mb-8">

      {/* STD */}

      <div>
        <h3 className="text-lg font-semibold text-yellow-400 mb-3">
          Standard
        </h3>

        <div className="flex gap-3">

          {["11th", "12th"].map((item) => (
            <button
              key={item}
              onClick={() => setStd(item)}
              className={`px-6 py-2 rounded-xl font-semibold transition
                ${
                  std === item
                    ? "bg-yellow-400 text-black"
                    : "bg-zinc-900 border border-zinc-700 hover:border-yellow-400"
                }`}
            >
              {item}
            </button>
          ))}

        </div>
      </div>

      {/* Batch */}

      <div>
        <h3 className="text-lg font-semibold text-yellow-400 mb-3">
          Batch
        </h3>

        <div className="flex gap-3 flex-wrap">

          {["JEE", "NEET", "MHTCET"].map((item) => (
            <button
              key={item}
              onClick={() => setBatch(item)}
              className={`px-6 py-2 rounded-xl font-semibold transition
                ${
                  batch === item
                    ? "bg-yellow-400 text-black"
                    : "bg-zinc-900 border border-zinc-700 hover:border-yellow-400"
                }`}
            >
              {item}
            </button>
          ))}

        </div>
      </div>

    </div>
  );
}