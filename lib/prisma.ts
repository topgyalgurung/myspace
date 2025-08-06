import { PrismaClient } from "./generated/prisma"
// import { PrismaClient } from '../app/generated/prisma/index';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
 
export const prisma = globalForPrisma.prisma || new PrismaClient()
 
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma