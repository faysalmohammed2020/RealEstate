"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { PropertyType } from "@/lib/types"
import { useTranslations } from "next-intl"

interface PropertyCardProps {
  property: PropertyType
  layout?: "list" | "grid"
}

export default function PropertyCard({ property, layout = "list" }: PropertyCardProps) {
  const t = useTranslations("app.property")

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <Image
          src={property.imageUrl || "/placeholder.svg"}
          alt={property.address}
          width={500}
          height={300}
          className="w-full h-48 object-cover"
        />
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full">
          <Heart className="h-5 w-5" />
        </Button>
        <Badge className="absolute bottom-2 left-2 bg-white text-black hover:bg-white">
          {t(property.type.toLowerCase() as "house" | "condo" | "apartment" | "townhouse")}
        </Badge>
      </div>
      <CardContent className="p-4">
        <div className="flex flex-col gap-1">
          <p className="text-xl font-bold">${property.price.toLocaleString()}</p>
          <div className="flex gap-2 text-sm">
            <span>
              {property.bedrooms} {t("beds")}
            </span>
            <span>•</span>
            <span>
              {property.bathrooms} {t("baths")}
            </span>
            <span>•</span>
            <span>
              {property.sqft.toLocaleString()} {t("sqft")}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{property.address}</p>
          <p className="text-sm text-gray-600">
            {property.city}, {property.state} {property.zipCode}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

