"use client";
import Swal from "sweetalert2";

import HeaderCarlo from "@/components/HeaderCarlo";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import PosterAPI from "@/app/api/carlo/posters";
import ResponsesAPI from "@/app/api/carlo/responses";
import OTPAPI from "@/app/api/carlo/otp";

// Reusable VoteModal
const VoteModal = ({
  isOpen,
  onClose,
  posterTitle,
  onSubmit,
  input,
  mode,
  setInput,
}: {
  isOpen: boolean;
  onClose: () => void;
  posterTitle: string;
  onSubmit: () => void;
  input: string;
  setInput: (value: string) => void;
  mode: "phone" | "otp" | "name" | "unit" | "email";
}) => {
  if (!isOpen) return null;

  const placeholder =
    mode === "phone"
      ? "ex. 628128231231"
      : mode === "otp"
      ? "ex. 123456"  
      : mode == "unit" ? "ex. sirs" : mode == "name" ? "ex. John Doe" : "alexzebes@gmail.com";

  const inputType = mode === "name" || mode == "unit" || mode == "email" ? "text" : "number";

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-gray-200 shadow-xl">
        {mode == "name" ? (
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Masukkan Nama Anda
          </h2>
          
        ) : mode == "unit" ? (
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Masukkan Unit Anda
          </h2>
        ) : (
<h2 className="text-2xl font-bold mb-4 text-gray-800">
            Anda memilih {posterTitle}
          </h2>)
        }

        <p className="text-gray-600 mb-6">
          {mode === "phone"
            ? "Silakan masukkan nomor telepon Anda"
            : mode === "otp"
            ? "Silakan cek WhatsApp Anda dan masukkan kode OTP 6 digit di bawah ini."
            : mode == "name" ? "Silakan masukkan nama Anda" : "Silakan masukkan email Anda"}
        </p>

        <input
          type={inputType}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="w-full p-3 rounded-xl mb-6 bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-colors"
          >
            Batal
          </button>
          <button
            onClick={onSubmit}
            disabled={!input}
            className={`flex-1 py-3 px-4 rounded-xl transition-colors ${
              input
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-500 cursor-not-allowed text-gray-300"
            }`}
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
};

// Role selection modal
const RadioSelectModal = ({
  isOpen,
  onClose,
  onSubmit,
  role,
  setRole,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  role: string;
  setRole: (value: string) => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-gray-200 shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Pilih Jenis Pemilih
        </h2>

        <p className="text-gray-600 mb-6 text-center">
          Silakan pilih apakah Anda Karyawan atau Pengunjung
        </p>

        <div className="space-y-4">
          <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition">
            <input
              type="radio"
              value="karyawan"
              checked={role === "karyawan"}
              onChange={() => setRole("karyawan")}
              className="w-5 h-5"
            />
            <span className="text-gray-800 font-medium">Karyawan</span>
          </label>

          <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition">
            <input
              type="radio"
              value="pengunjung"
              checked={role === "pengunjung"}
              onChange={() => setRole("pengunjung")}
              className="w-5 h-5"
            />
            <span className="text-gray-800 font-medium">Pengunjung</span>
          </label>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition"
          >
            Batal
          </button>
          <button
            onClick={onSubmit}
            disabled={!role}
            className={`flex-1 py-3 px-4 rounded-xl transition ${
              role
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-500 cursor-not-allowed text-gray-300"
            }`}
          >
            Lanjut
          </button>
        </div>
      </div>
    </div>
  );
};

