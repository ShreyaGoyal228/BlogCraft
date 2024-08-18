'use server'

import { db } from "@/server/db"
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type IBlogs={
    blogTitle:string;
    blogDescription:string;
 
}
export const createBlogs=async(values:IBlogs)=>{
    
    const session=await getServerSession();
    if(!session)
      {
        return{
            message:"Unauthorized"
        }
      }
      const user=await db.user.findFirst({
        where:{
          email:session?.user.email || ""
        }
      })
    const {blogTitle,blogDescription}=values;

    const FormData=z.object({
        blogTitle:z.string().min(1),
        blogDescription:z.string().min(1)
    })

    const isValidData=FormData.parse({        
        blogDescription,
        blogTitle
    })

    if(!isValidData)
    {
        return{
            error:"Invalid data"
        }
    }

    try{
        await db.blogs.create({
            data:{
                userId:user?.id!,
                blogTitle,
                blogDescription,
            }
        })
        revalidatePath('/create');
        return {
            message: 'User created successfully'
          };
    }
    catch(err:any)
    {
        return{
            error:err?.message || "Error in creating blog"
        }
    }
  

   
}

export const updateBlogs=async(values:IBlogs,id:string|undefined)=>{
    const {blogTitle,blogDescription}=values;

    const FormData=z.object({
        blogTitle:z.string().min(1),
        blogDescription:z.string().min(1)
    })

    const isValidData=FormData.parse({
        blogDescription,
        blogTitle
    })

    if(!isValidData)
    {
        return{
            error:"Invalid data"
        }
    }

    try{
        await db.blogs.update({
            where:{
               id:id
            },
            data:{
                blogTitle,
                blogDescription,
            }
        })
        revalidatePath('/edit');
        return {
            message: 'Blog updated successfully'
          };
    }
    catch(err:any)
    {
        return{
            error:err?.message || "Error in updating blog"
        }
    }

}

export const deleteBlogs=async(blogId:string|undefined)=>{
    const deleteUser = await db.blogs.delete({
        where: {
          id:blogId
        },
      })

      return{
        message:"Blog deleted successfully"
      }
}