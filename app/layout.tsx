// app/layout.tsx

import "./globals.css";

export const metadata = {
  title: "WIRE-UP",
  description: "Professional electrician services at your doorstep",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
