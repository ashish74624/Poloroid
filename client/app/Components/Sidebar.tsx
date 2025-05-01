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
  const noSidebarRoutes = ["/", "/login", "/register"];
  const [email, setEmail] = useState<string>("");
  const [userData, setUserData] = useState<User | null>(null);
  const [file, setFile] = useState<string>("");
  const [caption, setCaption] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();

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

  const logoutFn = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("email");
      router.push("/");
    }
  };

  return (
    <aside
      className={`overflow-hidden h-screen ${noSidebarRoutes.includes(pathname) ? "hidden" : "block"
        } w-full md:w-[35%] lg:w-[18%] md:border-r border-borderColor`}
    >
      <div className="bg-[#F8F8F8] flex flex-col items-center space-y-2 mt-4 px-2 font-medium">
        <h1 className="text-2xl lg:text-3xl text-[#58b8e8] mb-6 hidden md:block">
          polaroid
        </h1>

        {sidebarArray.map((item, i) => (
          <SidebarNav key={i} href={`${item.href}/${email}`} name={item.name} />
        ))}

        <Dialog>
          <DialogTrigger className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus:outline-[#F8C732] bg-primaryYellow text-primary-foreground shadow h-9 px-4 py-2">
              Add Post
          </DialogTrigger>
          <DialogContent>
            {file ? (
              <div className="relative mt-4">
                <Button
                  className="rounded-full transition h-6 w-6 hover:bg-black text-white bg-black/50 absolute top-2 right-4"
                  onClick={() => setFile("")}
                >
                  X
                </Button>
                <Image
                  src={file}
                  className="w-full h-96 bg-[#1d1d1f] mx-auto"
                  alt="Uploaded Image"
                  width={400}
                  height={400}
                />
              </div>
            ) : (
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-96 cursor-pointer bg-[#1d1d1f] mx-auto mt-4"
              >
                <div className="flex flex-col justify-start items-center">
                  <UploadIcon />
                  <p className="mb-2 text-sm text-gray-50 font-semibold">
                    Click to upload
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleImageSelect}
                />
              </label>
            )}

            <Input
              id="caption"
              className="bg-white flex-grow pl-4 min-h-[65px] border border-black"
              type="text"
              placeholder="Enter Caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <Button
              disabled={isDisabled}
              className="bg-[#F8C732] text-xl hover:bg-[#f9d25f]"
              onClick={imageUpload}
            >
              Post
            </Button>
          </DialogContent>
        </Dialog>

        <a
          className="w-full"
          href="https://github.com/ashish74624/MERNsocial"
          target="_blank"
        >
          <Button className="flex space-x-2 h-10 w-full">
            {/* <span>
              <GithubLogo />
            </span> */}
            <span className="self-center">GitHub</span>
          </Button>
        </a>

        <Button onClick={logoutFn} className="w-full">
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
