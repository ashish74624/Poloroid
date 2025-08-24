"use client"
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import UploadIcon from '../Icons/Upload'
import { Input } from './ui/input'
import convertToBase64 from '../libs/convertToBase64'
import toast from 'react-hot-toast'
import { backendURL } from '../libs/configs'
import { User } from '@/model'
import { usePathname } from 'next/navigation'


export default function UploadFile() {
    const pathname = usePathname();

    const [email, setEmail] = useState<string>("");
    const [userData, setUserData] = useState<User | null>(null);
    const [caption, setCaption] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [file, setFile] = useState<File | null>(null); // store raw file
    const [fileUrl, setFileUrl] = useState<string>("");  // preview

    const cloudName = process.env.CLOUD_NAME

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.[0]) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);

            // show preview immediately
            const previewUrl = URL.createObjectURL(selectedFile);
            setFileUrl(previewUrl);
        }
    };



    useEffect(() => {
        setEmail(localStorage.getItem("email") ?? "");
    }, [pathname]);

    useEffect(() => {
        async function fetchUserData() {
            if (email) {
                try {
                    const res = await fetch(`${backendURL}user/data/${email}/`);
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

    const imageUpload = async () => {
        if (!caption || !file) {
            toast.error("Caption and image are required!");
            return;
        }

        toast.loading("Posting...");
        setIsDisabled(true);

        try {
            // 1. Upload to Cloudinary now
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "all_uploads");

            const cloudRes = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                { method: "POST", body: formData }
            );
            const cloudData = await cloudRes.json();
            if (!cloudData.secure_url) throw new Error("Cloudinary upload failed");

            // 2. Save post in backend with Cloudinary URL
            const res = await fetch(`${backendURL}post/upload/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: userData?.firstName,
                    lastName: userData?.lastName,
                    email,
                    caption,
                    image: cloudData.secure_url,
                }),
            });

            const data = await res.json();
            toast.dismiss();

            if (res.ok) {
                setCaption("");
                setFile(null);
                setFileUrl("");
                toast.success("Post uploaded successfully!");
            } else {
                toast.error("Error while uploading. Please try again.");
            }
        } catch (err) {
            console.error(err);
            toast.dismiss();
            toast.error("Error posting image.");
        } finally {
            setIsDisabled(false);
        }
    };


    return (
        <>
            {fileUrl ? (
                <div className="relative mt-4">
                    <Button
                        className="rounded-full transition h-6 w-6 hover:bg-black text-white bg-black/50 absolute top-2 right-4"
                        onClick={() => { setFile(null); setFileUrl(""); }}
                    >
                        X
                    </Button>
                    <Image src={fileUrl} className="w-full h-96 bg-[#1d1d1f] mx-auto"
                        alt="Preview" width={400} height={400} />
                </div>
            ) : (
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-96 cursor-pointer bg-[#1d1d1f] mx-auto mt-4">
                    <UploadIcon />
                    <p className="mb-2 text-sm text-gray-50 font-semibold">Click to upload</p>
                    <input id="dropzone-file" type="file" className="hidden" onChange={handleImageSelect} />
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
        </>
    )
}
