"use client";
import Swal from "sweetalert2";

import HeaderCarlo from "@/components/HeaderCarlo";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState,useEffect } from "react";
import PosterAPI from "@/app/api/carlo/posters";
import ResponsesAPI from "@/app/api/carlo/responses";
import OTPAPI from "@/app/api/carlo/otp";
// Component for the voting modal
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
  mode: string;
}) => {

  
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-gray-200 shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Anda memilih {posterTitle}
        </h2>
        <p className="text-gray-600 mb-6">
  {mode === "phone" 
    ? "Silakan masukkan nomor telepon Anda" 
    : "Silakan masukkan kode OTP yang telah dikirim"}
</p>        
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === "phone" ? "ex. 08128231231" : "ex. 212314"}
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



// Component for the image modal
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


  const router = useRouter();
  const [selectedPoster, setSelectedPoster] = useState<{
    id: number;
    title: string;
  } | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [inputOtp, setInputOtp] = useState<boolean>(false);
  const [expiry, setExpiry] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    title: string;
  } | null>(null);

  useEffect(() => {
  const fetchPosters = async () => {
    try {
      const response = await PosterAPI.getPosters();
      
      setPosters(response);
      console.log("DATA",response);
    } catch (error) {
      console.error("Error fetching posters:", error);
    }
  };
  fetchPosters();
}, []);


  const handleSubmitVote = async () => {
    if (phoneNumber && selectedPoster) {
      // Here you can add phone number validation if needed
      console.log("Phone number:", phoneNumber);
      console.log("Selected poster:", selectedPoster);

      const response = await ResponsesAPI.confirmNumber(phoneNumber);
      console.log("Response:", response); 
      if(response.success){
        if(response.data.authorized == true){
            const data = response.data;
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Nomor Telepon Berhasil Di verifikasi',
              showConfirmButton: true,
              allowOutsideClick: false
            }).then((result) => {
              if (result.isConfirmed) {
                router.push(`/carlo/${data.phone_number}-${data.otp}`);
              }
            })
        }
        else{
 const voting = await PosterAPI.updateVoting(selectedPoster.id);
        const updateChoice = await ResponsesAPI.update({phone_number: phoneNumber, choice: selectedPoster.id});
        console.log("Voting:", voting,updateChoice);

        const otp = await OTPAPI.sendOTP(phoneNumber);
        setExpiry(otp.data.otpExpiry);

        console.log("OTP RESP", otp);
          Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Anda Berhasil Memilih Poster',
              showConfirmButton: true,
              allowOutsideClick: false
            }).then((result) => {
              if (result.isConfirmed) {
                setInputOtp(true);
              }
            })
        }
       
      }


    }
  };

  const handleSubmitOtp =async  () => {
    if (otp) {
      console.log("OTP:", otp);

      const response = await OTPAPI.checkOTP({phone_number: phoneNumber, otp: otp, currentDate: new Date(), expiry: new Date()});
      
      console.log("OTP RESP", response);

      setInputOtp(false);
      setPhoneNumber("");
      setOtp("");

      if(response.success){
        console.log("OTP RESP", response);
         Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Anda Berhasil Memilih Verifikasi OTP',
              showConfirmButton: true,
              allowOutsideClick: false
            }).then((result) => {
              if (result.isConfirmed) {
        router.push(`/carlo/${phoneNumber}-${otp}`);
              }
            })

      }
      else{
        Swal.fire({
              icon: 'error',
              title: 'Gagal Verifikasi OTP',
              text: 'Apakah Ingin Kirim Ulang OTP Baru?',
              showCancelButton: true,
              confirmButtonText: "Save",
              showConfirmButton: true,
              allowOutsideClick: false
            }).then((result) => {
              if (result.isConfirmed) {
                OTPAPI.sendOTP(phoneNumber);
              }
            })
      }
      

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
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    {poster.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow">
                    {poster.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPoster({
                          id: poster.id,
                          title: poster.title,
                        });
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 text-sm font-medium"
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

      <VoteModal
        isOpen={!!selectedPoster}
        onClose={() => setSelectedPoster(null)}
        posterTitle={selectedPoster?.title || ""}
        onSubmit={handleSubmitVote}
        input={phoneNumber}
        setInput={setPhoneNumber}
        mode="phone"
      />

      <VoteModal
        isOpen={!!inputOtp}
        onClose={() => setInputOtp(false)}
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
