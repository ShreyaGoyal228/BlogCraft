'use client'
import { Trash2 } from "lucide-react";
import {Pencil} from 'lucide-react'
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteBlogs } from "../app/(with-header)/create/blog-actions";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
export type IBlog={
  id:string;
  blogTitle:string;
  blogDescription:string;
}|null
const ButtonAction = ({blog}:{blog:IBlog}) => {
  const router=useRouter();
  const handleDelete=()=>{
    deleteBlogs(blog?.id)
    .then((resp)=>{
      toast({
        title:resp.message
      })
      router.push("/");
    })
    .catch((err)=>{
      return toast({
        title:"Error in deleting the blogs",
        variant:"destructive"
      })
    })
  }
  return (
    <>
    <div className="flex flex-row gap-3">
      <Link className="btn" href={`/edit/${blog?.id}`}><Pencil/> Edit</Link>
      <AlertDialog>
      <AlertDialogTrigger asChild>
      <button className="btn btn-error">
        {" "}
        <Trash2 /> Delete
      </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this blog ?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
      </div>
    </>
  );
};

export default ButtonAction;
