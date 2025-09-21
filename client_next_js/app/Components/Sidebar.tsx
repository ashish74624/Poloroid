"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import GithubLogo from "../Icons/GithubLogo";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import convertToBase64 from "../lib/convertToBase64";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import UploadIcon from "../Icons/Upload";
import SidebarContent from "./SidebarContent";

export const sidebarArray = [
  { name: "Home", href: "/home" },
  { name: "Profile", href: "/profile" },
  { name: "Friends", href: "/friends" },
  { name: "Notifications", href: "/notifications" },
];

const backendURL = process.env.BACKEND || "";

interface Friend {
  id: string;
  _id: string;
}

interface Request {
  sentTo: { id: string };
  _id: string;
}

interface RejectedBy {
  id: string;
  _id: string;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
  place: string;
  friends: Friend[];
  notifications: any[];
  request: Request[];
  rejectedBy: RejectedBy[];
  __v: number;
}

export default function Sidebar() {
  const pathname = usePathname();
  const noSidebarRoutes = ["/", "/login", "/register",""];
 
  return (
    <aside
      className={`overflow-hidden h-screen ${noSidebarRoutes.includes(pathname) ? "hidden" : "hidden md:block"
        } w-full md:w-[30%] lg:w-[18%] md:border-r border-borderColor `}
    >
      <SidebarContent/>
    </aside>
  );
}

interface NavProps {
  href: string;
  name: string;
}

export function SidebarNav({ href, name }: NavProps) {
  return (
    <Link
      className="w-full"
      href={href}
    >
      <Button className="w-full" >
        {name}
      </Button>
    </Link>
  );
}
