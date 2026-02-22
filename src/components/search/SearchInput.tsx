import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative">
      <Search className="absolute start-4 top-1/2 size-5 -translate-y-1/2 text-white/40" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
        placeholder="يوفّر النظام أداة متقدمة للبحث في كافة بيانات وتفاصيل الاجتماعات..."
        className="h-12 w-full rounded-xl border border-white/10 bg-white/5 pe-4 ps-12 text-sm text-white placeholder:text-white/40 focus:border-white/20 focus:outline-none"
      />
    </div>
  );
}

export { SearchInput };
