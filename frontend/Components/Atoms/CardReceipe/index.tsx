"use client";

import { useRouter } from "next/navigation";

/* eslint-disable @next/next/no-img-element */
const CardReceipe = ({
  title,
  image_url,
  slug,
}: {
  title: string;
  image_url: string;
  slug: string;
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/resep/${slug}`)}
      className="max-w-sm cursor-pointer bg-white border border-gray-200 rounded-lg shadow"
    >
      <div className="flex justify-center">
        <img className="rounded-t-lg" src={image_url} alt={title} />
      </div>
      <div className="p-5">
        <h5 className="text-lg font-medium">{title}</h5>
      </div>
    </div>
  );
};

export default CardReceipe;
