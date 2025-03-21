"use client"

import { useTranslations } from "next-intl"
import MobileListingsView from "@/components/mobile-listings-view"
import DesktopListingsView from "@/components/desktop-listings-view"
import { useIsMobile } from "@/hooks/use-mobile"

export default function ListingsPage() {
  const t = useTranslations("app")
  const isMobile = useIsMobile()

  return isMobile ? <MobileListingsView /> : <DesktopListingsView />
}

