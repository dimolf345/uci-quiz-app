const mongoose = require("mongoose");

const Question = require("../question/questionModel");

const quizSchema = new mongoose.Schema(
  {
    creatorId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [
        true,
        "E' necessario assegnare un id utente al quiz richiesto",
      ],
    },
    questions: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Question",
      //TODO create a custom validator that ensures that the questions.length is between 10 and 30
    },
    answers: {
      type: Array,
      default: [],
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
  },
  { timestamps: true }
);

quizSchema.set("toJSON", { versionKey: false });

quizSchema.methods = {
  updateScore: async function () {
    this.isSubmitted = true;
    this.score = 0.5;
    await this.save();
    return this.score;
  },
};

const quizModel = mongoose.model("Quiz", quizSchema);

module.exports = quizModel;
