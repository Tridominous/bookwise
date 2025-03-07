import ImageKit from "imagekit";
import dummybooks from "../dummybooks.json";
import { books } from "./schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";

config( {path: ".env.local"});

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({client: sql});

const imagekt = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!
    });
const uploadToImageKit = async (url: string, fileName: string, folder: string) => {
    try {
        const response = await imagekt.upload({
            file: url, // URL of the file to upload
            fileName, // Name of the file to be saved on ImageKit
            folder, // Folder path in ImageKit
        });
        return response.filePath;
    } catch (error) {
        console.error("Error uploading image to ImageKit: ", error);
        throw error;
    }
}

const seed = async () => {
    // Seed the database
    console.log("Seeding the database...");

    try {
        for (const book of dummybooks) {
          const coverUrl = await uploadToImageKit(
            book.coverUrl,
            `${book.title}.jpg`,
            "/books/covers"
          ) as string;
          
          const videoUrl = await uploadToImageKit(
            book.videoUrl,
            `${book.title}.mp4`,
            "/books/videos"
          ) as string;
          
          // Add the book to the database
          await db.insert(books).values({
           ...book,
           coverUrl,
            videoUrl,
            })
        }

        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding the database: ", error);
        
    }
}

seed();