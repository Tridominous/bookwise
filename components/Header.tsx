
import Link from "next/link";
import Image from "next/image";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>

      <ul className="flex flex-row items-center gap-8">
        <li>
          <form
            action={async () => {
              "use server";

              await signOut();
            }}
            className="mb-10"
          >
            <Button>Logout</Button>
          </form>
        </li>
      </ul>
    </header>
  );
};

export default Header;

// "use client";

// import { cn, getInitials } from "@/lib/utils";
// import Link from "next/link"
// import Image from "next/image"
// import { usePathname } from "next/navigation"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Session } from "next-auth";



// const Header = ({session}: {session: Session}) => {
//     const pathname = usePathname();

//   return (
//     <header className="my-10 flex justify-between gap-5">
//         <Link href="/">
//             <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />   
//         </Link>

//         <ul className="flex flex-row items-center gap-8">
//             <li>
//                 <Link href="/library" className={cn("text-base cursor-pointer capitalize", pathname === "/library" ? "text-light-200" : "text-light-100")}>
//                     Library
//                 </Link>
//             </li>

//             <li>
//                 <Link href="/my-profile">
//                     <Avatar>
//                         <AvatarFallback className="bg-light-200 text-bold">
//                             {getInitials(session?.user?.name || "IN")}
//                         </AvatarFallback>
//                     </Avatar>
//                 </Link>
//             </li>
//         </ul>
//     </header>
//   )
// }

// export default Header