'use client'
import React, { useEffect, useState } from 'react'
import Insta from '../Icons/Insta';
import Linkedin from '../Icons/Linkedin';
import Github from '../Icons/Github';
import Link from 'next/link';
import { Button } from './ui/button';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import toast from 'react-hot-toast';
let backendURL = process.env.BACKEND

interface SocialCompProps {
    email: string
}

export default function Social({ email }: SocialCompProps) {
    const [insta, setInsta] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [github, setGithub] = useState("");

    useEffect(() => {
        const getSocials = async (email: any) => {
            const res = await fetch(`${backendURL}social/getSocials/${decodeURIComponent(email)}`);
            const data = await res.json();
            // console.log(data.social)
            setInsta(data.social.instagram);
            setLinkedin(data.social.linkedin);
            setGithub(data.social.github);
        }
        getSocials(email);


    }, [email])

    const isSocialEmpty = !insta && !linkedin && !github;

    const handleSocialUpload = async () => {
        await toast.promise(
            fetch(`${backendURL}social/addSocial/${decodeURIComponent(email)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    instagram: insta,
                    linkedin: linkedin,
                    github: github
                })
            }).then(async (res) => {
                if (!res.ok) {
                    throw new Error("Failed to update socials");
                }
            }),
            {
                loading: "Updating...",
                success: "Socials updated",
                error: "Unable to update the social at the moment"
            }
        );
    };



    function changeHandler(e: React.ChangeEvent<HTMLInputElement>): void {
        const { id, value } = e.target;
        if (id === "github") {
            setGithub(value);
        } else if (id === "linkedin") {
            setLinkedin(value);
        } else if (id === "insta") {
            setInsta(value);
        }
    }

    return (
        <div className='w-max h-full hidden  md:flex items-center flex-col gap-y-4  p-6 relative group'>
            {github.length > 0
                &&
                <SocialComponent icon={<Github width="20px" height="20px" />} link={github} />
            }
            {linkedin.length > 0
                &&
                <SocialComponent icon={<Linkedin width="20px" height="20px" />} link={linkedin} />
            }
            {insta.length > 0
                &&
                <SocialComponent icon={<Insta width="20px" height="20px" />} link={insta} />
            }

            <Dialog>
                <DialogTrigger asChild>
                    {
                        isSocialEmpty
                            ?
                            <Button variant="default">Add Socials</Button>
                            :

                            <Button className='absolute hidden -top-4 right-0 group-hover:inline transition-all duration-300' >
                                <Pencil2Icon />
                            </Button>
                    }

                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">

                    <DialogHeader>

                        <DialogTitle>Edit Socials</DialogTitle>

                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="github" className="text-right">
                                Github
                            </Label>
                            <Input id="github" value={github} onChange={(e) => changeHandler(e)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="linkedin" className="text-right">
                                Linkdin
                            </Label>
                            <Input id="linkedin" value={linkedin} onChange={(e) => changeHandler(e)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="insta" className="text-right">
                                Instagram
                            </Label>
                            <Input id="insta" value={insta} onChange={(e) => changeHandler(e)} className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleSocialUpload}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}


interface SocialProps {
    icon: React.JSX.Element;
    link: string;
}

const SocialComponent = ({ icon, link }: SocialProps) => (
    <p className='flex items-center gap-x-2 h-max  text-xs text-white'>
        {icon}
        <a href={link} className='hover:underline transition-all duration-200' target="_blank" rel="noopener noreferrer">{link}</a>
    </p>
)