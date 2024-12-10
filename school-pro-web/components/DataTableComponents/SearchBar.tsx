import { Search } from "lucide-react";
import React, { useState } from "react";

export default function SearchBar({
  data,
  onSearch,
  setIsSearch,
}: {
  data: any[];
  onSearch: any;
  setIsSearch: any;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const filteredData = data.filter((item: any) =>
      Object.values(item).some(
        (value: any) =>
          value &&
          value.toString().toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    setIsSearch(true);
    onSearch(filteredData);
  };
  return (
    <div className="flex justify-between items-center gap-8 w-full">
      <div className="mt-2 relativeclea">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="text-slate-300 w-4 h-4" />
        </div>
        <input
          id="search"
          name="search"
          type="text"
          autoComplete="search"
          value={searchTerm}
          onChange={handleSearch}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-8"
        />
      </div>
    </div>
  );
}
