"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useTranslations } from "next-intl"
import { useLocale } from "next-intl"
import { useSearch } from "@/lib/search-context"
import type { PropertyType } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Layers, Navigation, Plus, Minus, List } from "lucide-react"
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api"
import { Link } from "@/i18n/navigation"

// Define the map container style
const mapContainerStyle = {
  width: "100%",
  height: "100%",
}

// Default center coordinates (New York City)
const center = {
  lat: 40.7128,
  lng: -74.006,
}

// Map options
const mapOptions = {
  fullscreenControl: false,
  streetViewControl: false,
  mapTypeControl: false,
  zoomControl: false,
  gestureHandling: "greedy",
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ],
}

// Declare google variable
declare global {
  interface Window {
    google: any
  }
}

export default function MobilePropertyMap() {
  const t = useTranslations("app")
  const propertyT = useTranslations("app.property")
  const locale = useLocale()
  const isRtl = locale === "ar"
  const containerRef = useRef<HTMLDivElement>(null)
  const { filteredProperties } = useSearch()
  const [selectedProperty, setSelectedProperty] = useState<PropertyType | null>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [mapType, setMapType] = useState<google.maps.MapTypeId>(google.maps.MapTypeId.ROADMAP)

  // Load the Google Maps JavaScript API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  })

  // Callback when map is loaded
  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map)
  }, [])

  // Callback when map is unmounted
  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  // Function to handle zoom in
  const handleZoomIn = () => {
    if (map) {
      map.setZoom((map.getZoom() || 10) + 1)
    }
  }

  // Function to handle zoom out
  const handleZoomOut = () => {
    if (map) {
      map.setZoom((map.getZoom() || 10) - 1)
    }
  }

  // Function to toggle map type
  const toggleMapType = () => {
    if (mapType === google.maps.MapTypeId.ROADMAP) {
      setMapType(google.maps.MapTypeId.SATELLITE)
    } else {
      setMapType(google.maps.MapTypeId.ROADMAP)
    }
  }

  // Function to center the map on user's location
  const centerOnUserLocation = () => {
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          map.setCenter(userLocation)
          map.setZoom(15)
        },
        () => {
          console.error("Error getting user location")
        },
      )
    }
  }

  // Function to fit bounds to show all properties
  const fitBoundsToProperties = useCallback(() => {
    if (map && filteredProperties.length > 0 && window.google) {
      const bounds = new window.google.maps.LatLngBounds()

      filteredProperties.forEach((property) => {
        bounds.extend({ lat: property.lat, lng: property.lng })
      })

      map.fitBounds(bounds)

      // Don't zoom in too far on small datasets
      const listener = window.google.maps.event.addListener(map, "idle", () => {
        if (map.getZoom() > 16) {
          map.setZoom(16)
        }
        window.google.maps.event.removeListener(listener)
      })
    }
  }, [map, filteredProperties])

  // Fit bounds when properties or map changes
  useEffect(() => {
    if (isLoaded && map && filteredProperties.length > 0) {
      fitBoundsToProperties()
    }
  }, [isLoaded, map, filteredProperties, fitBoundsToProperties])

  // Render loading state
  if (loadError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center p-4">
          <p className="text-red-500 font-medium">Error loading Google Maps</p>
          <p className="text-sm text-gray-600 mt-2">Please check your API key and try again</p>
        </div>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="w-full h-full relative" ref={containerRef}>
      {/* Google Map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          ...mapOptions,
          mapTypeId: mapType,
        }}
      >
        {/* Property Markers */}
        {filteredProperties.map((property) => (
          <Marker
            key={property.id}
            position={{ lat: property.lat, lng: property.lng }}
            onClick={() => setSelectedProperty(property)}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: property.id === selectedProperty?.id ? "#4285F4" : "#ea4335",
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: "#FFFFFF",
            }}
            label={{
              text: `$${Math.floor(property.price / 1000)}k`,
              color: "#FFFFFF",
              fontSize: "10px",
              fontWeight: "bold",
            }}
          />
        ))}

        {/* Info Window for Selected Property */}
        {selectedProperty && (
          <InfoWindow
            position={{ lat: selectedProperty.lat, lng: selectedProperty.lng }}
            onCloseClick={() => setSelectedProperty(null)}
          >
            <div className="p-2 max-w-[200px]">
              <h3 className="font-semibold text-sm">${selectedProperty.price.toLocaleString()}</h3>
              <p className="text-xs">
                {selectedProperty.bedrooms} {propertyT("beds")} • {selectedProperty.bathrooms} {propertyT("baths")} •{" "}
                {selectedProperty.sqft.toLocaleString()} {propertyT("sqft")}
              </p>
              <p className="text-xs text-gray-600 truncate">{selectedProperty.address}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <Button
          size="icon"
          variant="secondary"
          className="bg-white shadow-md rounded-full h-10 w-10"
          onClick={centerOnUserLocation}
        >
          <Navigation className="h-5 w-5 text-gray-700" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="bg-white shadow-md rounded-full h-10 w-10"
          onClick={toggleMapType}
        >
          <Layers className="h-5 w-5 text-gray-700" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="bg-white shadow-md rounded-full h-10 w-10"
          onClick={handleZoomIn}
        >
          <Plus className="h-5 w-5 text-gray-700" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="bg-white shadow-md rounded-full h-10 w-10"
          onClick={handleZoomOut}
        >
          <Minus className="h-5 w-5 text-gray-700" />
        </Button>
      </div>

      {/* Show List Button */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <Button variant="secondary" className="bg-white shadow-md rounded-full px-4 py-2 flex items-center gap-2">
          <List className="h-4 w-4" />
         <Link href="/listings">{t('mobile.showList')}</Link>
        </Button>
      </div>

      {/* Selected Property Card (Mobile View) */}
      {selectedProperty && (
        <div className="absolute bottom-20 left-4 right-4 z-10">
          <Card className="p-4 bg-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">${selectedProperty.price.toLocaleString()}</h3>
                <p className="text-sm">
                  {selectedProperty.bedrooms} {propertyT("beds")} • {selectedProperty.bathrooms} {propertyT("baths")} •{" "}
                  {selectedProperty.sqft.toLocaleString()} {propertyT("sqft")}
                </p>
                <p className="text-sm text-gray-600">{selectedProperty.address}</p>
              </div>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setSelectedProperty(null)}>
                ×
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

