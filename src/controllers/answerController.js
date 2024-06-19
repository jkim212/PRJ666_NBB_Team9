const Answer=require('../models/answer');


const getAsnwers=async(req,res)=>{

  try{
    const {id}=req.params;
    const answers=await Answer.find({question:id}).sort({created_at:-1});
    
    res.status(200).json(answers);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal server error'});
  }
};

const answerByUser = async (req, res) => {
  const { id } = req.user;
  try {
    const answers = await Answer.find({ user: id }).sort({ created_at: -1 });
    res.status(200).json(answers);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  };
};

const createAnswer = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;


  
  const userId = req.user.id;
  try {
   await  Answer.create({
      description,
      question: id,
      user: userId,
    });
    

    res.status(201).json({ message: 'Answer created successfully' });
  }
  catch (error) {
    console.error('Error creating answer:', error);
    res.status(500).json({ error: 'Internal server error' });
  };
    
};
const deleteAnswer = async (req, res) => {
  const { id } = req.params;
  try {
    const answer = await Answer.findOneAndDelete({ _id: id });
    if (!answer) {
      return res.status(404).json({ error: 'Answer not found' });
    }
   
    res.status(200).json({ message: 'Answer deleted successfully' });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAsnwers, answerByUser, createAnswer, deleteAnswer };