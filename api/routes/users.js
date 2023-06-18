const router = require("express").Router();
const User = require("../models/User.js")

//update user

router.put("/:id", async (req,res)=> {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch(err){
                return res.status(500).json(err)
            }
        }

        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                 $set: req.body
            })
            res.status(200).json("Account has been updated")
        } catch(err){
            return res.status(500).json(err);
        }
         
    } else{
        return res.status(403).json("you can update only your passsword")
    }
})

//delete user

router.delete("/:id", async (req,res)=> {
    if (req.body.userId === req.params.id || req.body.isAdmin) {       
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted successfully");
        } catch(err){
            return res.status(500).json(err);
        }
         
    } else{
        return res.status(403).json("you can update only your passsword");
    }
})

//get user
router.get("/", async (req, res)=> {
    const userId = req.query.userId;
    const username = req.query.username;
    try{
        const user = userId 
        ? await User.findById(userId)
        : await User.findOne({username: username});
        const {password, updatedAt, ...other} = user._doc;
        res.status(200).json(other);
    } catch(err){
        res.status(404).json("could not find the user");
    }
})

//get friends
router.get("/friends/:userId", async (req,res) => {
    try {
        const user = await User.findById(req.params.userId)
        const followingUsers = await Promise.all(
            user.followings.map(followingId=> {
                return User.findById(followingId)
            })
        )
        let followingList = []
        followingUsers.map(followingUser => {
            const {_id, username, profilePicture } = followingUser
            followingList.push({_id, username, profilePicture })
        })

        res.status(200).json(followingList)
    } catch (error) {
        res.status(500).json(error)
    }
})

// follow a user
router.put("/:id/follow", async (req,res)=> {
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)){
                await user.updateOne({$push: {followers: req.body.userId}});
                await currentUser.updateOne({$push: {followings: req.params.id}});
                res.status(200).json("user has been folowed successfully")
            }else{
                res.status(403).json("you already follow this user");
            }
        } catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(500).json("You cannot follow yourself");
    }
})

// unfollow a user
router.put("/:id/unfollow", async (req,res)=> {
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)){
                await user.updateOne({$pull: {followers: req.body.userId}});
                await currentUser.updateOne({$pull: {followings: req.params.id}});
                res.status(200).json("user has been unfolowed successfully")
            }else{
                res.status(403).json("you dont follow this user");
            }
        } catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(500).json("You cannot unfollow yourself");
    }
})


module.exports = router



