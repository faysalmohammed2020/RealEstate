"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { useSearch } from "@/lib/search-context"
import { useTranslations } from "next-intl"

export default function SearchBar() {
  const t = useTranslations("app.search")
  const { searchQuery, setSearchQuery } = useSearch()
  const [inputValue, setInputValue] = useState(searchQuery)

  // Update local input value when searchQuery changes
  useEffect(() => {
    setInputValue(searchQuery)
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchQuery(inputValue)
  }

  const clearSearch = () => {
    setInputValue("")
    setSearchQuery("")
  }

  return (
    <form onSubmit={handleSearch} className="relative">
      <Input
        type="text"
        placeholder={t("placeholder")}
        className="pl-10 pr-10 h-12 text-base"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />

      {inputValue && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-12 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      )}

      <Button type="submit" className="bg-green-600 hover:bg-green-500 absolute right-1 top-1/2 transform -translate-y-1/2 h-10">
        {t("button")}
      </Button>
    </form>
  )
}

