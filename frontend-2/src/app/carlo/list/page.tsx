"use client";

import { useState, useEffect } from "react";
import { LockOutlined, QrcodeOutlined } from "@ant-design/icons";
import { Button, Modal, Input, Table, message, Card } from "antd";
import { Html5Qrcode } from "html5-qrcode";
import { useRouter } from "next/navigation";

// // Dummy data for votes
// const dummyVotes = [
//   { id: 1, title: "Vote 1", description: "Deskripsi vote 1", status: "active" },
//   {
//     id: 2,
//     title: "Vote 2",
//     description: "Deskripsi vote 2",
//     status: "completed",
//   },
//   {
//     id: 3,
//     title: "Vote 3",
//     description: "Deskripsi vote 3",
//     status: "upcoming",
//   },
// ];
import PosterAPI from "@/app/api/carlo/posters";
export default function VoteListPage() {
    const router = useRouter();

  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [scanner, setScanner] = useState<Html5Qrcode | null>(null);
  type Poster = {
    id: number;
    title: string;
    imageUrl: string;
    description: string;
    votes: number;
  };

  const [posters, setPosters] = useState<Poster[]>([]);


  const handleGetData = async () =>{
    const response = await PosterAPI.getPosters();
    console.log("RESP",response)
    setPosters(response);
  }
  // Check if user is already authenticated
  useEffect(() => {
    const auth = localStorage.getItem("voteAuth");
    if (auth === "authenticated") {
            handleGetData();
      setIsAuthenticated(true);


    }
  }, []);

  const handleLogin = () => {
    // In a real app, validate the password with your backend
    if (password === "admin123") {
      // Replace with your actual password or API call
      localStorage.setItem("voteAuth", "authenticated");
      setIsAuthenticated(true);
      message.success("Berhasil masuk");
    } else {
      message.error("Password salah");
    }
  };

  const handleScan = async (decodedText: string) => {
    try {
      // Stop the scanner
      if (scanner) {
        await scanner.stop();
        setIsModalVisible(false);
      }

      // Process the scanned QR code
      message.success(`Kode QR berhasil dipindai: ${decodedText}`);
      // Add your redemption logic here
    } catch (error) {
      console.error("Error handling scan:", error);
      message.error("Gagal memproses kode QR");
    }
  };

  const startScanner = async () => {
    try {
      const html5QrCode = new Html5Qrcode("qr-reader");
      setScanner(html5QrCode);

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
      };

      await html5QrCode.start(
        { facingMode: "environment" },
        config,
        handleScan,
        undefined
      );

      setIsModalVisible(true);
    } catch (error) {
      console.error("Error starting scanner:", error);
      message.error("Tidak dapat mengakses kamera");
    }
  };

  const stopScanner = async () => {
    try {
      if (scanner) {
        await scanner.stop();
        setScanner(null);
      }
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error stopping scanner:", error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Judul",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Deskripsi",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Total Votes",
      dataIndex: "votes",
      key: "votes",
      render: (status: string) => {
        const statusMap: Record<string, string> = {
          active: "Aktif",
          completed: "Selesai",
          upcoming: "Akan Datang",
        };
        return statusMap[status] || status;
      },
    },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card
          className="w-full max-w-md"
          title="Halaman Admin"
          variant="outlined"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Input.Password
                size="large"
                placeholder="Masukkan password"
                prefix={<LockOutlined />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onPressEnter={handleLogin}
              />
            </div>
            <Button type="primary" size="large" block onClick={handleLogin}>
              Masuk
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daftar Voting</h1>
        <Button type="primary" icon={<QrcodeOutlined />} onClick={() => router.push("/carlo/qr")}>
          Scan QR Code
        </Button>
      </div>

      <Table
        dataSource={posters}
        columns={columns}
        rowKey="id"
        pagination={false}
      />

      <Modal
        title="Scan QR Code"
        open={isModalVisible}
        onCancel={stopScanner}
        footer={[
          <Button key="close" onClick={stopScanner}>
            Tutup
          </Button>,
        ]}
        width={400}
      >
        <div id="qr-reader" className="w-full h-64"></div>
        <p className="text-center mt-2 text-gray-600">
          Arahkan kamera ke QR Code
        </p>
      </Modal>
    </div>
  );
}
