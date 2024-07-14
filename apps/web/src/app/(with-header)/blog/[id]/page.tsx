import { db } from "@/server/db"
import ButtonAction from "../../../../components/buttonaction"

const BlogDetailPage = async({ params }: { params: { id: string } }) => {

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
        <div className="flex flex-col gap-4 items-start w-full border border-slate-100 rounded-lg p-5">
           <div>
           <h2 >{blog?.blogTitle}</h2>
           </div>
           <div className="w-full">
           <p className="text-justify break-normal whitespace-normal ">{blog?.blogDescription}</p>
           </div>
           <ButtonAction blog={blog}/>
        </div>
        </>
    )
}
export default BlogDetailPage