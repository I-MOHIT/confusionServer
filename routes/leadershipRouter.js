const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');

const Leaderships = require('../models/leaderships');

const leadershipRouter = express.Router();

leadershipRouter.use(bodyParser.json());

leadershipRouter.route('/')
.get((req,res,next) => {
    Leaderships.find({})
    .then((leaderships) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leaderships);
    }, (err) => {
        next(err);
    })
    .catch((err) => {
        next(err);
    });
})
.post(authenticate.verifyUser, (req,res,next) => {
    Leaderships.create(req.body)
    .then((leaderships) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leaderships);
    }, (err) => {
        next(err);
    })
    .catch((err) => {
        next(err);
    });
})
.put(authenticate.verifyUser, (req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaderships');
})
.delete(authenticate.verifyUser, (req,res,next) => {
    Leaderships.remove({})
    .then((leaderships) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leaderships);
    }, (err) => {
        next(err);
    })
    .catch((err) => {
        next(err);
    });
})

leadershipRouter.route('/:leadershipId')
.get((req,res,next) => {
    Leaderships.findById(req.params.leadershipId)
    .then((leadership) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leadership);
    }, (err) => {
        next(err);
    })
    .catch((err) => {
        next(err);
    });
})
.post(authenticate.verifyUser, (req,res,end) => {
    res.statusCode = 403;
    res.end('POST operation not supported by /leaderships/' + req.params.leadershipId);
})
.put(authenticate.verifyUser, (req,res,next) => {
    Leaderships.findByIdAndUpdate(req.params.leadershipId, {
        $set: req.body
    }, {new: true})
    .then((leadership) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leadership);
    }, (err) => {
        next(err);
    })
    .catch((err) => {
        next(err);
    });
})
.delete(authenticate.verifyUser, (req,res,next) => {
    Leaderships.findByIdAndRemove(req.params.leadershipId)
    .then((leadership) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leadership);
    }, (err) => {
        next(err);
    })
    .catch((err) => {
        next(err);
    });
})

module.exports = leadershipRouter;