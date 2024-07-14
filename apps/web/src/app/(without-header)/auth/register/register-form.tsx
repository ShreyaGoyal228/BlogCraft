'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createUser } from '../user-actions'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
export type IUser={
    name:string;
    email:string;
    passwordHash:string;
}
const formSchema = z.object({
    name:z.string().min(3,"Name should contains atleast 5 char")
    .max(6,"Name can be max contains 6 char"),
    email: z.string().min(1,'Email is required').email('Invalid Email'),
    passwordHash: z.string()
    .min(1,'Password is required')
    .min(8,'Password must have 8 characters'),
   
})
const RegisterForm = () => {
    const router=useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
          name:"",
            passwordHash:"",
        },
    })
const callServerAction=(data:IUser)=>{
    return createUser(data)
}
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
        return callServerAction(values)
        .then((resp)=>{
            toast({
                title:resp.message
            })
            router.push("/auth/login")
        })
        .catch((error)=>{
            return toast({
                title:"Error in creating user's account",
                variant:"destructive"
            })
        })
    }
  return (
   <>
   <div className='flex items-center justify-center h-screen'>
    <div className=' border rounded-lg p-5 xl:w-1/3 md:w-1/2 w-full'>
   <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                   <div className="space-y-4 w-full">

{/* Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="john" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                    
                    <Button type="submit" className="w-full mt-4 ">Sign Up</Button>

                    <p className='mt-2 text-center'>Already have a account? <Link href="/auth/login" className="text-blue-500 ">Login</Link></p>
                </form>
            </Form>
   </div>
   </div>
   </>
  )
}

export default RegisterForm;