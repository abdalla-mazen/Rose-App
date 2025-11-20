"use server";

import getToken from "@/lib/utils/get-token";
import { revalidateTag } from "next/cache";

export async function uploadPhotoAction(formData: FormData) {
  try {
    const token = await getToken();
    const file = formData.get("photo") as File;

    if (!file) {
      return { success: false, message: "No file provided" };
    }

    const backendRes = await fetch(`${process.env.API}/auth/upload-photo`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token?.accessToken}`,
      },
      body: formData,
    });

    const data = await backendRes.json();

    if (backendRes.ok) {
      // ✅ لو الصورة اتحدثت بنجاح، نعمل Revalidate لبيانات المستخدم
      revalidateTag("user-profile");
    }

    return { ...data, success: backendRes.ok };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}
