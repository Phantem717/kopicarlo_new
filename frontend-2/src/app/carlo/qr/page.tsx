"use client";
import ResponsesAPI from "@/app/api/carlo/responses";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import { Button, Card, Tabs, message } from "antd";
import { QrcodeOutlined, CameraOutlined } from "@ant-design/icons";

// Dynamically import QR code generator
const generateQR = async (text: string, elementId: string) => {
  const QRCode = (await import("qrcode")).default;
  const canvas = document.getElementById(elementId) as HTMLCanvasElement;
  if (canvas) {
    QRCode.toCanvas(canvas, text, { width: 256 }, (error) => {
      if (error) console.error(error);
    });
  }
};

const QRCodePage = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "";
  const [activeTab, setActiveTab] = useState("display");
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [scanner, setScanner] = useState<any>(null);

  useEffect(() => {
    // Clean up scanner on unmount
    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [scanner]);

  // Generate QR code when code changes
  useEffect(() => {
    if (code && activeTab === "display") {
      generateQR(code, "qrcode-canvas");
    }
  }, [code, activeTab]);
  const processQR = async(decodedText: string) => {

    const qrCode = decodedText.split("-")[1] 
    const phone_number =  decodedText.split("-")[0];
    const payload = {
      phone_number: phone_number,
      otp: qrCode
    }
    console.log(payload,qrCode,phone_number,decodedText);
    const resp = await ResponsesAPI.confirmQR(payload);
    console.log(resp);
        
  }
  const startScanner = async () => {
    try {
      // Dynamically import the scanner to avoid SSR issues
      const { Html5Qrcode } = await import("html5-qrcode");

      const newScanner = new Html5Qrcode("reader", false);

      await newScanner.start(
        { facingMode: "environment" }, // Use back camera
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText: string) => {
          // Handle the scanned code
          processQR(decodedText);
            message.success("Kode QR berhasil dipindai!");
          setScanResult(decodedText);
          
          // Stop scanning after successful scan
          newScanner.stop();
          Swal.fire({
            icon: "success",
            title: "Berhasil Memindai Kode QR",
            text: `Kode QR berhasil dipindai`,
            timer: 3000,
          })
          setActiveTab("result");
        },
        (errorMessage: string) => {
          // Handle scan failure
          Swal.fire({
            icon: "error",
            title: "Gagal Memindai Kode QR",
            text: errorMessage,
                        timer: 3000,

          })
          console.error(errorMessage);
        }
      );

      setScanner(newScanner);
    } catch (error) {
      console.error("Error starting scanner:", error);
      message.error(
        "Gagal memulai pemindai. Pastikan Anda mengizinkan akses kamera."
      );
    }
  };

  const stopScanner = () => {
    if (scanner) {
      scanner.stop();
      setScanner(null);
    }
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    if (key === "scan" && !scanner) {
      startScanner();
    } else if (key !== "scan" && scanner) {
      stopScanner();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">
          Manajemen Kode QR
        </h1>

        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          items={[
            {
              key: "display",
              label: (
                <span>
                  <QrcodeOutlined className="mr-2" />
                  Tampilkan QR Code
                </span>
              ),
              children: (
                <Card className="text-center">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Kode Anda:</h3>
                    <p className="text-2xl font-mono bg-gray-100 p-2 rounded">
                      {code || "Tidak ada kode"}
                    </p>
                  </div>

                  {code && (
                    <div className="flex flex-col items-center">
                      <div className="p-4 bg-white rounded-lg shadow-md mb-4">
                        <div className="qr-code-container flex justify-center">
                          <canvas
                            id="qrcode-canvas"
                            className="w-64 h-64"
                          ></canvas>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        Pindai kode QR ini untuk verifikasi
                      </p>
                    </div>
                  )}
                </Card>
              ),
            },
            {
              key: "scan",
              label: (
                <span>
                  <CameraOutlined className="mr-2" />
                  Pindai QR Code
                </span>
              ),
              children: (
                <Card>
                  <div id="reader" className="w-full max-w-md mx-auto" />
                  <div className="mt-4 text-center">
                    <p className="text-gray-600 mb-4">
                      Arahkan kamera ke kode QR untuk memindai
                    </p>
                    <Button
                      type="primary"
                      danger
                      onClick={stopScanner}
                      disabled={!scanner}
                      className="mt-2"
                    >
                      Hentikan Pemindaian
                    </Button>
                  </div>
                </Card>
              ),
            },
            {
              key: "result",
              label: "Hasil Pindai",
              children: (
                <Card>
                  <h3 className="text-lg font-semibold mb-4">
                    Hasil Pindai QR Code:
                  </h3>
                  {scanResult ? (
                    <div className="p-4 bg-gray-50 rounded">
                      <p className="font-mono break-all">{scanResult}</p>
                    </div>
                  ) : (
                    <p>Belum ada hasil pindai</p>
                  )}
                  <Button
                    type="primary"
                      onClick={() => {
                      setScanResult(null);
                      setScanner(null);
                      setActiveTab("scan");

                      // 🔥 Delay startScanner so DOM can re-render the #reader div
                      setTimeout(() => {
                        startScanner();
                      }, 200);
                    }}
                  
                      className="mt-4"
                  >
                    Pindai Lagi
                  </Button>
                </Card>
              ),
              disabled: !scanResult,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default QRCodePage;
