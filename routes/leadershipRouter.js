const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Promotions = require('../models/leaderships');
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
.post((req,res,next) => {
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
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaderships');
})
.delete((req,res,next) => {
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
.post((req,res,end) => {
    res.statusCode = 403;
    res.end('POST operation not supported by /leaderships/' + req.params.leadershipId);
})
.put((req,res,next) => {
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
.delete((req,res,next) => {
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