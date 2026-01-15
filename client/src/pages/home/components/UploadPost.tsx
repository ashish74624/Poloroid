import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useCloudinaryUpload } from '@/hooks/useCloudinaryUpload';
import { usePost } from '@/hooks/usePost';
import { getEmailFromToken } from '@/lib/utils';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function UploadPost() {

    const [file, setFile] = useState<File | null>(null);
    const [caption, setCaption] = useState('');
    const { uploadImage, uploading } = useCloudinaryUpload()
    const { createPost } = usePost()
    const email = getEmailFromToken()



    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;

        // Validate image type
        if (!selectedFile.type.startsWith('image/')) {
            toast.error('Please select a valid image file');
            return;
        }

        setFile(selectedFile);
    };


    const imageUpload = async () => {
        let finalImageUrl = null;
        if (file) {
            const uploadedUrl = await uploadImage(file)
            if (!uploadedUrl) {
                toast.error("Could not upload profile image");
                return;
            }

            finalImageUrl = uploadedUrl;
        }


        if (finalImageUrl && email) {
            createPost.mutate({
                email: email,
                image: finalImageUrl,
                caption: caption
            },
                {
                    onSuccess: () => {
                        toast.success("Post uploaded successfully");
                    },
                    onError: () => {
                        toast.error("Unable to upload post at the moment");
                    }
                }
            )
        }

    }


    return (
        <Dialog>
            <DialogTrigger asChild className="w-full">
                    <Button size="lg" className="w-full">
                        Add Post
                    </Button>
            </DialogTrigger>
            <DialogContent>
                {file ?
                    (<>
                        <div className="relative mt-4">
                            <button className="px-3 py-1 rounded-full transition hover:bg-black text-white bg-black/50 absolute top-2 right-4"
                                onClick={() => { setFile(null) }}
                            >X</button>
                            <img src={URL.createObjectURL(file)} className="flex flex-col items-center justify-center w-full h-96 bg-[#1d1d1f] mx-auto" alt='Hello' width={100} height={100} />
                        </div>
                        <input className="bg-white flex-grow pl-4 min-h-[65px] border border-black" name="caption" placeholder='Enter Caption' onChange={(e) => { setCaption(e.target.value) }} />
                    </>)
                    :
                    (<>
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-96  cursor-pointer bg-[#1d1d1f] mx-auto mt-4">
                            <div className=" flex flex-col justify-start items-center">
                                <svg className="h-10 w-10 mx-auto text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-50 font-semibold">Click to upload</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" onChange={handleImageSelect} />
                        </label>
                        <input className="bg-white flex-grow pl-4 min-h-[65px] border border-black" type="text" name="caption" id="" placeholder='Enter Caption' onChange={(e) => { setCaption(e.target.value) }} />
                    </>)}
                <div className='w-full'>
                    <Button
                        disabled={uploading}
                        className='w-full'
                        onClick={imageUpload}>
                        Post
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
