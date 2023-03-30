import bcrypt from "bcrypt"
import prismadb from "../../lib/prismadb"

export default async function handler(req, res){
    if(req.method != 'POST'){
        return res.status(405).end()
    }
    
    try{
        const { email, username, password } = req.body
        const registeredUser = await prismadb.user.findUnique({
            where: {
                email: email
            }
        }) 
        if(registeredUser){
            return res.status(422).json({error: "Email already registered."})
        }
        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prismadb.user.create({
            data:{
                email,
                username, 
                hashedPassword,
                img: "",
                emailVerified: new Date()
            }
        })
        return res.status(200).json(user);

    } catch(error){
        console.log(error)
        return res.status(400).end()
    }
}