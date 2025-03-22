"use client"

import { useState, useEffect } from "react"
import { useLocale } from "next-intl"
import MobileView from "@/components/mobile-view"
import DesktopView from "@/components/desktop-view"

export default function ClientHomePage() {
  const locale = useLocale()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== "undefined") {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }

      // Initial check
      checkIfMobile()

      // Add event listener for window resize
      window.addEventListener("resize", checkIfMobile)

      // Clean up
      return () => {
        window.removeEventListener("resize", checkIfMobile)
      }
    }
  }, [])

  // Default to desktop view during SSR to avoid hydration issues
  return <div className="min-h-screen bg-gray-50">{isMobile ? <MobileView /> : <DesktopView locale={locale} />}</div>
}

