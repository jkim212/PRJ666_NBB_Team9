const Question =require('../models/question');

const createQuestion = async (req, res) => {
  console.log(req.body);
  console.log(req.user);

const { title, description, tags } = req.body;
const {id}=req.user;
try {
  const questionDoc = new Question({
    title,
    description,
    tags,
    user: id,
  });

  // Save the question document to the database
  await questionDoc.save();
res.status(201).json({id: questionDoc._id});
}
catch(error){
  console.error('Error creating question:', error);
  res.status(500).json({ error: 'Internal server error' });
}

};
const updateUpvote = async (req, res) => {
  const { id } = req.params;
  const userId= req.user.id;
  const upvote=req.body.upvote;
  try {
    const question= await Question.findOne({_id:id});
    if(!question){
      return res.status(404).json({error:'Question not found'});
    };
    
    if(upvote){
    if(!question.upVotes.includes(userId)){
      question.upVotes.push(userId);
      question.upVotesNumber=question.upVotesNumber+1;
      await question.save();
      return res.status(200).json({upVotesNumber:question.upVotesNumber});

    }
    
  }
  else{
    
    const index=question.upVotes.indexOf(userId);
    
    if (index > -1) {
      question.upVotes.splice(index, 1);
      question.upVotesNumber=question.upVotesNumber-1;
      await question.save();
      return res.status(200).json({upVotesNumber:question.upVotesNumber});
    }
  }

  }catch(err){
    console.log(err);
    res.status(500).json({error:'Internal server error'});
  }
}
  
 

module.exports = {createQuestion ,updateUpvote}