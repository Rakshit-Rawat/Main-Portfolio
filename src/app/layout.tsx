// import type { Metadata } from "next";
import { Roboto_Flex} from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Container from "@/components/Container";

const qs = Roboto_Flex({ subsets: ["latin"], weight: ["400", "600", "700"] });

//  const metadata: Metadata = {
//   title: "Rakshit Rawat | Full Stack Developer",
//   description: "Portfolio of Rakshit Rawat, Full Stack Developer",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${qs.className} antialiased bg-background dark:bg-background text-foreground dark:text-foreground transition-colors duration-200`}>
        <ThemeProvider>
          <Container>{children}</Container>
        </ThemeProvider>
      </body>
    </html>
  );
}