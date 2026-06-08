import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import { getNotes } from "../services/note.service";

import type {
  UploadedNote,
} from "../types/note.types";

import Layout from "../components/Layout";

import NoteCard from "../components/NoteCard";

function DashboardPage() {
  const { user, logout } =
    useAuth();

  const [notes, setNotes] =
    useState<
      UploadedNote[]
    >([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchNotes =
      async () => {
        try {
          const data =
            await getNotes();

          setNotes(
            data.notes
          );
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    fetchNotes();
  }, []);

  return (
    <Layout>
      <div
        className="
          flex
          justify-between
          items-center
          mb-6
        "
      >
        <div>
          <h1
            className="
              text-3xl
              font-bold
            "
          >
            Dashboard
          </h1>

          <p
            className="
              text-gray-600
              mt-1
            "
          >
            Welcome{" "}
            {user
              ? user.name
              : "User"}
          </p>
        </div>

        <div
          className="
            flex
            gap-3
          "
        >
          <Link
            to="/upload"
            className="
              bg-blue-600
              text-white
              px-4
              py-2
              rounded-lg
              hover:bg-blue-700
              transition
            "
          >
            Upload PDF
          </Link>

          <button
            onClick={logout}
            className="
              bg-red-500
              text-white
              px-4
              py-2
              rounded-lg
              hover:bg-red-600
              transition
            "
          >
            Logout
          </button>
        </div>
      </div>

      <h2
        className="
          text-2xl
          font-semibold
          mb-4
        "
      >
        Your Notes
      </h2>

      {loading && (
        <div
          className="
            bg-white
            p-6
            rounded-xl
            shadow-md
          "
        >
          <p>
            Loading...
          </p>
        </div>
      )}

      {!loading &&
        notes.length === 0 && (
          <div
            className="
              bg-white
              p-8
              rounded-xl
              shadow-md
              text-center
            "
          >
            <p
              className="
                text-gray-500
              "
            >
              No notes uploaded yet
            </p>
          </div>
        )}

      {!loading &&
        notes.length > 0 && (
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              gap-6
            "
          >
            {notes.map(
              (note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                />
              )
            )}
          </div>
        )}
    </Layout>
  );
}

export default DashboardPage;