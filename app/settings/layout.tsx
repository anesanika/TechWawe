import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "User Profile Page",
};

export default function settingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
