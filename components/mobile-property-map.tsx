"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { useLocale } from "next-intl"
import { useSearch } from "@/lib/search-context"
import type { PropertyType } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Layers, Navigation, Plus, Minus, List } from "lucide-react"
import { Link } from "@/i18n/navigation"

export default function MobilePropertyMap() {
  const t = useTranslations("app")
  const propertyT = useTranslations("app.property")
  const locale = useLocale()
  const isRtl = locale === "ar"

  const { filteredProperties } = useSearch()
  const mapCanvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedProperty, setSelectedProperty] = useState<PropertyType | null>(null)
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 })
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // Base coordinates (New York City)
  const baseCoordinates = {
    lat: 40.7128,
    lng: -74.006,
  }

  // Calculate map dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setMapDimensions({ width, height })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  // Reset map view when filtered properties change
  useEffect(() => {
    if (filteredProperties.length > 0) {
      // Reset the map view to fit all properties
      setScale(1)
      setOffset({ x: 0, y: 0 })
    }
  }, [filteredProperties])

  // Draw the map
  useEffect(() => {
    if (!mapCanvasRef.current || mapDimensions.width === 0) return

    const canvas = mapCanvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = mapDimensions.width
    canvas.height = mapDimensions.height

    // Draw map background
    ctx.fillStyle = "#f2f2f2"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid lines
    ctx.strokeStyle = "#e0e0e0"
    ctx.lineWidth = 1

    // Horizontal grid lines
    for (let y = 0; y < canvas.height; y += 50) {
      const adjustedY = y + (offset.y % 50)
      ctx.beginPath()
      ctx.moveTo(0, adjustedY)
      ctx.lineTo(canvas.width, adjustedY)
      ctx.stroke()
    }

    // Vertical grid lines
    for (let x = 0; x < canvas.width; x += 50) {
      const adjustedX = x + (offset.x % 50)
      ctx.beginPath()
      ctx.moveTo(adjustedX, 0)
      ctx.lineTo(adjustedX, canvas.height)
      ctx.stroke()
    }

    // Draw roads
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 8

    // Main horizontal road
    ctx.beginPath()
    ctx.moveTo(0, canvas.height / 2 + offset.y)
    ctx.lineTo(canvas.width, canvas.height / 2 + offset.y)
    ctx.stroke()

    // Main vertical road
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2 + offset.x, 0)
    ctx.lineTo(canvas.width / 2 + offset.x, canvas.height)
    ctx.stroke()

    // Secondary roads
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 5

    // Horizontal secondary roads
    for (let y = 0; y < canvas.height; y += 150) {
      if (Math.abs(y - canvas.height / 2) > 10) {
        const adjustedY = y + (offset.y % 150)
        ctx.beginPath()
        ctx.moveTo(0, adjustedY)
        ctx.lineTo(canvas.width, adjustedY)
        ctx.stroke()
      }
    }

    // Vertical secondary roads
    for (let x = 0; x < canvas.width; x += 150) {
      if (Math.abs(x - canvas.width / 2) > 10) {
        const adjustedX = x + (offset.x % 150)
        ctx.beginPath()
        ctx.moveTo(adjustedX, 0)
        ctx.lineTo(adjustedX, canvas.height)
        ctx.stroke()
      }
    }

    // Draw curved roads
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 4

    // Curved road 1
    ctx.beginPath()
    ctx.arc(canvas.width / 4 + offset.x, canvas.height / 4 + offset.y, 100, 0, Math.PI * 1.5, false)
    ctx.stroke()

    // Curved road 2
    ctx.beginPath()
    ctx.arc((canvas.width * 3) / 4 + offset.x, (canvas.height * 3) / 4 + offset.y, 120, Math.PI, Math.PI * 2.5, false)
    ctx.stroke()

    // Draw property markers
    filteredProperties.forEach((property) => {
      // Convert lat/lng to pixel coordinates (simplified)
      const x = canvas.width / 2 + (property.lng - baseCoordinates.lng) * 1000 * scale + offset.x
      const y = canvas.height / 2 - (property.lat - baseCoordinates.lat) * 1000 * scale + offset.y

      // Draw marker circle
      ctx.beginPath()
      ctx.arc(x, y, 16, 0, 2 * Math.PI)
      ctx.fillStyle = property.id === selectedProperty?.id ? "#4285F4" : "#ea4335"
      ctx.fill()

      // Draw price label
      ctx.fillStyle = "white"
      ctx.font = "bold 10px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(`BDT ${Math.floor(property.price / 1000)}k`, x, y)
    })
  }, [mapDimensions, scale, offset, baseCoordinates, filteredProperties, selectedProperty])

  // Handle mouse events for interactivity
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const dx = e.clientX - dragStart.x
    const dy = e.clientY - dragStart.y

    setOffset((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }))

    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setDragStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    })
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return

    const dx = e.touches[0].clientX - dragStart.x
    const dy = e.touches[0].clientY - dragStart.y

    setOffset((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }))

    setDragStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!mapCanvasRef.current) return

    const canvas = mapCanvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Check if a property marker was clicked
    for (const property of filteredProperties) {
      const markerX = canvas.width / 2 + (property.lng - baseCoordinates.lng) * 1000 * scale + offset.x
      const markerY = canvas.height / 2 - (property.lat - baseCoordinates.lat) * 1000 * scale + offset.y

      const distance = Math.sqrt(Math.pow(x - markerX, 2) + Math.pow(y - markerY, 2))

      if (distance <= 16) {
        setSelectedProperty(property)
        return
      }
    }

    // If no marker was clicked, deselect
    setSelectedProperty(null)
  }

  return (
    <div className="w-full h-full relative" ref={containerRef}>
      <canvas
        ref={mapCanvasRef}
        className="w-full h-full touch-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClick={handleCanvasClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />

      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <Button size="icon" variant="secondary" className="bg-white shadow-md rounded-full h-10 w-10">
          <Navigation className="h-5 w-5 text-gray-700" />
        </Button>
        <Button size="icon" variant="secondary" className="bg-white shadow-md rounded-full h-10 w-10">
          <Layers className="h-5 w-5 text-gray-700" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="bg-white shadow-md rounded-full h-10 w-10"
          onClick={() => setScale((prev) => Math.min(prev * 1.2, 5))}
        >
          <Plus className="h-5 w-5 text-gray-700" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="bg-white shadow-md rounded-full h-10 w-10"
          onClick={() => setScale((prev) => Math.max(prev * 0.8, 0.5))}
        >
          <Minus className="h-5 w-5 text-gray-700" />
        </Button>
      </div>

      {/* Show List Button */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <Button variant="secondary" className="bg-white shadow-md rounded-full px-4 py-2 flex items-center gap-2">
          <List className="h-4 w-4" />
         <Link href="/listings">{t("mobile.showList")}</Link>
        </Button>
      </div>

      {selectedProperty && (
        <div className="absolute bottom-20 left-4 right-4 z-10">
          <Card className="p-4 bg-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">BDT {selectedProperty.price.toLocaleString()}</h3>
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

