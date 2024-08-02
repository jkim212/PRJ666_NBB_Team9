const mongoose=require('mongoose');

const ticketScheme= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    created_at:{
        type:Date,
        default:Date.now,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
   
    isActive:{
        type:Boolean,
        default:true,
    },
});
const Ticket=mongoose.model('Ticket',ticketScheme);
module.exports=Ticket;
