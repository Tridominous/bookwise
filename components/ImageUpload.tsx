"use client";

import config from '@/lib/config';
import { cn } from '@/lib/utils';
import { IKImage, IKVideo, ImageKitProvider, IKUpload, ImageKitContext } from "imagekitio-next";
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useToast } from "@/hooks/use-toast"


const {
    env: {
        imagekit: { publicKey, urlEndpoint }
        }
} = config;



const authenticator = async () => {
    try {
       const response = await fetch(`${config.env.prodAPiEndpoint}/api/imagekit`);
       
       if(!response.ok) {
        const errorText = await response.text();

        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
       };

       const data = await response.json();
       const { signature, expire, token } = data;
       return { token, expire, signature };

    } catch (error: any) {
        throw new Error(`Error authenticating with ImageKit: ${error.message}`)
    }
};

interface Props {
    type: 'image' | 'video';
    accept: string;
    placeholder: string;
    folder: string;
    variant: 'dark' | 'light';
    onFileChange: (filePath: string ) => void;
    value?: string;
}

const ImageUpload = ({
    type, 
    accept,
    placeholder,
    folder,
    variant,
    onFileChange,
    value
}: Props) => {

    const ikUploadRef = useRef(null);
    const [file, setFile] = useState<{ filePath: string | null }>({
        filePath: value ?? null,
    });
    const { toast } = useToast();

    const onError = (error: any) => {
        console.log('error uploading file', error);

        toast({
            title: 'Image uploaded failed',
            description: `Your image could not be uploaded. Please try again.`,
            variant: "destructive"
        })
    }
    const onSuccess = (res: any) => {
        setFile(res);
        onFileChange(res.filePath);

        toast({
            title: 'Image uploaded successfully',
            description: `${res.filePath} uploaded successfully!`,
        })
    }

  return (
    <ImageKitProvider
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticator={authenticator}
    >
       <IKUpload
            ref={ikUploadRef}
            className='hidden'
            onError={onError}
            onSuccess={onSuccess}
       /> 

       <button 
        className={cn("upload-btn")}
        onClick={(e) => {
            e.preventDefault();
            if(ikUploadRef.current) {
                // @ts-ignore
            ikUploadRef.current?.click();
            }
        }}
        >
            <Image 
                src="/icons/upload.svg"
                alt="Upload-icon"
                width={20}
                height={20}
                className='object-contain'
            />
            <p className='text-base text-light-100'>Upload a file</p>

            {file && <p className='upload-filename'>{file.filePath}</p>}
       </button>

         {file && <IKImage 
                path={file.filePath || undefined}
                alt={file.filePath || "Card image"}
                 height={500}
                 width={300}
              />
     }
    </ImageKitProvider>
  )
}

export default ImageUpload