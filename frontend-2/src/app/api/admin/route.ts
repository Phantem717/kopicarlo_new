import { apiAdmin, apiPublic, apiPublic2 } from "@/app/lib/api";
import { GetDetailHospitalResponse, RunningTextResponse } from "@/utils/types";
import { ApiResponse } from "apisauce";
import { NextResponse } from "next/server";

interface ResponseAdmin {
  ok: boolean;
  data: {
    x_api_key: string;
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const api = await apiAdmin();

    const resApiKey: ApiResponse<ResponseAdmin> = await api.post(
      `/${process.env.API_VERSION_1}/admin/api-key`,
      body
    );

    if (!resApiKey.ok) {
      return NextResponse.json(
        { error: resApiKey.problem },
        { status: resApiKey.status || 500 }
      );
    }

    const api2 = await apiAdmin(resApiKey.data?.data.x_api_key);
    const resDetailHospital: ApiResponse<GetDetailHospitalResponse> =
      await api2.get(`/${process.env.API_VERSION_1}/admin/hospital/detail`);

    if (!resDetailHospital.ok) {
      return NextResponse.json(
        { error: resApiKey.problem },
        { status: resApiKey.status || 500 }
      );
    }
    return NextResponse.json({
      apiKey: resApiKey.data,
      detailHospital: resDetailHospital.data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const api = await apiPublic2();
  const res: ApiResponse<RunningTextResponse> = await api.get(`/running-text`);

  if (!res.ok) {
    return NextResponse.json(
      { error: res.problem },
      { status: res.status || 500 }
    );
  }
  return NextResponse.json(res.data);
}
