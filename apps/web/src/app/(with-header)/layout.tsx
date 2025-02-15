import "@/styles/globals.css";


import { TRPCReactProvider } from "@/trpc/react";
import Navbar from "../../components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "BlogCraft",
  description: "BlogCraft App",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session=await getServerSession();
  const user=await db.user.findFirst({
    where:{
      email:session?.user.email || ""
    }
  })
  return (
    <html lang="en" className="container mx-auto">
      <body>
      <Navbar username={user?.name!}/>
      <div className=" ">
        {children}
        <Toaster />
        </div>
      </body>
    </html>
  );
}
