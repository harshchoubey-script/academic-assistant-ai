import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  getSingleNote,
} from "../services/note.service";

import {
  generateSummary,
  getSummary,
} from "../services/summary.service";

import {
  generateQuiz,
  getQuiz,
} from "../services/quiz.service";

import {
  generateFlashcards,
} from "../services/flashcard.service";

import ReactMarkdown from "react-markdown";

import Layout from "../components/Layout";

import QuizCard from "../components/QuizCard";

import FlashcardCard from "../components/FlashcardCard";

function NotePage() {
  const { id } =
    useParams();

  const [note, setNote] =
    useState<any>(null);

  const [summary, setSummary] =
    useState("");

  const [quizzes, setQuizzes] =
    useState<any[]>([]);

  const [
    flashcards,
    setFlashcards,
  ] = useState<any[]>([]);

  const [
    summaryLoading,
    setSummaryLoading,
  ] = useState(false);

  const [
    quizLoading,
    setQuizLoading,
  ] = useState(false);

  const [
    flashcardLoading,
    setFlashcardLoading,
  ] = useState(false);

  const [loading, setLoading] =
    useState(true);

  const [activeTab,
    setActiveTab] =
    useState("notes");

  useEffect(() => {
    const fetchData =
      async () => {
        try {
          // Fetch Note
          const noteData =
            await getSingleNote(
              id!
            );

          setNote(
            noteData.note
          );

          // Fetch Summary
          try {
            const summaryData =
              await getSummary(
                id!
              );

            if (
              summaryData.summary
            ) {
              setSummary(
                summaryData
                  .summary
                  .content
              );
            }
          } catch (error) {
            console.log(
              "No summary yet"
            );
          }

          // Fetch Quiz
          try {
            const quizData =
              await getQuiz(
                id!
              );

            if (
              quizData.quizzes
            ) {
              setQuizzes(
                quizData.quizzes
              );
            }
          } catch (error) {
            console.log(
              "No quizzes yet"
            );
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    fetchData();
  }, [id]);

  // Generate Summary
  const handleGenerateSummary =
    async () => {
      try {
        setSummaryLoading(
          true
        );

        const data =
          await generateSummary(
            id!
          );

        setSummary(
          data.summary
            .content
        );
      } catch (error) {
        console.error(error);
      } finally {
        setSummaryLoading(
          false
        );
      }
    };

  // Generate Quiz
  const handleGenerateQuiz =
    async () => {
      try {
        setQuizLoading(
          true
        );

        const data =
          await generateQuiz(
            id!
          );

        setQuizzes(
          data.quizzes
        );
      } catch (error) {
        console.error(error);
      } finally {
        setQuizLoading(
          false
        );
      }
    };

  // Generate Flashcards
  const handleGenerateFlashcards =
    async () => {
      try {
        setFlashcardLoading(
          true
        );

        const data =
          await generateFlashcards(
            id!
          );

        setFlashcards(
          data.flashcards
        );
      } catch (error) {
        console.error(error);
      } finally {
        setFlashcardLoading(
          false
        );
      }
    };

  if (loading) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  if (!note) {
    return (
      <Layout>
        <p>
          Note not found
        </p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        className="
          max-w-5xl
          mx-auto
          space-y-6
        "
      >
        {/* Header */}

        <div
          className="
            bg-white
            p-6
            rounded-2xl
            shadow-md
          "
        >
          <h1
            className="
              text-4xl
              font-bold
              mb-2
            "
          >
            {note.title}
          </h1>

          <p
            className="
              text-gray-600
            "
          >
            Status:
            {" "}
            {note.status}
          </p>
        </div>

        {/* Tabs */}

        <div
          className="
            flex
            gap-3
            flex-wrap
          "
        >
          {[
            "notes",
            "summary",
            "quiz",
            "flashcards",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() =>
                setActiveTab(
                  tab
                )
              }
              className={`
                px-5
                py-2
                rounded-lg
                capitalize
                transition

                ${
                  activeTab ===
                  tab
                    ? "bg-blue-600 text-white"
                    : "bg-white border"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Notes */}

        {activeTab ===
          "notes" && (
          <div
            className="
              bg-white
              p-6
              rounded-2xl
              shadow-md
            "
          >
            <h2
              className="
                text-2xl
                font-semibold
                mb-4
              "
            >
              Extracted Text
            </h2>

            <p
              className="
                text-gray-700
                leading-8
              "
            >
              {
                note.extractedText
              }
            </p>
          </div>
        )}

        {/* Summary */}

        {activeTab ===
          "summary" && (
          <div
            className="
              bg-white
              p-6
              rounded-2xl
              shadow-md
            "
          >
            <button
              onClick={
                handleGenerateSummary
              }
              className="
                bg-blue-600
                text-white
                px-5
                py-3
                rounded-lg
                hover:bg-blue-700
                transition
              "
            >
              {summaryLoading
                ? "Generating..."
                : "Generate Summary"}
            </button>

            {summary && (
              <div
                className="
                  mt-6
                "
              >
                <h2
                  className="
                    text-2xl
                    font-semibold
                    mb-4
                  "
                >
                  AI Summary
                </h2>

                <div
                  className="
                    prose
                    max-w-none
                  "
                >
                  <ReactMarkdown>
                    {summary}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quiz */}

        {activeTab ===
          "quiz" && (
          <div
            className="
              bg-white
              p-6
              rounded-2xl
              shadow-md
            "
          >
            <button
              onClick={
                handleGenerateQuiz
              }
              className="
                bg-green-600
                text-white
                px-5
                py-3
                rounded-lg
                hover:bg-green-700
                transition
              "
            >
              {quizLoading
                ? "Generating..."
                : "Generate Quiz"}
            </button>

            {quizzes.length >
              0 && (
              <div
                className="
                  mt-6
                  space-y-4
                "
              >
                <h2
                  className="
                    text-2xl
                    font-semibold
                  "
                >
                  AI Quiz
                </h2>

                {quizzes.map(
                  (
                    quiz,
                    index
                  ) => (
                    <QuizCard
                      key={
                        quiz.id
                      }
                      quiz={
                        quiz
                      }
                      index={
                        index
                      }
                    />
                  )
                )}
              </div>
            )}
          </div>
        )}

        {/* Flashcards */}

        {activeTab ===
          "flashcards" && (
          <div
            className="
              bg-white
              p-6
              rounded-2xl
              shadow-md
            "
          >
            <button
              onClick={
                handleGenerateFlashcards
              }
              className="
                bg-purple-600
                text-white
                px-5
                py-3
                rounded-lg
                hover:bg-purple-700
                transition
              "
            >
              {flashcardLoading
                ? "Generating..."
                : "Generate Flashcards"}
            </button>

            {flashcards.length >
              0 && (
              <div
                className="
                  mt-6
                  grid
                  md:grid-cols-2
                  gap-4
                "
              >
                {flashcards.map(
                  (
                    flashcard,
                    index
                  ) => (
                    <FlashcardCard
                      key={
                        flashcard.id
                      }
                      flashcard={
                        flashcard
                      }
                      index={
                        index
                      }
                    />
                  )
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default NotePage;