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
module.exports = {createQuestion }