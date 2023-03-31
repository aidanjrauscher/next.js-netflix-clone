// import {PrismaClient} from "@prisma/client"

// const client = global.prismadb ||  new PrismaClient()

// if(process.env.NODE_ENV==="production") global.prismadb = client;

// export default client;

import { PrismaClient } from '@prisma/client'

const prisma =
  global.prisma ||
  new PrismaClient({
  })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export default prisma