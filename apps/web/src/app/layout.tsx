import type { Metadata } from "next";
import { Poppins } from 'next/font/google'
import "./globals.css";
import { ThemeProvider } from "@circulate/providers";
import { FileTransferContextProvider } from "@/lib/context/FileTransferContext";

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Circulate",
  description: "File Transfer Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className}  antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          themes={["dark", "light"]}
          enableSystem
          disableTransitionOnChange
        >
          <FileTransferContextProvider>
            {children}
          </FileTransferContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
