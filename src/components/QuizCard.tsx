import {
  useState,
} from "react";

function QuizCard({
  quiz,
  index,
}: any) {
  const [
    selected,
    setSelected,
  ] = useState("");

  const options = [
    quiz.optionA,
    quiz.optionB,
    quiz.optionC,
    quiz.optionD,
  ];

  return (
    <div
      className="
        border
        p-6
        rounded-xl
        bg-white
      "
    >
      <h3
        className="
          text-lg
          font-semibold
          mb-4
        "
      >
        Q
        {index + 1}
        .{" "}
        {quiz.question}
      </h3>

      <div
        className="
          space-y-3
        "
      >
        {options.map(
          (
            option,
            i
          ) => {
            const isCorrect =
              option ===
              quiz.correctAnswer;

            const isSelected =
              selected ===
              option;

            return (
              <button
                key={i}
                onClick={() =>
                  setSelected(
                    option
                  )
                }
                className={`
                  w-full
                  text-left
                  p-3
                  rounded-lg
                  border
                  transition

                  ${
                    isSelected &&
                    isCorrect
                      ? "bg-green-100 border-green-500"
                      : ""
                  }

                  ${
                    isSelected &&
                    !isCorrect
                      ? "bg-red-100 border-red-500"
                      : ""
                  }

                  ${
                    !isSelected
                      ? "hover:bg-gray-100"
                      : ""
                  }
                `}
              >
                {option}
              </button>
            );
          }
        )}
      </div>

      {selected && (
        <p
          className="
            mt-4
            font-semibold
            text-green-700
          "
        >
          Correct Answer:
          {" "}
          {
            quiz.correctAnswer
          }
        </p>
      )}
    </div>
  );
}

export default QuizCard;