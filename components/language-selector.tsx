"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useLocale } from "next-intl"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { useTranslations } from "next-intl"

export default function LanguageSelector() {
  const t = useTranslations("app.language")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const switchLanguage = (newLocale: string) => {
    // Get the path without the locale prefix
    const segments = pathname.split("/")
    segments[1] = newLocale // Replace the locale segment
    const newPath = segments.join("/")

    router.push(newPath)
    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full w-9 h-9">
          <Globe className="h-4 w-4" />
          <span className="sr-only">{t("select")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switchLanguage("en")} className={locale === "en" ? "bg-muted" : ""}>
          {t("en")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLanguage("ar")} className={locale === "ar" ? "bg-muted" : ""}>
          {t("ar")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

