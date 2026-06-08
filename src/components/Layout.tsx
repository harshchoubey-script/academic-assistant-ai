import type{
  ReactNode,
} from "react";

import Navbar from "./Navbar";

type Props = {
  children: ReactNode;
};

function Layout({
  children,
}: Props) {
  return (
    <div
      className="
        min-h-screen
        bg-gray-100
      "
    >
      <Navbar />

      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

export default Layout;