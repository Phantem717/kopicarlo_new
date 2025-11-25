"use client";

import HeaderCarlo from "@/components/HeaderCarlo";
import React, { useEffect } from "react";
const generateQR = async (text: string, elementId: string) => {
  const QRCode = (await import("qrcode")).default;
  const canvas = document.getElementById(elementId) as HTMLCanvasElement;
  if (canvas) {
    QRCode.toCanvas(canvas, text, { width: 256 }, (error) => {
      if (error) console.error(error);
    });
  }
};

export default function CarloCode({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = React.use(params);
  useEffect(() => {
    generateQR(code, "qrcode");
  }, [code]);
  return (
    <div>
      <HeaderCarlo />
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Terima Kasih Telah Melakukan Voting
          </h1>
          <p className="text-center my-8">
            Silahkan Tunjukan QR Code Ini Ke Petugas
          </p>
          <div className="flex justify-center">
            <canvas id="qrcode" />
          </div>
        </div>
      </div>
    </div>
  );
}
