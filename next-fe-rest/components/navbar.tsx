"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const router = useRouter();

  return (
    <header className="w-full h-48 bg-gradient-to-t from-blue-400 to-sky-500">
      <div className="max-w-screen-2xl mx-auto py-10 px-6">
        <div className="w-full flex items-center justify-between">
          <div
            onClick={() => router.push("/")}
            className="flex items-center gap-x-2 cursor-pointer"
          >
            <Image src="/logo.svg" alt="Logo" width={48} height={48} />
            <div>
              <h1 className="text-2xl font-bold text-white">WarehousY</h1>
              <p className="text-sm text-white pl-1 hidden lg:block">
                Manage stock like a PRO
              </p>
            </div>
          </div>
          <nav>
            <ul>
              <li>
                <Button
                  variant="outline"
                  onClick={() => router.push("/warehouses")}
                >
                  My Warehouses
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
