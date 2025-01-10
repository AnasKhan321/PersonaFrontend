import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Toaster}  from "react-hot-toast"
import { SocketProvider } from "./appcontext/Socketcontext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI PERSONAS",
  description: "This websit will let you created your X personas where you can interact with twitter personas and have chat with him",
};

export default function RootLayout({ children }) {
  return (
    <SocketProvider> 
 
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

<Toaster
                position="top-center"
                reverseOrder={false}
        />
        {children}
      </body>
    </html>
    </SocketProvider>
  );
}
