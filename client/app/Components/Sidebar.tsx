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
import { useRouter } from 'next/navigation';

export const sidebarArray = [
  { name: "Home", href: "/home" },
  { name: "Profile", href: "/profile" },
  { name: "Friends", href: "/friends" },
  { name: "Notifications", href: "/notifications" },
  { name: "FAQ", href: "/faq" },
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
  const noSidebarRoutes = ["/", "/login","/register"];

  const [email, setEmail] = useState<string>("");
  const [userData, setUserData] = useState<User | null>(null);
  const [file, setFile] = useState<string>("");
  const [caption, setCaption] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setEmail(localStorage.getItem("email") ?? "");
  }, [pathname]);

  useEffect(() => {
    async function fetchUserData() {
      if (email) {
        try {
          const res = await fetch(`${backendURL}/user/data/${email}`);
          if (!res.ok) throw new Error("Failed to fetch user data");
          const data: User = await res.json();
          setUserData(data);
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchUserData();
  }, [email]);

  const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const base64 = await convertToBase64(event.target.files[0]);
      setFile(base64 as string);
    }
  };

  const imageUpload = async () => {
    if (!caption || !file) {
      toast.error("Caption and image are required!");
      return;
    }

    toast.loading("Posting...");
    setIsDisabled(true);

    try {
      const res = await fetch(`${backendURL}/post/upload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: userData?.firstName,
          lastName: userData?.lastName,
          email,
          caption,
          image: file,
        }),
      });

      const data = await res.json();
      toast.dismiss();

      if (data.status === "ok") {
        setCaption("");
        setFile("");
        toast.success("Post uploaded successfully!");
      } else {
        toast.error("Error while uploading. Please try again.");
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Error posting image.");
    } finally {
      setIsDisabled(false);
    }
  };

  const router = useRouter();

  const logoutFn=()=> {

    // Ensure this runs in a browser environment
    if (typeof window !== 'undefined') {
      localStorage.removeItem('email');
      router.push('/');
    }
  }

  return (
    <aside className={`overflow-hidden ${noSidebarRoutes.includes(pathname) ? "hidden" : " block"} w-full md:w-[35%] lg:w-[18%] md:border-r border-borderColor`}>
      <div className="bg-[#F8F8F8] flex flex-col items-center space-y-2 mt-4 px-2 font-medium">
        <h1 className="text-2xl lg:text-3xl text-[#58b8e8] mb-6 hidden md:block">polaroid</h1>

        {sidebarArray.map((item, i) => (
          <SidebarNav key={i} href={`${item.href}/${email}`} name={item.name} />
        ))}

        <Dialog>
          <DialogTrigger className=" focus:outline-[#F8C732] px-4 py-2 bg-primaryYellow text-white rounded-lg lg:max-w-[250px] w-full flex justify-center text-lg  ">
            Add Post
          </DialogTrigger>
          <DialogContent>
            {file ? (
              <div className="relative mt-4">
                <button
                  className="px-3 py-1 rounded-full transition hover:bg-black text-white bg-black/50 absolute top-2 right-4"
                  onClick={() => setFile("")}
                >
                  X
                </button>
                <Image src={file} className="w-full h-96 bg-[#1d1d1f] mx-auto" alt="Uploaded Image" width={400} height={400} />
              </div>
            ) : (
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-96 cursor-pointer bg-[#1d1d1f] mx-auto mt-4">
                <div className="flex flex-col justify-start items-center">
                  <svg className="h-10 w-10 mx-auto text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-50 font-semibold">Click to upload</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={handleImageSelect} />
              </label>
            )}

            <input className="bg-white flex-grow pl-4 min-h-[65px] border border-black" type="text" placeholder="Enter Caption" value={caption} onChange={(e) => setCaption(e.target.value)} />

            <div className="w-full">
              <button
                disabled={isDisabled}
                className="bg-[#F8C732] h-10 w-24 text-xl rounded-lg text-gray-200 font-semibold flex items-center justify-center mx-auto"
                onClick={imageUpload}
              >
                Post
              </button>
            </div>
          </DialogContent>
        </Dialog>
        <a
          className="rounded-lg focus:outline-[#F8C732] px-4 bg-[#181717] hover:bg-white hover:border hover:border-black hover:text-black transition py-1 text-white lg:max-w-[250px] w-full flex justify-center text-lg"
          href="https://github.com/ashish74624/MERNsocial"
          target="_blank"
        >
          <div className="flex space-x-2 h-10">
            <span>
              <GithubLogo />
            </span>
            <span className="self-center">GitHub</span>
          </div>
        </a>
        <Button onClick={logoutFn}>
          Logout
        </Button>
      </div>
    </aside>
  );
}

interface NavProps {
  href: string;
  name: string;
}

function SidebarNav({ href, name }: NavProps) {
  return (
    <Link className="focus:outline-[#F8C732] px-4 py-2 bg-[#58b8e8] text-white rounded-lg lg:max-w-[250px] w-full flex justify-center text-lg" href={href}>
      {name}
    </Link>
  );
}
