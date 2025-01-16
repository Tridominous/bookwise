interface Book {
    id: number;
    title: string;
    author: string;
    genre: string; 
    rating: number; 
    totalCopies: number;
    availableCopies: number;
    coverColor: string;
    coverUrl: string;
    description: string;
    video: string;
    summary: string;
    isLoanedBook: boolean;
}