import Link from "next/link";

export const metadata = {
  title: "404 - Halaman Tidak Ditemukan",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[94vh] text-center px-4">
      <h2 className="text-3xl font-semibold text-gray-700 mb-2">Upps!</h2>

      <h1 className="text-[120px] font-extrabold text-red-600 leading-none mb-2">
        404
      </h1>
      <p className="text-xl text-red-500 font-semibold mb-4">ERROR</p>

      <h3 className="text-2xl font-bold mb-2 text-gray-800">
        Halaman Tidak Ditemukan
      </h3>

      <p className="text-gray-600 max-w-lg mb-8">
        Sepertinya halaman telah dihapus atau Anda salah mengetik alamat.
        Silakan pilih tombol di bawah untuk kembali ke beranda dan melanjutkan.
      </p>

      <Link
        href="/"
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md transition-colors duration-200"
      >
        Beranda
      </Link>
    </div>
  );
}
