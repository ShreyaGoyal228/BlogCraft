import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
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
console.log("session is",session?.user.email)
  return (
    <html lang="en" className="container mx-auto ">
      <body>
        {children}
        <Toaster />
       
      </body>
    </html>
  );
}
