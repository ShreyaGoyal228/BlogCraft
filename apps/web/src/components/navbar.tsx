'use client'
import { Hexagon } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
type INavbar={
  username:string;

}
const Navbar = ({username}:INavbar) => {

  const handleClick=async()=>
  {
    await signOut({callbackUrl: "/auth/register" });
  
}

  return (
    <>
      <div className="w-full bg-neutral my-5 ">
        <div className="container mx-auto">
       <div className="flex items-center justify-between">
         <div className="">
           <Link href='/'><Hexagon /></Link>
          </div>
          <div className="flex items-center">
         <div className="text-xs md:text-sm font-semibold">{`Welcome ${username}`}</div>
       
            
            <Link className="btn btn-ghost md:text-sm text-xs" href='/create'>Create Post</Link>
          
            
   
          <div onClick={handleClick} className="cursor-pointer text-xs md:text-sm font-semibold">Logout</div>
          </div>
        </div>
        </div>
  
      </div>
    </>
  );
};

export default Navbar;
