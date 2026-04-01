
const authenticateUser=(allowedRoles)=>{
   return(req,res,next)=>{
        const role=req.headers.userrole;
         // check role exists
    if (!role) {
      return res.status(401).json({ message: "No role provided" });
    }
        if(!allowedRoles.includes(role)){
            return res.status(403).json({message:"access denied"});
        }
        next();
    };
};

export default authenticateUser;