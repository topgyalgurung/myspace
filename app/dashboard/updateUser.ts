"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// import {z} from 'zod';  // for server side to validate form fiels

export async function updateUser(formData: FormData){
    
    const session = await auth();

    if (!session?.user?.email) {
        throw new Error("Not authenticated");
    }

    const rawData ={
         name: formData.get("name") as string,
         bio: formData.get("bio") as string,
         age: Number(formData.get("age")),
         image:formData.get("image") as string,
    }

    await prisma.user.update({
        where: { email: session.user.email },
        data: rawData,
    });
    revalidatePath(`/users/${session.user.id}`); // refetch & cache, revalidate and update server component

    return { success: true };
}