// Image modal
const ImageModal = ({
  isOpen,
  onClose,
  imageUrl,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div className="relative max-w-4xl w-full max-h-[90vh]">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="relative w-full h-[80vh]">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-contain p-4"
              sizes="90vw"
              priority
            />
          </div>
          <div className="p-4 bg-white border-t">
            <h3 className="text-lg font-medium text-center text-gray-800">
              {title}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Vote() {
  type Poster = {
    id: number;
    title: string;
    imageUrl: string;
    description: string;
    votes: number;
  };

  const [posters, setPosters] = useState<Poster[]>([]);

  // Form data
  const [roles, setRoles] = useState<string>("");
  const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [unit,setUnit] = useState<string>("");
  // Modal / flow states
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);

  const [expiry, setExpiry] = useState<string>("");
  const [selectedPoster, setSelectedPoster] = useState<{
    id: number;
    title: string;
  } | null>(null);
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    title: string;
  } | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const response = await PosterAPI.getPosters();
        setPosters(response);
        console.log("DATA", response);
      } catch (error) {
        console.error("Error fetching posters:", error);
      }
    };
    fetchPosters();
  }, []);

  // When user clicks "Pilih Poster Ini" -> set selected poster and open role modal
  const handleSelectPoster = (poster: Poster) => {
    setSelectedPoster({ id: poster.id, title: poster.title });
    // reset flow fields (optional)
    setRoles("");
    setName("");
    setUnit("");
    setPhoneNumber("");
    setOtp("");
    // open role modal
    setIsRoleModalOpen(true);
  };

  // Role modal submit -> decide next step
  const handlePickRole = () => {
    if (!roles) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Silakan pilih peran terlebih dahulu",
      });
      return;
    }

    setIsRoleModalOpen(false);

    if (roles === "karyawan") {
      setIsNameModalOpen(true);
    } else {
      // pengunjung
      setIsPhoneModalOpen(true);
    }
  };

  // Name submit -> go to phone modal
  const handleSubmitName = async () => {
    try {
      if (!name) {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "Nama tidak boleh kosong",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Anda Berhasil Input Nama",
        showConfirmButton: true,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          setIsNameModalOpen(false);
          setIsUnitModalOpen(true);
        }
      });
    } catch (error: any) {
      const backendMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Terjadi kesalahan tidak diketahui";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${backendMsg}`,
        showConfirmButton: true,
        allowOutsideClick: false,
      });
    }
  };

  
  // Name submit -> go to phone modal
  const handleSubmitEmail = async () => {
    try {
      if (!email) {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "Email tidak boleh kosong",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Anda Berhasil Input Email",
        showConfirmButton: true,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          setIsEmailModalOpen(false);
          setIsPhoneModalOpen(true);
        }
      });
    } catch (error: any) {
      const backendMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Terjadi kesalahan tidak diketahui";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${backendMsg}`,
        showConfirmButton: true,
        allowOutsideClick: false,
      });
    }
  };

  
  // Name submit -> go to phone modal
  const handleSubmitUnit = async () => {
    try {
      if (!unit) {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "Unit tidak boleh kosong",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Anda Berhasil Input Unit",
        showConfirmButton: true,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          setIsUnitModalOpen(false);
          setIsEmailModalOpen(true);
        }
      });
    } catch (error: any) {
      const backendMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Terjadi kesalahan tidak diketahui";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${backendMsg}`,
        showConfirmButton: true,
        allowOutsideClick: false,
      });
    }
  };


  // Phone submit -> confirm number, send OTP if needed, then go to OTP modal
  const handleSubmitPhone = async () => {
    try {
      if (!phoneNumber) {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "Nomor telepon tidak boleh kosong",
        });
        return;
      }

      if (!phoneNumber.startsWith("62")) {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "Nomor Telepon Harus Dimulai Dengan 62",
        });
        return;
      }

      // keep UI tidy

      // Confirm number with backend
      const response = await ResponsesAPI.confirmNumber(phoneNumber,name,roles,unit);
      console.log("Response:", response);
      setIsPhoneModalOpen(false);

      if (response.success === true) {
        if (response.data.authorized === true) {
          const data = response.data;
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Nomor Telepon Berhasil Di verifikasi",
            showConfirmButton: true,
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              // If authorized, redirect immediately (no OTP)
              router.push(`/carlo/${data.phone_number}-${data.otp}`);
            }
          });
          return;
        } else {
          // send OTP for normal voting
          const otpResp = await OTPAPI.sendOTP(phoneNumber);
          setExpiry(otpResp.data?.otpExpiry || "");
          console.log("OTP RESP", otpResp);

          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Anda Berhasil Memilih Poster",
            showConfirmButton: true,
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              setIsOtpModalOpen(true);
            }
          });
        }
      } else {
        // backend returned not success
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response?.message || "Gagal memverifikasi nomor",
        });
      }
    } catch (error: any) {
      // if we had closed phone modal earlier, re-open it so user can retry

      const backendMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Terjadi kesalahan tidak diketahui";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${backendMsg}`,
        showConfirmButton: true,
        allowOutsideClick: false,
      });
    }
  };

  // OTP submit -> verify, update voting, redirect
  const handleSubmitOtp = async () => {
    try {
      if (!otp) {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "OTP tidak boleh kosong",
        });
        return;
      }

      // Verify OTP with backend
      const response = await OTPAPI.checkOTP({
        phone_number: phoneNumber,
        otp: otp,
        currentDate: new Date(),
        expiry: new Date(),
      });

      console.log("OTP RESP", response);
      setOtp("");

      setIsOtpModalOpen(true);
      // reset phone/otp fields to avoid reuse

      if (response.success) {
        if (!selectedPoster) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Poster belum dipilih.",
          });
          return;
        }

        // Update voting and responses
        const voting = await PosterAPI.updateVoting(selectedPoster.id);
        const updateChoice = await ResponsesAPI.update({
          phone_number: phoneNumber,
          choice: selectedPoster.id,
        });
        console.log("Voting:", voting, updateChoice);

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Anda Berhasil Memilih Verifikasi OTP",
          showConfirmButton: true,
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            router.push(`/carlo/${phoneNumber}-${otp}`);
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Verifikasi OTP",
          text: "Apakah Ingin Kirim Ulang OTP Baru?",
          showCancelButton: true,
          confirmButtonText: "Kirim Ulang",
          showConfirmButton: true,
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            OTPAPI.sendOTP(phoneNumber);
            // reopen OTP modal so user can try again
            setIsOtpModalOpen(true);
          } else {
            // user cancelled, maybe go back to phone modal
            setIsPhoneModalOpen(true);
          }
        });
      }
    } catch (error: any) {
      const backendMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Terjadi kesalahan tidak diketahui";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${backendMsg}`,
        showConfirmButton: true,
        allowOutsideClick: false,
      });
      setIsOtpModalOpen(true);
    }
  };

  return (
    <>
      <HeaderCarlo />
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Pemilihan Poster Terbaik
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {posters.map((poster) => (
              <div
                key={poster.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full w-full max-w-xs"
              >
                <div
                  className="relative h-80 w-full flex items-center justify-center p-4 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage({
                      url: poster.imageUrl,
                      title: poster.title,
                    });
                  }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={poster.imageUrl}
                      alt={poster.title}
                      fill
                      className="object-contain hover:scale-105 transition-transform duration-200"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33.33vw"
                      priority={poster.id <= 4}
                    />
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800 uppercase">
                    {poster.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow">
                    {poster.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectPoster(poster);
                      }}
                      className=" w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 text-xl font-bold"
                    >
                      Pilih Poster Ini
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Role modal */}
      <RadioSelectModal
        isOpen={isRoleModalOpen}
        onClose={() => {
          setIsRoleModalOpen(false);
          setSelectedPoster(null);
          setRoles("");
        }}
        onSubmit={handlePickRole}
        role={roles}
        setRole={setRoles}
      />

      {/* Name modal (only for karyawan) */}
      <VoteModal
        isOpen={isNameModalOpen}
        onClose={() => setIsNameModalOpen(false)}
        posterTitle={selectedPoster?.title || ""}
        onSubmit={handleSubmitName}
        input={name}
        setInput={setName}
        mode="name"
      />
        <VoteModal
        isOpen={isUnitModalOpen}
        onClose={() => setIsUnitModalOpen(false)}
        posterTitle={selectedPoster?.title || ""}
        onSubmit={handleSubmitUnit}
        input={unit}
        setInput={setUnit}
        mode="unit"
      />

         <VoteModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        posterTitle={selectedPoster?.title || ""}
        onSubmit={handleSubmitEmail}
        input={email}
        setInput={setEmail}
        mode="email"
      />
      {/* Phone modal */}
      <VoteModal
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
        posterTitle={selectedPoster?.title || ""}
        onSubmit={handleSubmitPhone}
        input={phoneNumber}
        setInput={setPhoneNumber}
        mode="phone"
      />

      {/* OTP modal */}
      <VoteModal
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        posterTitle={selectedPoster?.title || ""}
        onSubmit={handleSubmitOtp}
        input={otp}
        setInput={setOtp}
        mode="otp"
      />

      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageUrl={selectedImage?.url || ""}
        title={selectedImage?.title || ""}
      />
    </>
  );
}
