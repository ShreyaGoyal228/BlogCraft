'use server'

import { db } from "@/server/db"
import EditBlogForm from "./edit-blog-form"


const EditBlog =async({ params }: { params: { id: string } }) => {
  const blog=await db.blogs.findUnique({
    select:{
        id:true,
        blogDescription:true,
        blogTitle:true,
    },
    where:{
        id:params.id
    }
})
   return(
    <>
    <EditBlogForm blog={blog}/>
    </>
   )
          
  
}

export default EditBlog