const router = require("express").Router();
const User = require("../models/User.js");
const bcrypt  = require("bcrypt");


//Register
router.post("/register", async (req,res)=> {
      try{
        //Generate Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        ///Create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
          })


        //Save new user
        const user = await newUser.save()
        res.status(200).json(user)
      } 
      catch(err){
        res.status(500).json(err) 
      }
})

// router.get("/register", async (req,res)=> {
//     const user = await new User({
//         username: "hamza",
//         email: "hamza@gmail.com",
//         password: "12345"
//     });

//     await user.save()
//     res.send("ok")   
// })

//Login 
router.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        // !user && res.status(404).json({"Error":"user not found"});

        // const validpassword = await bcrypt.compare(req.body.password, user.password);
        // !validpassword && res.status(404).json({"Error":"user found but wrong password"});
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
          return res.status(404).json({ error: "Incorrect password" });
      }

        res.status(200).json(user)
    } catch(err){
        res.status(500).json(err)
        // console.log(err)
    }
})


module.exports = router;