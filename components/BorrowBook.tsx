"use client";

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { borrowBook } from '@/lib/actions/book';

interface Props {
    userId: string;
    bookId: string;
    borrowingEligibility: {
        isEligible: boolean;
        message: string;
    }
}

const BorrowBook = ({ userId, bookId, borrowingEligibility: {isEligible, message}}: Props) => {
    const router = useRouter();
    const [borrowing, setBorrowing] = useState(false);

    const handleBorrrowBook = async () => {
        if (!isEligible) {
            toast({
                title: 'Error',
                description: message,
                variant: "destructive",
            })
        };
        setBorrowing(true);

        try {
           const result = await borrowBook({ userId, bookId });
           if (result.success) {
               toast({
                   title: 'Success',
                   description: 'Book borrowed successfully',
                });

                router.push('/');
            } else {
                toast({
                    title: 'Error',
                    description: result.error,
                    variant: 'destructive',
                });
              }
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'Error borrowing book',
                variant: 'destructive',
            });
        } finally {
            setBorrowing(false);
        }
    }

  return (
    <Button 
        className='book-overview_btn' 
        onClick={handleBorrrowBook} 
        disabled={borrowing}>
        <Image src="/icons/book.svg" alt="book" width={20} height={20} />
        <p className='font-bebas-neue text-xl text-dark-100'>
            {borrowing ? 'Borrowing...' : 'Borrow Book'}
        </p>
</Button>
  )
}

export default BorrowBook