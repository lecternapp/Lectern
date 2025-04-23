import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { SummaryProvider } from './context/SummaryContext';
import { QuizProvider } from "./context/QuizContext";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Lectern - AI Learning Assistant",
  description: "Turning your lectures into clear knowledge with AI",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${outfit.className} antialiased`}>
          <SummaryProvider>
            <QuizProvider>
              {children}
            </QuizProvider>
          </SummaryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
