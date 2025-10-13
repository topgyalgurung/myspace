
export const runtime = "nodejs";

// Request(standard web api) 
// NextRequest(build upon standar Request) - for cookies,nextUrl, ip, geo 

import { NextRequest, NextResponse } from "next/server";
import {auth} from '@/auth';
import {prisma} from '@/lib/prisma';

// when user follows a user 
export async function POST(req:Request){
    const session = await auth();
    
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const currentUserEmail = session.user.email;
    const {targetUserId} = await req.json();

    const user = await prisma.user.findUnique({
        where:{email: currentUserEmail}
    });

    if (!user?.id) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const record = await prisma.follows.create({
        data:{
            followerId: user.id,
            followingId: targetUserId,
        },
    });
    return NextResponse.json(record);
}

// when user unfollows a user
export async function DELETE(req:NextRequest){
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentUserEmail = session.user.email;
    const targetUserId = req.nextUrl.searchParams.get('targetUserId');

    if (!targetUserId) {
        return NextResponse.json({ error: "Target user ID is required" }, { status: 400 });
    }

    const user = await prisma.user
        .findUnique({where: {email: currentUserEmail}});

    if (!user?.id) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const record = await prisma.follows.delete({
        where:{
            followerId_followingId:{
                followerId: user.id,
                followingId: targetUserId,
            }
        }
    })
    return NextResponse.json(record);
}