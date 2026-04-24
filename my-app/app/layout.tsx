import { type ReactNode } from "react";
import "./globals.css";
import { Noto_Serif_Devanagari} from "next/font/google"

const devanagrai =  Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-devanagari",
})
interface RootLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="ne" className={devanagrai.variable}>
      <body>
        {children}
        {modal}
      </body>
    </html>
  );
}
