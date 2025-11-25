"use client";

import { api } from "@/utils/api";
import Constant from "@/utils/library/Constant";
import { AdminResponse, RunningTextResponse } from "@/utils/types";
import { ApiResponse } from "apisauce";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

export default function Footer() {
  const [runningText, setRunningText] = useState<string>();

  useEffect(() => {
    const fetchData = async (retryCount = 0) => {
      try {
        const payload = {
          unique_url: `21119${format(new Date(), "uuMMddHHmm")}`,
        };
        const res: ApiResponse<AdminResponse> = await api.post(
          `/admin`,
          payload
        );

        const apiKey = res.data?.apiKey.data.x_api_key || "";

        if (res.ok) {
          const existingKey = localStorage.getItem(Constant.API_KEY);
          const apiKey = res.data?.apiKey.data.x_api_key || "";
          if (apiKey !== existingKey) {
            localStorage.setItem(Constant.API_KEY, apiKey);
          }
        }

        const response: ApiResponse<RunningTextResponse> = await api.get(
          `/admin?apiKey=${apiKey}`
        );

        if (response.ok && response.data) {
          setRunningText(response.data.data[0].text || "");
        } else {
          if (retryCount < 1) {
            console.warn("Percobaan gagal, mencoba lagi...");
            await fetchData(retryCount + 1);
          } else {
            console.error("API error:", response.problem);
          }
        }
      } catch (error) {
        if (retryCount < 1) {
          console.warn("Terjadi error, mencoba lagi...");
          await fetchData(retryCount + 1);
        } else {
          console.error("Gagal fetch data:", error);
        }
      }
    };

    // Panggil fungsi
    fetchData();
  }, []);

  return (
    <div className="bg-[#e91f27] text-white py-1">
      <div className="overflow-hidden w-full">
        <div className="inline-block">
          <span className="text-lg md:text-[1.5vw] font-semibold">
            <Marquee speed={50}>
              {runningText} 🟡 {runningText} 🟡
            </Marquee>
          </span>
        </div>
      </div>
    </div>
  );
}
