const Question = require('../models/question');

const getQuestions = async (req, res) => {
try{
  const { sort, tag } = req.query;
  let sortOrder;
  if (sort === 'newest') {
    sortOrder = { created_at: -1 };
  } else if (sort === 'oldest') {
    sortOrder = { created_at: 1 };
  } 
  else if (sortOrder='upVote'){
  sortOrder={upVote:-1};
  }
  else {
    return res.status(400).json({ error: 'Invalid sort parameter' });
  }
  let query = {};

    // If a tag is provided, use the $in operator to match any question containing that tag
    if (tag) {
      query.tags = { $in: [tag] };
    }
    const questions = await Question.find(query).sort(sortOrder);
    
    questions.forEach((question) => {
      delete question.upVotes;
      delete question.modified_at;
    });

    // Return the results as a JSON response with a 200 status
    res.status(200).json(questions);
  
}
catch(err){
  console.log(err);
  res.status(500).json({error:'Internal server error'});
}

};

const questionByuser = async (req, res) => {
  const { id } = req.user;
  try {
    const questions = await Question.find({ user: id });
    questions.forEach((question) => {
      delete question.upVotes;
      delete question.modified_at;
    });
    res.status(200).json(questions);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const getQuestinonById = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Question.findOne({ _id: id });
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    };
    delete question.upVotes;
    delete question.modified_at;
    res.status(200).json(question);
  }
    catch(err){};
  }
  
  module.exports = { getQuestions, questionByuser,getQuestinonById};
