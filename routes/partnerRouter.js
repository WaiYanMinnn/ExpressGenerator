const express=require('express');
const partnerRouter=express.Router();

partnerRouter.route('/')

.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})

.get((req,res)=>{
    res.end('Will send all the partners to you');
})
.post((req,res)=>{
    res.end(`Will add the partner:${req.body.name} with the description : ${req.body.description}`);
})

.put((req,res)=>{
    res.statusCode=403;
    res.end('PUT operation is not supported on /partners');

})

.delete((req,res)=>{
    res.end('Deleting all partners');

});
partnerRouter.route('/:partnerId')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res)=>{
    res.end(`Will send details of the partner : ${req.params.partnerId} to you`);
})
.post((req,res)=>{
    res.statusCode=403;
    res.end(`Post operation is not supported on /partners/ ${req.params.partnerId}`);
})

.put((req,res)=>{
    res.statusCode=200;
    res.end(`Updating the partner: ${req.params.partnerId}\n Will update the partner: ${req.body.name}
        with the description: ${req.body.description}`);

})

.delete((req,res)=>{
    res.end(`Deleting partner: ${req.params.partnerId}`);
}
)

 
module.exports =partnerRouter;