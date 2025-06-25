import React from "react";

const categories = ["Painting", "Sculpture", "Textile", "Jewelry", "Decor", "Other"];
const locations = ["Delhi", "Mumbai", "Bangalore", "Kolkata", "Chennai", "All India"];

export default function FilterSidebar({
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  priceRange,
  setPriceRange
}: {
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  selectedLocation: string;
  setSelectedLocation: (l: string) => void;
  priceRange: [number, number];
  setPriceRange: (r: [number, number]) => void;
}) {
  return (
    <aside className="w-full md:w-64 bg-[var(--card)] rounded-2xl shadow-md p-6 flex flex-col gap-8 font-sans" style={{fontFamily:'Poppins'}}>
      <div>
        <h3 className="text-lg font-bold mb-3 text-[var(--foreground)]">Category</h3>
        <ul className="flex flex-col gap-2">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors font-medium ${selectedCategory === cat ? 'bg-[var(--primary)] text-[var(--primary-foreground)]' : 'hover:bg-[var(--primary)]/10 text-[var(--foreground)]'}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-3 text-[var(--foreground)]">Price</h3>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            className="w-20 p-2 rounded border border-[var(--primary)] bg-transparent text-[var(--foreground)]"
            placeholder="Min"
            value={priceRange[0]}
            min={0}
            onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
          />
          <span className="text-[var(--muted-foreground)]">-</span>
          <input
            type="number"
            className="w-20 p-2 rounded border border-[var(--primary)] bg-transparent text-[var(--foreground)]"
            placeholder="Max"
            value={priceRange[1]}
            min={0}
            onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
          />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-3 text-[var(--foreground)]">Location</h3>
        <ul className="flex flex-col gap-2">
          {locations.map((loc) => (
            <li key={loc}>
              <button
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors font-medium ${selectedLocation === loc ? 'bg-[var(--primary)] text-[var(--primary-foreground)]' : 'hover:bg-[var(--primary)]/10 text-[var(--foreground)]'}`}
                onClick={() => setSelectedLocation(loc)}
              >
                {loc}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
