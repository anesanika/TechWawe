import { Metadata } from "next";

export const metadata: Metadata = {
  title: `TechWawe | ProductDetail`,
  description: "Product Page",
};

export default function productPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
