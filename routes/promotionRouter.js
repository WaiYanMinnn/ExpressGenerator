const express=require('express');
const promotionRouter=express.Router();
const Promotion=require('../models/promotion');
const authenticate=require('../authenticate');

promotionRouter.route('/')

.get((req,res,next)=>{
    Promotion.find()
    .then (promotions=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promotions);
    })
    .catch(err => next(err));//it will skip all of the non error middleware and show to error result.
})
.post(authenticate.verifyUser,(req,res,next)=>{
    Promotion.create(req.body)
    .then (promotion=>{
        console.log('Promotion created',promotion);
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err=>next(err));
})

.put(authenticate.verifyUser,(req,res)=>{
    res.statusCode=403;
    res.end('PUT operation is not supported on /promotions');

})

.delete(authenticate.verifyUser,(req,res,next)=>{
    Promotion.deleteMany()
    .then(response=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(response);
    })
    .catch(err=>next(err));

});
promotionRouter.route('/:promotionId')
.get((req,res,next)=>{
    Promotion.findById(req.params.promotionId)
    .then(promotion=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    })
    .catch(err=>next(err));
})
.post(authenticate.verifyUser,(req,res)=>{
    res.statusCode=403;
    res.end(`POST operation is not supported on /promotions/ ${req.params.promotionId}`);
})

.put(authenticate.verifyUser,(req,res,next)=>{
    Promotion.findByIdAndUpdate(req.params.promotionId,{
        $set:req.body
    },{new:true})
    .then (promotion=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    })
    .catch(err=>next(err));

})


.delete(authenticate.verifyUser,(req,res,next)=>{
    Promotion.findByIdAndDelete(req.params.promotionId)
    .then(response=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(response)
    })
    .catch(err=>next(err));
}
);

 
module.exports =promotionRouter;