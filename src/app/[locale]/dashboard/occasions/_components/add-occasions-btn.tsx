"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AddOccasionsBtn() {

  return (
    <Button variant={"primary"} className="w-52">
      <Plus className="text-white" />
      <Link href={"/dashboard/occasions/add-occasions"}>Add a new occasion</Link>
    </Button>
  );
}
