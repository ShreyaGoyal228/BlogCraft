
import { db } from "@/server/db";
import PostCard from "@/components/postcard";
import { redirect } from 'next/navigation'
import { getServerSession } from "next-auth";
export default async function Home() {
  const session =await getServerSession();
console.log("sessssssion is",session);
  const user=await db.user.findFirst({
    where:{
      email:session?.user.email || ""
    }
  })
console.log("session after user logged in is",user?.id)
  if(!session)
    { redirect("/auth/login");
    }
const blogs=await db.blogs.findMany({
  where:{
   userId:user?.id
  },
  select:{
    id:true,
    blogTitle:true,
    blogDescription:true,
    createdAt:true,
  }
})

  return (
    <>
   
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-3 gap-2 ">
         {blogs.map((blog)=>(
          <>
          <PostCard blog={blog}/>
          </>
         ))}
         </div>
  
  
    </>
  );
}

