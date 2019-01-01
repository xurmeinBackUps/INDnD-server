var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs')

router.post('/new', function(req, res){ 
    let Username = req.body.user.username;
    let pinhash = req.body.user.pin;
    let Email = req.body.user.email;

    User.create({
        username: Username,
        pin: bcrypt.hashSync(pinhash, 10),
        email: Email
    }).then(
        function createUserSuccess(user){
            let token = jwt.sign({id: user.id}, process.env.SIGN, {expiresIn: 60*60*16});
            res.json({
               username: user,
               message: 'Successfully registered!',
               sessionToken: token
            });
        },
        function createUserFail(err){
            res.status(500).send({ error: '500 - Internal Server Error'})
        }
    );
});

router.post('/login', function(req, res){
    User.findOne({
        where: { username: req.body.user.username } 
    }).then(
        function(user){
                if(user){
                bcrypt.compare(req.body.user.pin, user.pin, function(err, authMatch){
                    if(authMatch){
                        var token = jwt.sign({id: user.id}, process.env.SIGN, {expiresIn: 60*60*16});
                        res.json({
                           username: user,
                           message: `Welcome back ${user.username}`,
                           sessionToken: token
                        });
                    } else {
                        res.status(502).send({ error: "502/Bad Gateway"})
                    }
                });
            } else {
                res.status(500).send({ error: "Have you registered yet?"})
            }
        },
        function(error){
            res.status(501).send({ error: "Here be dragons--turn back! Also, get in touch with the idiot that made this site..." })
        }
    );
});

module.exports = router;

 // (admin.store_owner === true) ? Admin.findOne( { where: { owner_id: req.body.admin.owner_id } } )
        //     .then(
        //         function(owner_id){
        //             if(owner_id){
        //                 bcrypt.compare(req.body.admin.owner_id, admin.owner_id, function(err, ownerMatch){
        //                     if(ownerMatch){
        //                         bcrypt.compare(req.body.admin.passwordhash, admin.passwordhash, function(err, authMatch){
        //                             if(authMatch){
        //                                 var token = jwt.sign({id: admin.id}, process.env.SIGN, {expiresIn: 60*60*16});
        //                                 res.json({
        //                                    vipMobile: admin,
        //                                    message: `Welcome back ${admin.owner_id}`,
        //                                    sessionToken: token
        //                                 });
        //                             } else {
        //                                 res.status(502).send({ error: "502/Bad Gateway"})
        //                             } 
        //                         });
        //                     } else {
        //                         res.status(500).send({ error: "You're not Preston!"})
        //                     }
        //                 },
        //                 function(err){
        //                     res.status(501).send({ error: "Here be dragons--turn back! Also, get in touch with the idiot that made this site..." })
        //                 })
        //             }  else {
        //                 res.status(500).send({ error: "You're not Preston!"})
        //             }
        //         }
        //     )