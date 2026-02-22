import { useMemo } from "react";
import { Search } from "lucide-react";
import { MOCK_SEARCH_RESULTS } from "@/data/mock-search";

interface SearchResultsProps {
  query: string;
}

function SearchResults({ query }: SearchResultsProps) {
  const filteredResults = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return MOCK_SEARCH_RESULTS;
    return MOCK_SEARCH_RESULTS.filter(
      (result) =>
        result.title.includes(trimmed) ||
        result.category.includes(trimmed),
    );
  }, [query]);

  return (
    <div className="scrollbar-hide min-h-0 flex-1 space-y-2 overflow-y-auto">
      {filteredResults.length > 0 ? (
        filteredResults.map((result) => (
          <button
            key={result.id}
            className="flex w-full items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-start transition-colors hover:bg-white/10"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white">{result.title}</p>
              <p className="mt-0.5 text-xs text-white/40">{result.category}</p>
            </div>
            <Search className="size-4 shrink-0 text-white/30" />
          </button>
        ))
      ) : (
        <p className="py-8 text-center text-sm text-white/40">
          لا توجد نتائج للبحث
        </p>
      )}
    </div>
  );
}

export { SearchResults };
