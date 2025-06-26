// src/app/layout.js
import "./globals.css";
import { AuthProvider } from "./auth-context"; // Import AuthProvider
import Navbar from "./components/Navbar"; // IMPORT THE NAVBAR COMPONENT

export const metadata = {
  title: "CPS Academy",
  description: "Course Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar /> {/* Now we render the imported Client Component */}
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}