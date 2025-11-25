import React from "react";
import HeaderCarlo from "@/components/HeaderCarlo";
import Link from "next/link";

export default function Carlo() {
  return (
    <div>
      <HeaderCarlo />
      <div className="min-h-[85vh] bg-gray-50 py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="bg-white shadow-lg p-6 rounded-lg mt-4">
            <h1 className="text-2xl font-extrabold">Voting Poster</h1>
            <p className="text-xl mt-2 font-bold">
              Ikuti Voting Poster Terfavorit Hari AIDS Sedunia 2025
            </p>
            <p className="text-lg mt-2 font-medium">
              Dalam rangka memperingati Hari AIDS Sedunia 2025, kami membuat
              karya bertema{" "}
              <span className="font-bold">
                &quot;HIV di Tempat Kerja: Kesempatan dan Harapan&quot;
              </span>
            </p>
            <p className="text-lg mt-2 font-medium">
              Mari berpartisipasi dengan memilih poster yang paling
              menginspirasi! Partisipasi Anda adalah wujud nyata kepedulian
              terhadap isu HIV/AIDS.
            </p>
            <p className="text-lg mt-2 font-medium">
              <span className="font-bold">
                Dapatkan secangkir minuman gratis setelah Anda selesai
                memberikan suara!
              </span>
            </p>
            <Link href="/carlo/vote">
              <button className="bg-[#76b732] text-white px-4 py-2 rounded-lg mt-4">
                Vote Sekarang
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
