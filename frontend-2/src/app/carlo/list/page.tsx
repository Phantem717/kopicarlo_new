"use client";

import { useState, useEffect } from "react";
import { LockOutlined, QrcodeOutlined } from "@ant-design/icons";
import { Button, Modal, Input, Table, message, Card } from "antd";
import { useRouter } from "next/navigation";
import {ExportPosterToExcel,
  ExportResponsesToExcel} from "@/utils/exportExcel"
import PosterAPI from "@/app/api/carlo/posters";
import ResponsesAPI from "@/app/api/carlo/responses";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
export default function VoteListPage() {
    const router = useRouter();

  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  type Poster = {
    id: number;
    title: string;
    imageUrl: string;
    description: string;
    votes: number;
  };

  type Responses = {
    id: number;
    name: string;
    phone_number: string;
    unit: string;
    role: string;
    choice: number;
    otp:string;
    success: boolean;
    authorized: boolean;
    date_created: string;
  }

  const [posters, setPosters] = useState<Poster[]>([]);
  const [responses, setResponses] = useState<Responses[]>([]);


  const handleGetData = async () =>{
    const response = await PosterAPI.getPosters();
    const respData = await ResponsesAPI.getResponses();

    const newRespData = respData.map((item) => ({
      ...item,
      date_created: dayjs(item.date_created, "YYYY-MM-DD HH:mm:ss").tz('Asia/Jakarta').format("DD/MM/YYYY, HH.mm.ss"),
    }))
    console.log("RESP",response,respData);
    setPosters(response);
    setResponses(newRespData);
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

  const respColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Nomor Telepon",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Pilihan",
      dataIndex: "choice",
      key: "choice",
    },
    {
      title: "OTP",
      dataIndex: "otp",
      key: "otp",
    },
    {
      title: "Status",
      dataIndex: "success",
      key: "success",
    },
    {
      title: "Authorized",
      dataIndex: "authorized",
      key: "authorized",
    },
    {
      title: "Tanggal Dibuat",
      dataIndex: "date_created",
      key: "date_created",

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
    <div className="p-4 gap-8">
      <div className="flex justify-between items-center mb-6 ">
        <h1 className="text-2xl font-bold">Daftar Voting</h1>

        <Button type="primary" icon={<QrcodeOutlined />} onClick={() => router.push("/carlo/qr")}>
          Scan QR Code
        </Button>
      </div>
      <div>
        <Button color="green" variant="solid" size="large" className="mr-4 font-bold" onClick={()=>ExportPosterToExcel(posters)}>Export Poster To Excel</Button> 
        <Button color="green" variant="solid" size="large" className="mr-4 font-bold" onClick={()=>ExportResponsesToExcel(responses)}>Export Responses To Excel</Button>

      </div>
      <Table
        dataSource={posters}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
      <div>
                <h1 className="text-2xl font-bold mt-10">Daftar Responses</h1>

  <Table
        dataSource={responses}
        columns={respColumns}
        rowKey="id"
        pagination={{ pageSize: 100 }}
      />
      </div>
    
    </div>
  );
}
