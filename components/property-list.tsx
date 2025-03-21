"use client"

import PropertyCard from "@/components/property-card"
import { useSearch } from "@/lib/search-context"
import { useTranslations } from "next-intl"

interface PropertyListProps {
  layout?: "list" | "grid"
}

export default function PropertyList({ layout = "list" }: PropertyListProps) {
  const t = useTranslations("app.search")
  const { filteredProperties } = useSearch()

  if (filteredProperties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12 text-center">
        <p className="text-lg font-medium mb-2">{t("noResults")}</p>
        <p className="text-gray-500">{t("tryAdjusting")}</p>
      </div>
    )
  }

  return (
    <div className={layout === "grid" ? "grid grid-cols-1 gap-6" : "flex flex-col gap-4"}>
      {filteredProperties.map((property) => (
        <PropertyCard key={property.id} property={property} layout={layout} />
      ))}
    </div>
  )
}

