import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "Gather | Wedding planning",
  description: "A thoughtful shared space for wedding planning and celebration."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
