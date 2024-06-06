import { IoMdSearch } from "react-icons/io";

export default function SearchBar() {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <IoMdSearch className="text-2xl" />
      </div>
      <input
        type="search"
        id="default-search"
        className="block w-full p-2 ps-10 text-sm text-primary-900 border border-primary-300 rounded-lg bg-white focus:ring-primary-500 focus:border-primary-500 outline-none"
        placeholder="Ketik bahan bahan"
        required
      />
    </div>
  );
}
