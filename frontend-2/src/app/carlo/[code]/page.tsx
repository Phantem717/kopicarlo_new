"use client";
import Swal from "sweetalert2";
import HeaderCarlo from "@/components/HeaderCarlo";
import React, { useEffect  } from "react";
import { usePathname } from "next/navigation";
import ResponsesAPI from "@/app/api/carlo/responses";
import { useRouter } from "next/navigation";

const generateQR = async (text: string, elementId: string) => {
  const QRCode = (await import("qrcode")).default;
  const canvas = document.getElementById(elementId) as HTMLCanvasElement;
  if (canvas) {
    QRCode.toCanvas(canvas, text, { width: 256 }, (error) => {
      if (error) console.error(error);
    });
  }
};
// "/carlo/084567124657-752302"



export default function CarloCode({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = React.use(params);
  const pathname = usePathname(); 
const lastPart = pathname.split("/").pop(); 
  const router = useRouter();

const handleClick =async (decodedText: string) => {
  alert("QR Code Berhasil Dikirim");
  const qrCode = decodedText.split("-")[1] 
    const phone_number =  decodedText.split("-")[0];
    const payload = {
      phone_number: phone_number,
      otp: qrCode
    }
    console.log(payload,qrCode,phone_number,decodedText);
    const resp = await ResponsesAPI.confirmQR(payload);
    console.log(resp);
};
  useEffect(() => {
    generateQR(code, "qrcode");
  }, [code]);

const confirmRedeem = () => {
  Swal.fire({
    title: "WARNING!",
    text: "Pastikan tombol Redeem HANYA diaktifkan oleh Petugas",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, Redeem",
    cancelButtonText: "Batal"
  }).then((result) => {
    if (result.isConfirmed) {
      handleClick(lastPart!);
    }
  });
};

useEffect(() => {
  let hasTriggered = false; 
  let interval: any = null;


  async function check() {
    if (hasTriggered) return;

    const [phone_number, otp] = lastPart!.split("-");

    try {
      const resp = await ResponsesAPI.checkQR({ phone_number, otp });

      if (resp?.data) {
        hasTriggered = true; 
        clearInterval(interval); 

        Swal.fire({
          icon: "success",
          title: "QR Anda Telah Dipindai",
          text: "Petugas sudah memverifikasi QR ini.",
        }).then(() => {
          router.push(`/carlo`);
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  interval = setInterval(check, 2000);

  return () => clearInterval(interval);
}, []);

  return (
    <div>
      <HeaderCarlo />
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Terima Kasih Telah Melakukan Voting
          </h1>
          <p className="text-center my-8 font-bold text-xl uppercase">
            Silahkan tunjukkan voucher ini ke petugas untuk mendapatkan kopi Anda
          </p>
          <div className="flex justify-center flex-col items-center">
            <canvas id="qrcode" />
                        <h6 className="text-center my-8  text-lg uppercase">{code}</h6>

          </div>
            <button
            onClick={confirmRedeem}
            className={`flex-1 py-3 px-4 w-full rounded-xl mt-4 transition-colors ${
                "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Redeem
          </button> 
        </div>

     </div>
    </div>
  );
}
