var mongoose = require('mongoose');
var mongoosePaginate = require("mongoose-paginate");
var Schema = mongoose.Schema;

const CommentSchema = new Schema({
    type: {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        parentId: {
            type: Schema.Types.ObjectId
        },

        body: {
            type: String,
            required: true
        },

        created: {
            type: Date,
            default: Date.now()
        }
    }
});

var EventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    
    price: {
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            required: true
        }
    },

    description: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true    
    },

    duration: {
        length: {
            type: Number,
            required: true
        },
        unit: {
            type: String,
            required: true
        }
    },

    created: {
        type: Date,
        required: false
    },

    creator: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },

    attendance: {
        type: [{
            user: {
                type: Schema.Types.ObjectId, 
                ref: 'User',
                required: true
            },
            attendanceType: {
                type: Number,
                default: 0,
                required: true
            }
        }],
        required: true,
        default: []
    },

    vote: {
        upvoteCount: {
            type: Number,
            required: false,
            default: 0
        },
        downvoteCount: {
            type: Number,
            required: false,
            default: 0
        },
        votes: {
            type: [{
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                },
                //0=downvote 1=upvote 2=not voted
                voteType: {
                    type: Number,
                    required: true 
                }
            }],
            default: []
        }
    },

    comments: {
        type: [CommentSchema],
        default: []
    },

    artists: {
        type: [String],
        required: false
    },

    tags: {
        type: [String],
        required: true,
        default: []
    },
    
    locationConstruct:{
        //location construct here
        locationName:{
            type:String
        },
        location: {
            locType:{
                type:[String]
            },
            //number of lat,long
            coordinates:[Number]
        },
        
        required: false
    },

    medias: {
        type: [String],
        required: true,
        default: []
    }
});

        
EventSchema.plugin(mongoosePaginate);

var Event = mongoose.model('Event', EventSchema);

module.exports = Event;