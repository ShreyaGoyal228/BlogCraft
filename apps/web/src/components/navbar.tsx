"use client";
import { Hexagon } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
type INavbar = {
  username: string;
};
const Navbar = ({ username }: INavbar) => {
  const handleClick = async () => {
    await signOut({ callbackUrl: "/auth/register" });
  };

  return (
    <>
      <div className="my-5 w-full bg-neutral ">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="">
              <Link href="/">
                <Hexagon className="text-white" />
              </Link>
            </div>
            <div className="flex items-center">
              <div className="text-xs font-semibold text-white md:text-sm">{`Welcome ${username}`}</div>

              <Link
                className="btn btn-ghost text-xs text-white md:text-sm"
                href="/create"
              >
                Create Post
              </Link>

              <div
                onClick={handleClick}
                className="cursor-pointer text-xs font-semibold text-white md:text-sm"
              >
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
