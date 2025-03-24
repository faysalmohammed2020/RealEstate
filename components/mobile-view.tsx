"use client"

import type React from "react"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useLocale } from "next-intl"
import { Home, Search, User, Heart, MessageCircle, Globe, CirclePlus, MessageSquare, Grip } from "lucide-react"
import MobilePropertyMap from "@/components/mobile-property-map"
import { cn } from "@/lib/utils"
import Image from "next/image"
import LanguageSelector from "@/components/language-selector"
import { Link } from "@/i18n/navigation"
import { signOut, useSession } from "@/lib/auth-client"
import { Button } from "@/components/ui/button";

export default function MobileView() {
  const t = useTranslations("app")
  const locale = useLocale()
  const isRtl = locale === "ar"
  const [activeTab, setActiveTab] = useState("forRent")
  const session = useSession();

  return (
    <main className="h-screen flex flex-col bg-white">
      {/* Top Bar */}
      <div className="px-3 py-2 flex items-center justify-between bg-white">
        <div className="flex items-center">
          <div className="relative h-7 w-7">
            <Image src="/Boed Logo.png" alt="Logo" fill className="object-contain" />
          </div>
        </div>
        <div className="ml-auto flex items-center gap-4">
            <LanguageSelector />
            {session?.data ? (
              <Button variant="outline" size="sm" onClick={() => signOut()}>
                Log Out
              </Button>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button variant="outline" size="sm">
                    {t("auth.signIn")}
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button size="sm" className="bg-green-600 hover:bg-green-500">
                    {t("auth.signUp")}
                  </Button>
                </Link>
              </>
            )}
          </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-gray-50 rounded-lg p-0.5">
      <button
        className={cn(
          "flex-1 py-1.5 px-2 text-xs flex items-center justify-center rounded-md transition-colors",
          activeTab === "forRent" ? "bg-white text-gray-800 shadow-sm" : "text-gray-600",
        )}
        onClick={() => setActiveTab("forRent")}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-1"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" />
        </svg>
       {t("mobile.ForRent")}
      </button>
      <button
        className={cn(
          "flex-1 py-1.5 px-2 text-xs flex items-center justify-center rounded-md transition-colors",
          activeTab === "forSale" ? "bg-white text-gray-800 shadow-sm" : "text-gray-600",
        )}
        onClick={() => setActiveTab("forSale")}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-1"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
        {t("mobile.ForSale")}
      </button>
      <button
        className={cn(
          "flex-1 py-1.5 px-2 text-xs flex items-center justify-center rounded-md transition-colors",
          activeTab === "daily" ? "bg-white text-gray-800 shadow-sm" : "text-gray-600",
        )}
        onClick={() => setActiveTab("daily")}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-1"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        {t("mobile.Daily")}
      </button>
    </div>

      {/* Map View (Main Content) */}
      <div className="flex-1 relative">
        <MobilePropertyMap />
      </div>

      {/* Bottom Navigation */}
      <div className="border-t py-2 px-4 bg-white">
        <div className="flex justify-between items-center">
          <NavItem icon={<User size={20} />} label={t("mobile.nav.profile")} active />
          <NavItem icon={<Search size={20} />} label={t("mobile.nav.search")} />
          <NavItem icon={<CirclePlus size={20} />} label={t("mobile.nav.add")} />
          <NavItem icon={<MessageSquare size={20} />} label={t("mobile.nav.chat")} />
          <Link href="/services"><NavItem icon={<Grip size={20} />} label={t("mobile.nav.service")} /></Link>
        </div>
      </div>
    </main>
  )
}

interface NavItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
}

function NavItem({ icon, label, active }: NavItemProps) {
  return (
    <div className="flex flex-col items-center">
      <div className={cn("p-1 rounded-full", active ? "text-red-500" : "text-gray-500")}>{icon}</div>
      <span className={cn("text-xs mt-1", active ? "text-red-500 font-medium" : "text-gray-500")}>{label}</span>
    </div>
  )
}

