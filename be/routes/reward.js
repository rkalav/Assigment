var express = require('express');
const reward = require('../models/reward.js');
var router = express.Router();
var Reward = require('../models/reward.js');

router.get('/allRewards', function (req, res) {
    const { from,till } = req.query
    let fromDate = new Date(from);
    let tillDate = new Date(till);
    tillDate.setDate(tillDate.getDate() + 1);
    Reward.find({
        date: {
            $gte: fromDate,
            $lt: tillDate,
        },
    }, {}, {}, (err, data) => {
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(400).send(JSON.stringify(err))
        }

    });
})

router.get('/totalRewardCount', function (req, res) {
    const { from, till } = req.query
    let fromDate = new Date(from);
    let tillDate = new Date(till);

    tillDate.setDate(tillDate.getDate() + 1);
    Reward.find({
        date: {
            $gte: fromDate,
            $lt: tillDate,
        },
    }, {}, {}, (err, data) => {
        if (data) {
            let total = 0;
            const result = JSON.parse(JSON.stringify(data));
            result.forEach((e) => {
                total = total + e.reward;
            })
            res.status(200).json({ total })
        } else {
            res.status(400).send(JSON.stringify(err))
        }
    });
})

router.get('/rewardByUserId/:userId', function (req, res) {
    const { from, till } = req.query
    let fromDate = new Date(from);
    let tillDate = new Date(till);
    tillDate.setDate(tillDate.getDate() + 1);
    Reward.find({
        userId: req.params.userId,
        date: {
            $gte: fromDate,
            $lt: tillDate,
        },
    }, {}, {}, (err, data) => {
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(400).send(JSON.stringify(err))
        }
    });
})

router.get('/getAll', function (req, res) {
    Reward.find({}, {}, {}, (err, data) => {
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(400).send(JSON.stringify(err))
        }
    });
})

router.post('/save', function (req, res) {
    const userData = req.body;
    const data = [];
    userData.forEach(e => {
        const reqwardData = new Reward();
        reqwardData.userId = e.userId;
        reqwardData.amount = e.amount;
        reqwardData.date = new Date(e.date);
        reqwardData.reward = getRewardValue(e.amount);
        data.push(reqwardData)
    });
    Reward.create(data,(err,...doc)=>{
        if(!err){
            res.status(200);
        }else{
            res.status(400);
        }
    })
    res.status(200).json({success:true});
})

function getRewardValue(amount){
    let reward = 0;
    if (amount <= 50) {
        return reward;
    } else if (amount > 50 && amount <= 100) {
        reward += amount - 50;
    } else if (amount > 100) {
        reward += 50;
        reward += (amount - 100) * 2;
    }
    return reward;
}

module.exports = router;