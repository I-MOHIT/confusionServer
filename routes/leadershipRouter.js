const express = require('express');
const bodyParser = require('body-parser');

const leadershipRouter = express.Router();

leadershipRouter.use(bodyParser.json());

leadershipRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the leaderships to you!');
})
.post((req,res,next) => {
    res.end('Will add the leadership: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaderships');
})
.delete((req,res,next) => {
    res.end('Deleting all the leaderships!');
})

leadershipRouter.route('/:leadershipId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send the details of the leadership: ' + req.params.leadershipId + ' to you!');
})
.post((req,res,end) => {
    res.statusCode = 403;
    res.end('POST operation not supported by /leaderships/' + req.params.leadershipId);
})
.put((req,res,next) => {
    es.write('Updating the leadership: ' + req.params.leadershipId + '\n');
    res.end('Will update the leadership: ' + req.body.name + ' with the details: ' + req.body.description);
})
.delete((req,res,next) => {
    res.end('Deleted the leadership: ' + req.params.leadershipId);
})

module.exports = leadershipRouter;