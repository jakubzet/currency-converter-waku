import { type PropsWithChildren } from "react";

import { Header } from "../components/Header";
import "../styles/global.css";

export default async function RootLayout({ children }: PropsWithChildren) {
  const data = await getData();

  return (
    <div>
      <link rel="icon" type="image/png" href={data.icon} />
      <Header />
      <main>{children}</main>
    </div>
  );
}

const getData = async () => {
  return {
    icon: "/images/logo.svg",
  };
};

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
