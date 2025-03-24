"use client"

import type React from "react"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useLocale } from "next-intl"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Search, Home, Plus, MessageSquare, Settings, User, CirclePlus, Grip } from "lucide-react"
import { cn } from "@/lib/utils"
import { ChevronLeft } from "lucide-react"
import { propertyListings } from "@/lib/property-data"
import type { PropertyData } from "@/lib/property-data"
import Link from "next/link"
import LanguageSelector from "@/components/language-selector"
import { signOut, useSession } from "@/lib/auth-client"

export default function MobileListingsView() {
  const t = useTranslations("app")
  const locale = useLocale()
  const isRtl = locale === "ar"
  const [activeTab, setActiveTab] = useState("latest")
  const session = useSession();

  return (
    <main className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b">
        <div className="flex items-center">
          <Link href="/"><ChevronLeft className="h-5 w-5 mr-2" /> </Link>
          <span className="font-medium">{t("listings.title")}</span>
        </div>
        {/* <Button variant="ghost" size="icon" className="rounded-full">
          <Search className="h-5 w-5" />
        </Button> */}
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
      <div className="grid grid-cols-3 border-b">
        <Button
          variant="ghost"
          className={cn("rounded-none h-12", activeTab === "latest" ? "bg-green-500 text-white font-medium" : "")}
          onClick={() => setActiveTab("latest")}
        >
          {t("listings.filters.latest")}
        </Button>
        <Button
          variant="ghost"
          className={cn("rounded-none h-12", activeTab === "price" ? "bg-green-500 text-white font-medium" : "")}
          onClick={() => setActiveTab("price")}
        >
          {t("listings.filters.price")}
        </Button>
        <Button
          variant="ghost"
          className={cn("rounded-none h-12", activeTab === "nearest" ? "bg-green-500 text-white font-medium" : "")}
          onClick={() => setActiveTab("nearest")}
        >
          {t("listings.filters.nearest")}
        </Button>
      </div>

      {/* Add Listing Button and Listings */}
      <div className="flex-1 overflow-y-auto">
        {/* Add New Listing Button */}
        {/* <div className="p-4 border-b">
          <Button
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium h-12"
            onClick={() => console.log("Add new listing")}
          >
            <Plus className="h-5 w-5 mr-2" />
            {t("listings.addNew")}
          </Button>
        </div> */}
        <div className="divide-y">
          {propertyListings.map((property) => (
            <Link href={`/${locale}/property/${property.id}`} key={property.id}>
              <PropertyListing property={property} locale={locale as "en" | "ar"} />
            </Link>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed right-4 bottom-20 z-10">
        <Button
          size="icon"
          className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
          aria-label="Add new listing"
        >
          <Plus className="h-6 w-6" />
        </Button>
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

interface PropertyListingProps {
  property: PropertyData
  locale: "en" | "ar"
}

function PropertyListing({ property, locale }: PropertyListingProps) {
  const isRtl = locale === "ar"
  const textDirection = isRtl ? "rtl" : "ltr"

  return (
    <div className="flex p-4">
      <div className={`flex-1 ${isRtl ? "pl-3 order-2" : "pr-3 order-1"}`} dir={textDirection}>
        <h3 className="font-medium text-sm">{property.title[locale]}</h3>
        {property.showPrice !== false && (
          <p className="text-green-600 font-bold text-sm mt-1">{property.price.toLocaleString()} SAR</p>
        )}
        <div className="flex items-center mt-1">
          <div className="bg-gray-100 text-xs px-2 py-0.5 rounded-sm">{property.area} m²</div>
        </div>
        <div className="flex items-center mt-1">
          <div className="text-gray-500 text-xs flex items-center">
            <span className={`${isRtl ? "ml-1" : "mr-1"}`}>•</span>
            {property.type[locale]}
          </div>
        </div>
        <p className="text-gray-500 text-xs mt-1 flex items-center">
          <span className={`${isRtl ? "ml-1" : "mr-1"}`}>•</span>
          {property.address[locale]}
        </p>
      </div>
      <div className={`w-[120px] h-[100px] relative rounded-md overflow-hidden ${isRtl ? "order-1" : "order-2"}`}>
        <Image
          src={property.imageUrl || "/placeholder.svg"}
          alt={property.title[locale]}
          width={120}
          height={100}
          className="object-cover"
        />
      </div>
    </div>
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

