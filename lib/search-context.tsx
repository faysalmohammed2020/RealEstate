"use client"

import React, { createContext, useContext, useState, type ReactNode } from "react"
import type { PropertyType } from "./types"
import { getProperties } from "./data"

interface SearchContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
  filteredProperties: PropertyType[]
  searchLocation: string
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchLocation, setSearchLocation] = useState("New York")

  // Filter properties based on search query
  const filteredProperties = React.useMemo(() => {
    const properties = getProperties()
    if (!searchQuery.trim()) return properties

    const query = searchQuery.toLowerCase().trim()
    return properties.filter(
      (property) =>
        property.address.toLowerCase().includes(query) ||
        property.city.toLowerCase().includes(query) ||
        property.zipCode.toLowerCase().includes(query) ||
        property.state.toLowerCase().includes(query),
    )
  }, [searchQuery])

  // Update search location when search query changes
  React.useEffect(() => {
    if (searchQuery.trim()) {
      // Extract location from search query (simplified)
      const query = searchQuery.trim()
      if (query.includes(",")) {
        // If query has a comma, use the part before the comma
        setSearchLocation(query.split(",")[0])
      } else {
        // Otherwise use the whole query
        setSearchLocation(query)
      }
    } else {
      setSearchLocation("New York")
    }
  }, [searchQuery])

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        filteredProperties,
        searchLocation,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}

