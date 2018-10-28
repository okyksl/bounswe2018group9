const mongoose = require("mongoose");
const Event = require("../models/Event");


function addEvent(req,res,next){
  var event = new Event({
    name: req.body.name,
    price: req.body.price,
    owner: req.body.owner,
    description: req.body.description,
    date: req.body.date
  });
  console.log('request: ' + JSON.stringify(req.body,null,2));
  event.save(function(err,event)
  {
      if(!err){
        console.log('Error yok');
        res.send(event);
      }
      else
      {
        console.log('Error: ' + err.message);
      }
  });
}

function getEventbyId(req, res, next)
{
  search_id = req.params.id;
  console.log(search_id);
  Event.findById(search_id, function(err, ev)
  {
    if(!err)
    {
      res.send(ev);
    }
    else
    {
      res.send("No event found with id: " + search_id);
    }
  });
}


// This function deletes the event according to given id and returns the deleted event. 
// If it doesn't exist, it returns 500 response and error message.
function deleteEvent(req,res,next) {
  let eventId = req.params.id;
  
  Event.findByIdAndRemove(eventId, (err,event) => {
    if (err) {
      return res.status(500).send(err);
    }
    const response = {
      message: "Event is succesfully deleted.",
      event: event
    }

    return res.status(200).send(response);
  });
}

function getEventbyOwner(req,res,next)
{
  console.log("Searching owner : " + req.params.id);
    Event.find({'owner' : req.params.id}, function(err, docs)
    {
      if(err || !docs)
      {
        res.send("No event found with creator id: "+ req.params.id);
      }
      else
      {
        res.send(docs);
      }
    });
}

function getAllEvents(req,res,next)
{
    Event.find({}, function(err, docs)
    {
      if(err || !docs)
      {
        res.send("No events found");
      }
      else
      {
        res.send(docs);
      }
    });
}

module.exports = {
  deleteEvent,
  addEvent,
  getEventbyId,
  getEventbyOwner,
  getAllEvents
}