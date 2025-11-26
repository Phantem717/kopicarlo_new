import {apiPublic2 } from "@/app/lib/api";
import { ApiResponse } from "apisauce";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
  const api = await apiPublic2();
  const res: ApiResponse<any> = await api.get(`/running-text`);

  if (!res.ok) {
    return NextResponse.json(
      { error: res.problem },
      { status: res.status || 500 }
    );
  }
  return NextResponse.json(res.data);
}
