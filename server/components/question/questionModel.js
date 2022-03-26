const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    creatorId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [true, "E' necessario assegnare un id utente alla domanda"],
    },
    title: {
      type: String,
      required: [true, "E' necessario inserire il titolo della domanda"],
      unique: [true, "Esiste già una domanda contenente lo stesso titolo"],
    },
    correctAnswer: {
      type: String,
      required: [true, "Una domanda deve avere almeno una risposta corretta"],
    },
    wrongAnswers: {
      type: [String],
      validate: {
        validator: function (v) {
          return v.length > 1;
        },
        message: "Una domanda deve avere almeno una risposta sbagliata",
      },
    },
    category: {
      type: String,
      required: [
        true,
        "Una domanda deve appartenere necessariamente ad una categoria",
      ],
      enum: ["sap", "locali", "marinaresco", "segnali", "generale"],
    },
  },
  { timestamps: true }
);

// questionSchema.virtual("answers").get(function () {
//   const answers = shuffle([...this.wrongAnswers, this.correctAnswer]);
//   return answers;
// });

questionSchema.set("toJSON", { versionKey: false, virtuals: true });

const questionModel = mongoose.model("Question", questionSchema);

module.exports = questionModel;
