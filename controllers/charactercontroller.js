var router = require('express').Router();
var sequelize = require('../db');
var Character = sequelize.import('../models/character');

router.post('/newpc', function(req, res){
    let activeUser = req.user.username;

    let Player = req.body.character.player;
    let PCName = req.body.character.pcName;
    let Level = req.body.character.level;
    let Class = req.body.character.class;
    let Subclass = req.body.character.subclass


    Character.create({
        player : Player,
        pcName: PCName,
        level: Level,
        class: Class,
        subclass: Subclass
        }, 
        {where: {PCName : pcName, player : activeUser}}
    ).then(
        function createPC(){
            res.json({
                message : 'New PC is ready for adventure!',
                PCName : req.body.character.pcName,
                Class : req.body.character.class
            });
        },
        function createCatFail(err){
            res.status(500).send(err)
        }
    );
});

router.get('/all-usersPCs', function(req, res){            
    let activeUser = req.user.username;

    Character.findAll({
        where: {player : activeUser}
    }).then(
        function getMyPCs(data){
            res.json(data)
        },
        function getPCsFail(err){
            res.status(500).send({error : '500 - Internal Server Error'})
        }
    );
});

router.get('/oneOf-usersPcs/:id', function(req, res){
    let data = req.params.id;
    let activeUser = req.user.username

    Character.findOne({
        where: { id : data, player : activeUser } 
    }).then(
        function foundOnePC(data){
            res.json(data);
        },
        function findNoPC(err){
            res.status(500).send({error: '500 - Internal Server Error'})
        }
    )
})

router.delete('/deletePC/:id', function(req, res){
    let data = req.params.id;
    let activeUser = req.user.username

    Character.destroy({
        where: {id : data, player : activeUser}
    }).then(
        function euthenizePC(data){
            res.json({
                pcID : data,
                message: 'PC deleted! Save the pcID in case a recovery attempt is required'
            });
        },
        function stillLivingPC(err){
            res.status(500).send({error: '500 - Internal Server Error'});
        }
    );
});

router.put('/updatePC/:id', function(req, res){
    let data = req.params.id;
    let activeUser = req.user.username;

    let PCName = req.body.character.pcName;
    let Level = req.body.character.level;
    let Class = req.body.character.class;
    let Subclass = req.body.character.subclass

    Character.update({
        pcName : PCName,
        level : Level,
        class : Class,
        subclass : Subclass
    }, {where: {id : data, player : activeUser}}
    ).then(
        function catUpdate(updatedCategory){
            res.json({
                updatedCategory,
                message : 'Category updated!'
            });
        },
        function catUpdateFail(err){
            res.status(500).send({error : '500 - Internal Server Error'})
        }
    );
});

module.exports = router;