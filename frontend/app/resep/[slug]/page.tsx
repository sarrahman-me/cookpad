/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import logo from "@/public/logo.png";
import { GetDataApi } from "@/utils/fetcher";
import { IReceipe } from "@/interface/receipe";
import { SearchBar } from "@/Components/Atoms";
import { IoMdTime } from "react-icons/io";
import { notFound } from "next/navigation";
import { FaRegUser } from "react-icons/fa";

export default async function DetailReceipe({
  params,
}: {
  params: { slug: string };
}) {
  const data = await GetDataApi(
    `http://localhost:8080/receipes/${params.slug}`
  );

  const receipe: IReceipe = data.data;

  if (!receipe) {
    return notFound();
  }

  return (
    <main className="bg-primary-50 min-h-screen space-y-3">
      {/* navbar sederhana */}
      <nav className="bg-white p-2 shadow-sm z-50 sticky top-0">
        <Image src={logo} alt="Logo" width={125} height={125} />
      </nav>

      {/* main  */}
      <div className="max-w-2xl mx-auto space-y-5 p-1">
        {/*  search bar */}
        <SearchBar />

        {/* card detail receipe */}
        <div className="w-full flex justify-center">
          <img
            className="w-full rounded-lg"
            src={receipe.image_url}
            alt={receipe.title}
          />
        </div>

        <div className="bg-white p-2 shadow rounded-lg">
          <h1 className="text-2xl font-medium">{receipe.title}</h1>
        </div>

        <div className="bg-white p-2 shadow rounded-lg">
          <p>{receipe.description}</p>
        </div>

        <div className="bg-white p-2 shadow rounded-lg space-y-3">
          <h2 className="text-lg">Bahan - bahan</h2>
          <div className="flex items-center space-x-4 font-light">
            <span className="flex items-center space-x-1">
              <IoMdTime />
              <p>{receipe.duration} Menit</p>
            </span>
            <span className="flex items-center space-x-1">
              <FaRegUser />
              <p>{receipe.serving} Sajian</p>
            </span>
          </div>

          {receipe.ingredients?.map((ingredient, i) => (
            <p key={i} className="border-b last:border-none">
              {ingredient.quantity} {ingredient.dose} {ingredient.ingredient}
            </p>
          ))}
        </div>

        <div className="bg-white p-2 shadow rounded-lg space-y-3">
          <h2 className="text-lg">Cara membuat</h2>
          {receipe.steps?.map((step, i) => (
            <p key={i}>{step.description}</p>
          ))}
        </div>
      </div>
    </main>
  );
}
