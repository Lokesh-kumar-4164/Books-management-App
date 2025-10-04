import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY;

const authJWT = async (req, res, next) => {
    try{
        const auth = req.headers.authorization;
        if(!auth || !auth.startsWith("Bearer ")){
            return res.status(401).json({error:"Unauthorized"})
        }
        const token = auth.split(" ")[1];
        const decoded = await jwt.verify(token,secretKey)
        req.user = decoded;
        console.log(decoded)
        next()
    }catch(e){
        console.log(e)
    }
};

export default authJWT;