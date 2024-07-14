'use client'

import BackButton from "@/components/backbutton"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { z } from "zod"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createBlogs } from "./blog-actions"
import { CornerDownLeft } from "lucide-react"

const formSchema = z.object({
    blogTitle: z.string().min(1, "Blog title is required"),
    blogDescription:z.string().min(50,"Blog content should contain atleast 50 words"),
  })

const Create =() => {
    const { toast } = useToast();
    const router=useRouter();
     const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      blogTitle: "",
      blogDescription:"",
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values are",values)
    return createBlogs(values)
    .then((resp)=>{
       if(resp.message)
        {
         toast({
            title: "Successfully created blog",
          })
          router.push("/");
        }
        if(resp.error)
          {
            return toast({
              title: resp.error,
             
            })
          }
    })
    .catch((err)=>{
      return toast({
        title:"Error in creating blog successfully",
        variant:"destructive"
      })
      console.log(err.message);
    })
  }
    return(
        <>
       
        <BackButton/>
        <div className="text-center mb-5">Add New Blog</div>
        <div className="mx-auto w-full md:w-1/2">
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="blogTitle"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="blog title..."
                 {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="blogDescription"
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
                <Textarea className="" placeholder="blog content..." {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <div className="flex items-center justify-center">
        <Button type="submit" >Submit</Button>
        </div>
      </form>
    </Form>
    </div>
          
        </>
    )
}

export default Create