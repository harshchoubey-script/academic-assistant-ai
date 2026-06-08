function Navbar() {
  return (
    <nav
      className="
        bg-white
        shadow-md
        px-6
        py-4
        flex
        justify-between
        items-center
      "
    >
      <h1
        className="
          text-2xl
          font-bold
          text-blue-600
        "
      >
        StudyAI
      </h1>

      <button
        className="
          bg-red-500
          text-white
          px-4
          py-2
          rounded-lg
        "
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;