"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";
import { SlashIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { useAuth } from "@/data/authContext";

export default function Header() {
  const pathname = usePathname();
  const { user } = useAuth();

  if (pathname.startsWith('/dashboard')) {
    return null;
  }

  return (
    <div className="w-screen -mx-[calc((100vw-100%)/2)] bg-gray-500/10">
    <div className=" font-poppins flex flex-col text-white">
    <header className="flex  justify-between mx-139 px-6 py-4 border-b border-gray-700">
      
      <Link
        href="/"
        className="p-2 text-xl font-bold font-poppins text-white hover:text-gray-300 transition"
      >
        Todo App{" "}
      </Link>
      <nav className=" flex items-center gap-4">
      <Breadcrumb className="">
        <BreadcrumbList className="text-base">
          <BreadcrumbItem className="">
            <BreadcrumbLink asChild>
              <Link className="hover:font-bold" href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            { ' | ' }
          </BreadcrumbSeparator>
          {!user ? (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link className="hover:font-bold" href="/login">
                    Login
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>{' | '}</BreadcrumbSeparator>
            </>
          ) : (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link className="hover:font-bold" href="/dashboard">
                    Dashboard
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>{' | '}</BreadcrumbSeparator>
            </>
          )}
          <BreadcrumbLink asChild>
              <Link className='hover:font-bold' href="/about">About</Link>
            </BreadcrumbLink>
        </BreadcrumbList>
      </Breadcrumb>
      </nav>
    </header>
    </div>
    </div>
  );
}
