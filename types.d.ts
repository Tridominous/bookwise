interface Book {
    id: string;
    title: string;
    author: string;
    genre: string; 
    rating: number; 
    totalCopies: number;
    availableCopies: number;
    coverColor: string;
    coverUrl: string;
    description: string;
    videoUrl?: string | null;
    summary: string;
    createdAt: Date | null;
   
}[]

interface AuthCredentials {
    fullName: string;
    email: string;
    password: string;
    universityId: number;
    universityCard: string;
}

interface BookParams {
    title: string;
    author: string;
    genre: string;
    rating: number;
    coverUrl: string;
    coverColor: string;
    description: string;
    totalCopies: number;
    videoUrl?: string;
    summary: string;
}

interface BorrowBookParams {
    bookId: string;
    userId: string;
}