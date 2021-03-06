var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//User password bycrpt package
var bcrypt =require('bcrypt');
    SALT_WORK_FACTOR = 10;


// Definition
// The profile page requirenment city,birth and nationality
var UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        index: { 
            unique: true 
        }
    },
    
    password: {
        type: String,
        required: true
    },

    userDetails: {
        type: {
            name: {
                type: String,
                required: true    
            },
            
            birth: {
                type: Date,
                required: false 
            },
        
            nationality: {
                type: String,
                required : false
            },

            city:{
                type: String,
                required: false
            }
        }
    },

    followers: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        default: []
    },

    following: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        default: []
    },

    interests: {
        type: [String],
        default: []
    }
});

//Password hashing part
UserSchema.pre('save',function(next){
    var user = this;
    //hash the password if it has been modified (or is new) 
    if(!user.isModified('password')) return next();
    //generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
        if (err) return next(err);
        
        //hash the password using our new salt
        bcrypt.hash(user.password,salt,function(err,hash){
            if (err) return next(err);
            //override the password with the hashed one 
            user.password = hash;
            next();
        }); 
    });
});

UserSchema.methods.comparePassword = function(candidatePassword,callback){
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) return callback(err);
        callback(undefined, isMatch);
    });
};
var User = mongoose.model('User',UserSchema);

module.exports = User;