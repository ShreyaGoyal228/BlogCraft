'use server'

import { db } from "@/server/db"
import { IUser } from "./register/register-form"
import { z } from "zod";
import { revalidatePath } from "next/cache";
import {hash} from "bcrypt"

export const createUser=async(data:IUser)=>{
   const{email,name,passwordHash}=data;

   const FormSchema=z.object({
    email:z.string().email(),
    name:z.string().min(1),
    passwordHash:z.string().min(3)
   })

   const isValidData=FormSchema.parse({
    email,
    name,
    passwordHash
   })

   if(!isValidData)
   {
    return{
        error:"Invalid data"
    }
   }

   //user with the mail id already exists
   const existingUserByEmail=await db.user.findFirst({
    where:{
        email:isValidData.email
    }
   })
   if(existingUserByEmail)
    {
        return{
            message:"User with this mail id already exists"
        }
    }

    //user with the username already exists
    const existingUserByName=await db.user.findFirst({
        where:{
            name:isValidData.name
        }
       })
       if(existingUserByName)
        {
            return{
                message:"Username already exists"
            }
        }

 //does not saving passwords directly converting into coded format
 const hashedPassword=await hash(isValidData.passwordHash,10)
   try{
    await db.user.create({
        data:{
            email:isValidData.email,
            name:isValidData.name,
            passwordHash:hashedPassword
        }
    })

    revalidatePath("/auth/register");
    return{
        message:"User created successfully"
    }
   }
   catch(error)
   {
    return{
        error:"Error in creating the account"
    }
   }



}

// export const updateUser=async(data:IUser)=>{
//     const{email,name,passwordHash}=data;
 
//     const FormSchema=z.object({
//      email:z.string().email(),
//      name:z.string().min(1),
//      passwordHash:z.string().min(3)
//     })
 
//     const isValidData=FormSchema.parse({
//      email,
//      name,
//      passwordHash
//     })
 
//     if(!isValidData)
//     {
//      return{
//          error:"Invalid data"
//      }
//     }
//     try{
//      await db.user.create({
//          data:{
//              email:isValidData.email,
//              name:isValidData.name,
//              passwordHash:isValidData.passwordHash
//          }
//      })
 
//      revalidatePath("/auth/register");
//      return{
//          message:"User created successfully"
//      }
//     }
//     catch(err)
//     {
//      return{
//          error:"Error in creating the account"
//      }
//     }
 
 
 
//  }