import {
  Link,
} from "react-router-dom";

type Props = {
  note: any;
};

function NoteCard({
  note,
}: Props) {
  return (
    <div
      className="
        bg-white
        rounded-xl
        shadow-md
        p-5
      "
    >
      <h2
        className="
          text-xl
          font-semibold
          mb-2
        "
      >
        {note.title}
      </h2>

      <p
        className="
          text-gray-600
          mb-4
        "
      >
        Status: {note.status}
      </p>

      <Link
        to={`/notes/${note.id}`}
        className="
          bg-blue-600
          text-white
          px-4
          py-2
          rounded-lg
          inline-block
        "
      >
        Open Note
      </Link>
    </div>
  );
}

export default NoteCard;