import {auth} from '@/auth';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(req:NextRequest){
    const session = await auth();

    const currentUserEmail = session?.user?.email;
    const data = await req.json();
    data.age = Number(data.age);

    // in production do data validation to make sure data format fits whats acceptable in db 

    try {
        const user = await prisma.user.update({
            where: {
                email: currentUserEmail!,
            },
            data,
        });
        return NextResponse.json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }

}