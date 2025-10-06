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
    <header className="header flex justify-between items-center  py-4 border-b border-gray-800">
      <div className="">
      <Link
        href="/"
        className="p-2 text-xl h-12 font-bold font-poppins text-white hover:text-gray-300 transition"
      >
        Todo App{" "}
      </Link>
      </div>
      <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
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
      </div>
    </header>
  );
}
