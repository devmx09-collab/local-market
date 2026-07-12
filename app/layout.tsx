
import "./globals.css";

export const metadata = {
  title: "Unit",
  description: "Real local stuff. No nonsense.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
