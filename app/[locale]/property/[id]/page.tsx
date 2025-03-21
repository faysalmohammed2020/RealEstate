"use client"

import { useTranslations } from "next-intl"
import { useLocale } from "next-intl"
import { useIsMobile } from "@/hooks/use-mobile"
import MobilePropertyDetail from "@/components/property/mobile-property-detail"
import DesktopPropertyDetail from "@/components/property/desktop-property-detail"
import { use } from "react"

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const t = useTranslations("app")
  const locale = useLocale()
  const isMobile = useIsMobile()

  // Unwrap the params using React.use()
  const resolvedParams = use(params)
  const { id } = resolvedParams

  return isMobile ? <MobilePropertyDetail id={id} locale={locale} /> : <DesktopPropertyDetail id={id} locale={locale} />
}

