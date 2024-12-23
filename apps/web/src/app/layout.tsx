import type { Metadata } from "next";
import { Poppins } from 'next/font/google'
import "./globals.css";
import { ThemeProvider } from "@circulate/providers";
import { FileTransferContextProvider } from "@/lib/context/FileTransferContext";
import { Toaster } from "sonner";
import { NextAuthProvider } from "@/lib/providers/NextAuthProvider";

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
    <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
      <body className={`${poppins.className}  antialiased`}>
        <NextAuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            themes={["dark", "light"]}
            enableSystem
            disableTransitionOnChange
          >
            <FileTransferContextProvider>
              <Toaster />
              {children}
            </FileTransferContextProvider>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
