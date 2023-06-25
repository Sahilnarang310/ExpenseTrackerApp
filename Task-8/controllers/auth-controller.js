const User=require('../models');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

exports.postAdduser=async(req,res,next)=>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;

    try{
        const user=await User.findOne({where:{email:email}
        });
        if(user){
            return res.status(400).json({
                error:'User already exists',
                user:user
            });
        }
      const  hashPassword=await bcrypt.hash(password,20);
      const newUser=await User.create({
        name:name,
        email:email,
        password:hashedPasseword
      });
      res.status(201).json({
        user:newUser
      });
    }
    catch (err) {
        console.log('err');
        return res.stauts(500).json({
            error:err
        });
    }
}
exports.postLoginUser=async(res,req,next)=>{
    const email=req.body.eamil;
    const password=req.body.password;
    try{
        const user=await User.findOne({where:{email:email}
        });
        if(!user){
            return res.status(404).json({
                error:'User does not exist'
            });
        }
        console.log(password,user.password);
        const validPassword=await bcrypt.compare(password,user.password);
        if(!validPassword){
            return res.status(401).json({
                error:'Invalid password'
            });
        }
        const token = jwt.sign(
            {
                id: user.id,
                name: user.name
            },
            'yeduniyamch',
            { expiresIn: '1h' }
        );
        res.status(200).json({
            message: "Login successful",
            // user: user
            token: token
        });
    
} catch (err) {
    console.log(err);
    return res.status(500).json({
        error: err
    });
}
}