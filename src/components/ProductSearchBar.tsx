import { Search } from "lucide-react";

export default function ProductSearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center w-full max-w-xl bg-[var(--card)] rounded-full px-4 py-2 shadow-md border border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)] transition-all font-sans" style={{fontFamily:'Poppins'}}>
      <Search className="w-5 h-5 text-[var(--primary)] mr-2" />
      <input
        type="text"
        className="flex-1 bg-transparent outline-none border-0 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] text-base font-medium"
        placeholder="Search handmade art, artists, or tags..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}
