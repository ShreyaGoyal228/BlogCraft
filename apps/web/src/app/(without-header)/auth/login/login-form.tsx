'use client'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {signIn} from "next-auth/react"
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
const formSchema = z.object({
    email: z.string().min(1,'Email is required').email('Invalid Email'),
    passwordHash: z.string()
    .min(1,'Password is required')
    .min(8,'Password must have 8 characters'),
   
})

const LoginForm=()=>{
    const router=useRouter();
    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        console.log("values are",values);
        const signInData=await signIn("credentials",{
            email:values.email,
            password:values.passwordHash,
            redirect:false
        });
    
        if(signInData?.error)
            {
                 toast({
                    title:"Error in validatingg credentials"
                })
                console.log(signInData?.error)
            }
       if(signInData?.ok)
        { toast({
            title:"User logged in"
        })
        console.log("signIndata",signInData)
        router.push("/")
        }
    }
   
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            passwordHash:"",
        },
    })
    return(
        <>
          <div className='flex items-center justify-center h-screen'>
    <div className=' border rounded-lg p-5 xl:w-1/3 md:w-1/2 w-full'>
   <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                   <div className="space-y-4 w-full">

{/* Email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="john@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
{/* Password */}
                    <FormField
                        control={form.control}
                        name="passwordHash"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter your Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>
                    
                    <Button type="submit" className="w-full mt-4 ">Login</Button>

                    <p className='mt-2 text-center'>{`Don't have an account?`}<Link href="/auth/register" className="text-blue-500 ">SignUp</Link></p>
                </form>
            </Form>
   </div>
   </div>
        </>
    )
}

export default LoginForm;