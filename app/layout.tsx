import type { Metadata } from 'next'
import { Toaster } from "../components/ui/sonner";
import './globals.css'

export const metadata: Metadata = {
  title: 'real-estate-app',
  description: 'Real Estate',
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
      {children}
      <Toaster />
      </body>
      
    </html>
  )
}
