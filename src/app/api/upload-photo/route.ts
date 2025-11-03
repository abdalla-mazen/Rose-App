import getToken from "@/lib/utils/get-token";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const token = await getToken();

    const formData = await req.formData();
    const file = formData.get("photo") as File;

    if (!file) {
      return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 });
    }

    const backendRes = await fetch(`${process.env.API}/auth/upload-photo`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token?.accessToken}`,
      },
      body: formData,
    });

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
