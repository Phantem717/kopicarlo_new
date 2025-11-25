import React from "react";
import Image from "next/image";

export default function HeaderCarlo() {
  return (
    <div className=" bg-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-2">
        <Image
          src="/logo_icare.png"
          alt="Logo Rumah Sakit St. Carolus"
          width={200}
          height={200}
        />
        <Image src="/carlo_cup.png" alt="Carlo Cup" width={100} height={100} />
      </div>
    </div>
  );
}
