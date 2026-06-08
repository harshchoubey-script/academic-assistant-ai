import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import Layout from "../components/Layout";

import {
  uploadNote,
} from "../services/note.service";

function UploadPage() {
  const [file, setFile] =
    useState<File | null>(
      null
    );

  const [loading, setLoading] =
    useState(false);

  const navigate =
    useNavigate();

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      if (!file) {
        return alert(
          "Please select a PDF"
        );
      }

      try {
        setLoading(true);

        await uploadNote(
          file
        );

        navigate(
          "/"
        );
      } catch (error) {
        console.error(error);

        alert(
          "Upload failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <Layout>
      <div
        className="
          max-w-2xl
          mx-auto
          bg-white
          p-8
          rounded-2xl
          shadow-md
        "
      >
        <h1
          className="
            text-3xl
            font-bold
            mb-6
          "
        >
          Upload Study Material
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="
            flex
            flex-col
            gap-5
          "
        >
          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setFile(
                e.target
                  .files?.[0] ||
                  null
              )
            }
            className="
              border
              p-3
              rounded-lg
            "
          />

          <button
            type="submit"
            className="
              bg-blue-600
              text-white
              py-3
              rounded-lg
              hover:bg-blue-700
              transition
            "
          >
            {loading
              ? "Uploading..."
              : "Upload PDF"}
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default UploadPage;