import { Facility, HospitalDetail } from "@/utils/types";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import "dayjs/locale/id";
import Link from "next/link";

dayjs.locale("id");

interface HeaderProps {
  facility: Facility | undefined;
}

export default function Header({ facility }: HeaderProps) {
  const [detailHospital, setDetailHospital] = useState<
    HospitalDetail | undefined
  >();

  // Update jam setiap detik
  const [time, setTime] = useState<Dayjs | null>(null);

  useEffect(() => {
    // set initial time pas client ready
    setTime(dayjs());

    const interval = setInterval(() => {
      setTime(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem("detailHospital"); // string | null

    // ❌ Error kalau langsung: setHospital(stored)
    if (stored) {
      setDetailHospital(JSON.parse(stored) as HospitalDetail);
    }
  }, []);

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center px-4 md:px-8 py-2 bg-[#76b732] text-white space-y-2 md:space-y-0">
      {/* Logo + Nama RS */}
      <Link href={"/"}>
        <div className="flex items-center space-x-2 md:space-x-4">
          <img src="/logo.png" alt="Logo" className="w-[6vw] lg:w-[3vw]" />
          <h1 className="text-xl md:text-4xl lg:text-[2vw] font-bold text-center md:text-left">
            {detailHospital?.name}
          </h1>
        </div>
      </Link>

      {/* Judul */}
      <h2 className="text-2xl md:text-4xl lg:text-[3vw] font-semibold text-center flex-1">
        Antrian - {facility?.tv_display_name}
      </h2>

      {/* Waktu */}
      <div className="text-center lg:text-right">
        <div className="text-sm md:text-[1.8vw]  font-bold leading-tight">
          {time?.format("HH:mm:ss")}
        </div>
        <div className="text-lg md:text-[1.8vw] font-bold leading-tight">
          {time?.format("dddd, DD MMMM YYYY")}
        </div>
      </div>
    </div>
  );
}
