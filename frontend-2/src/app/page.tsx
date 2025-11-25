"use client";

import DraggableModal from "@/components/TestDragModal";
import Link from "next/link";
import Draggable from "react-draggable";
import { useRef } from "react";

const BUTTONS = [
  {
    title: "Display Antrean",
    desc: "List Display Antrean Rs St. Carolus",
    href: "/list-display-antrean",
  },
  {
    title: "RSSC TV",
    desc: "TV Rumah Sakit St. Carolus ",
    href: "/video/rssctv",
  },
  {
    title: "Informasi Farmasi",
    desc: "Informasi Farmasi Rumah Sakit St. Carolus",
    href: "/farmasi",
  },
  {
    title: "Informasi Kamar",
    desc: "Informasi Ketersediaan Kamar Rumah Sakit St. Carolus",
    href: "/informasi-kamar",
  },
];

export default function Home() {
  const draggleRef = useRef<HTMLDivElement>(null);
  return (
    <div className="font-sansmin-h-[93vh] items-center p-8 container mx-auto mt-8">
      <h1 className="font-bold text-[6vw] lg:text-[3vw] mb-5 text-center">
        RUMAH SAKIT SINT CAROLUS
      </h1>
      <DraggableModal />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {BUTTONS.map(({ title, desc, href }) => (
          <Draggable key={href} nodeRef={draggleRef}>
            <div ref={draggleRef}>
              <Link href={href}>
                <div className="h-40 md:h-48 rounded-2xl bg-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transform transition-all p-6 flex flex-col justify-between cursor-pointer">
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-gray-800">
                      {title}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">{desc}</p>
                  </div>
                  <div className="h-2 w-24 rounded-full bg-[#76b732]/40 group-hover:w-32 transition-all" />
                </div>
              </Link>
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
}
