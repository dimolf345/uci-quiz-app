const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  creatorId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [true, "E' necessario assegnare un id utente al quiz richiesto"],
  },
  questions: {
    type: [mongoose.SchemaTypes.ObjectId],
    //TODO create a custom validator that ensures that the questions.length is between 10 and 30
  },
  answers: {
    type: [Object],
  },
  score: {
    type: Number,
    min: 0.0,
    max: 1.0,
    default: 0.0,
  },
  isSubmitted: {
    type: Boolean,
    default: false,
  },
  categories: {
    type: [String],
  },
});

const quizModel = mongoose.model("Quiz", quizSchema);

module.exports = quizModel;
