"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Search, Filter, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import LanguageSelector from "@/components/language-selector";
import { propertyListings } from "@/lib/property-data";
import type { PropertyData } from "@/lib/property-data";
import { signOut, useSession } from "@/lib/auth-client";

export default function DesktopListingsView() {
  const t = useTranslations("app");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [activeTab, setActiveTab] = useState("latest");
  const session = useSession();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-md">
        <div className="container mx-auto flex items-center px-6 py-4">
          <Link href={`/${locale}`} className="text-2xl font-bold text-green-600">
            {t("title")}
          </Link>
          <div className="ml-6 flex-1 max-w-md">
            <div className="relative">
              <Input type="text" placeholder={t("search.placeholder")} className="pl-10 pr-4 h-10 rounded-md border" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <LanguageSelector />
            {session?.data ? (
              <Button variant="outline" size="sm" onClick={() => signOut()} className="px-4">
                Log Out
              </Button>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button variant="outline" size="sm" className="px-4">
                    {t("auth.signIn")}
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button size="sm" className="bg-green-600 hover:bg-green-500 px-4">
                    {t("auth.signUp")}
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold">{t("listings.title")}</h2>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-2 px-4">
              <Filter className="h-4 w-4" />
              {t("navigation.filters")}
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2 px-4">
              <MapPin className="h-4 w-4" />
              {t("navigation.map")}
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-sm flex overflow-hidden">
          {["latest", "price", "nearest"].map((tab) => (
            <Button
              key={tab}
              variant="ghost"
              className={cn(
                "flex-1 h-12 rounded-none text-center transition-all duration-200",
                activeTab === tab ? "bg-green-500 text-white font-medium" : "hover:bg-gray-100"
              )}
              onClick={() => setActiveTab(tab)}
            >
              {t(`listings.filters.${tab}`)}
            </Button>
          ))}
        </div>

        {/* Listings */}
        <div className="bg-white rounded-lg shadow-md mt-5 divide-y">
          {propertyListings.map((property, index) => (
            <Link href={`/${locale}/property/${property.id}`} key={property.id} className="block">
              <PropertyListing
                property={property}
                locale={locale as "en" | "ar"}
                className={index === propertyListings.length - 1 ? "border-b-0" : ""}
              />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

interface PropertyListingProps {
  property: PropertyData;
  locale: "en" | "ar";
  className?: string;
}

function PropertyListing({ property, locale, className = "" }: PropertyListingProps) {
  const isRtl = locale === "ar";
  const textDirection = isRtl ? "rtl" : "ltr";

  return (
    <div className={cn("flex p-5 hover:bg-gray-50 transition-all", className)}>
      <div className={`flex-1 ${isRtl ? "pl-5 order-2" : "pr-5 order-1"}`} dir={textDirection}>
        <h3 className="font-semibold text-lg text-gray-800">{property.title[locale]}</h3>
        {property.showPrice !== false && (
          <p className="text-green-600 font-bold text-lg mt-1">{property.price.toLocaleString()} SAR</p>
        )}
        <div className="flex items-center mt-2 text-sm text-gray-600">
          <div className="bg-gray-100 px-3 py-1 rounded">{property.area} m²</div>
          <span className={`${isRtl ? "ml-2" : "mr-2"}`}>•</span>
          {property.type[locale]}
        </div>
        <p className="text-gray-500 text-sm mt-2 flex items-center">
          <span className={`${isRtl ? "ml-1" : "mr-1"}`}>•</span>
          {property.address[locale]}
        </p>
      </div>
      <div className={`w-[220px] h-[160px] relative rounded-md overflow-hidden ${isRtl ? "order-1" : "order-2"}`}>
        <Image
          src={property.imageUrl || "/placeholder.svg"}
          alt={property.title[locale]}
          width={220}
          height={160}
          className="object-cover"
        />
      </div>
    </div>
  );
}
