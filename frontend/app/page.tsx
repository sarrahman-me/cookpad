import Image from "next/image";
import logo from "@/public/logo.png";
import banner from "@/public/banner.webp";
import { GetDataApi } from "@/utils/fetcher";
import { IReceipe } from "@/interface/receipe";
import { CardReceipe, SearchBar } from "@/Components/Atoms";

export default async function Home() {
  const data = await GetDataApi("http://localhost:8080/receipes");

  const receipes: IReceipe[] = data.data;

  return (
    <main className="bg-primary-50 min-h-screen space-y-3">
      {/* navbar sederhana */}
      <nav className="bg-white p-2 shadow-sm z-50 sticky top-0">
        <Image src={logo} alt="Logo" width={125} height={125} />
      </nav>

      {/* main  */}
      <div className="max-w-2xl mx-auto space-y-8 p-1">
        {/*  search bar */}
        <SearchBar />

        {/* banner */}
        <div className="flex justify-center">
          <Image src={banner} alt="Banner" width={800} height={125} />
        </div>

        {/* catalog resep */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {receipes.map((receipe, i) => (
            <CardReceipe
              slug={receipe.slug}
              image_url={receipe.image_url}
              title={receipe.title}
              key={i}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
