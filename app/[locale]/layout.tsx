import type React from "react"
import { NextIntlClientProvider } from "next-intl"
import { notFound } from "next/navigation"
import { getMessages } from "next-intl/server";



import "../globals.css"


// const inter = Inter({ subsets: ["latin"] })

// export function generateStaticParams() {
//   return [{ locale: "en" }, { locale: "ar" }]
// }

// export default async function RootLayout({
//   children,
//   params: { locale },
// }: {
//   children: React.ReactNode
//   params: { locale: string }
// }) {
//   let messages
//   try {
//     messages = (await import(`../../messages/${locale}.json`)).default
//   } catch (error) {
//     notFound()
//   }

//   // Check if the locale is RTL
//   const isRtl = locale === "ar"

//   return (
//     <html lang={locale} dir={isRtl ? "rtl" : "ltr"}>
//       <body className={inter.className}>
//         <NextIntlClientProvider locale={locale} messages={messages}>
//           <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
//             {children}
//           </ThemeProvider>
//         </NextIntlClientProvider>
//       </body>
//     </html>
//   )
// }

export default async function MainLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!locale.includes(locale as never)) {
    notFound();
  }

  const messages = await getMessages();
  return (
    <div lang={locale}>
      <NextIntlClientProvider messages={messages}>
       
        <main className="grow shrink-0 overflow-y-auto">{children}</main>
        {/* Footer */}
      
      </NextIntlClientProvider>
    </div>
  );
}

