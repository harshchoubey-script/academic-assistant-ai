import {
  useState,
} from "react";

function FlashcardCard({
  flashcard,
  index,
}: any) {
  const [flipped,
    setFlipped] =
    useState(false);

  return (
    <div
      onClick={() =>
        setFlipped(
          !flipped
        )
      }
      className="
        cursor-pointer
        rounded-2xl
        border
        bg-white
        p-6
        shadow-md
        min-h-[220px]
        flex
        flex-col
        justify-center
        transition
        hover:shadow-lg
      "
    >
      {!flipped ? (
        <>
          <p
            className="
              text-sm
              text-gray-500
              mb-3
            "
          >
            Question
            {" "}
            {index + 1}
          </p>

          <h3
            className="
              text-xl
              font-semibold
            "
          >
            {
              flashcard.question
            }
          </h3>

          <p
            className="
              mt-6
              text-sm
              text-blue-600
            "
          >
            Click to reveal answer
          </p>
        </>
      ) : (
        <>
          <p
            className="
              text-sm
              text-gray-500
              mb-3
            "
          >
            Answer
          </p>

          <p
            className="
              text-lg
              text-gray-800
              leading-7
            "
          >
            {
              flashcard.answer
            }
          </p>

          <p
            className="
              mt-6
              text-sm
              text-purple-600
            "
          >
            Click to flip back
          </p>
        </>
      )}
    </div>
  );
}

export default FlashcardCard;