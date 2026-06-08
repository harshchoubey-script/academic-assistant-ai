import type {
  ReactNode,
} from "react";

function AuthLayout({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;

  title: string;

  subtitle: string;
}) {
  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-100
        px-4
      "
    >
      <div
        className="
          bg-white
          w-full
          max-w-md
          rounded-2xl
          shadow-xl
          p-8
        "
      >
        <div
          className="
            mb-8
            text-center
          "
        >
          <h1
            className="
              text-3xl
              font-bold
            "
          >
            {title}
          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            {subtitle}
          </p>
        </div>

        {children}
      </div>
    </div>
  );
}

export default AuthLayout;