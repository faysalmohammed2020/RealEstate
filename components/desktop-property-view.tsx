"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useLocale } from "next-intl"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  ChevronLeft,
  Camera,
  Heart,
  Share,
  MapPin,
  Phone,
  MessageSquare,
  Star,
  AlertTriangle,
  Tag,
  FileText,
  Info,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import LanguageSelector from "@/components/language-selector"

interface DesktopPropertyViewProps {
  id: string
}

export default function DesktopPropertyView({ id }: DesktopPropertyViewProps) {
  const t = useTranslations("app.property")
  const locale = useLocale()
  const isRtl = locale === "ar"
  const [activeTab, setActiveTab] = useState("details")

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Link href={`/${locale}`}>
            <h1 className="text-2xl font-bold text-green-600">{t("title")}</h1>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <LanguageSelector />
            <Button variant="outline" size="sm">
              {t("signIn")}
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              {t("signUp")}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Link href={`/${locale}`} className="flex items-center text-sm mb-4 hover:underline">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to listings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Property Image */}
            <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden mb-6">
              <Image src="/images/restaurant.jpg" alt="Property" fill className="object-cover" />

              {/* Image Controls */}
              <div className="absolute top-4 right-4 flex gap-2">
                <Button size="icon" variant="outline" className="bg-white/80 h-10 w-10 rounded-full">
                  <Share className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="outline" className="bg-white/80 h-10 w-10 rounded-full">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-4 bg-black/60 text-white text-sm px-3 py-1.5 rounded-md flex items-center">
                <Camera className="h-4 w-4 mr-2" />
                See all photos...
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <Tabs defaultValue="details" className="w-full">
                {/* Tabs Navigation */}
                <div className="border-b">
                  <TabsList className="p-0 bg-transparent h-auto">
                    <TabsTrigger
                      value="details"
                      className={cn(
                        "rounded-none px-6 py-3 data-[state=active]:bg-transparent",
                        activeTab === "details" ? "border-b-2 border-green-500 text-green-600 font-medium" : "",
                      )}
                      onClick={() => setActiveTab("details")}
                    >
                      Listing Main Details
                    </TabsTrigger>
                    <TabsTrigger
                      value="additional"
                      className={cn(
                        "rounded-none px-6 py-3 data-[state=active]:bg-transparent",
                        activeTab === "additional" ? "border-b-2 border-green-500 text-green-600 font-medium" : "",
                      )}
                      onClick={() => setActiveTab("additional")}
                    >
                      Additional Information
                    </TabsTrigger>
                    <TabsTrigger
                      value="location"
                      className={cn(
                        "rounded-none px-6 py-3 data-[state=active]:bg-transparent",
                        activeTab === "location" ? "border-b-2 border-green-500 text-green-600 font-medium" : "",
                      )}
                      onClick={() => setActiveTab("location")}
                    >
                      Location
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* Tab Contents */}
                <TabsContent value="details" className="p-6 mt-0">
                  <div className="space-y-6">
                    <div className="border-b pb-6">
                      <h2 className="text-2xl font-bold mb-3">Land for sale</h2>
                      <p className="text-green-600 font-bold text-2xl mb-6">1,100,000 SAR</p>

                      <div className="flex justify-between mb-6">
                        <span className="text-gray-600">Would you like to own the property?</span>
                        <Button variant="outline" className="text-blue-500 border-blue-500 h-8">
                          Financing options
                        </Button>
                      </div>

                      <h3 className="font-bold mb-3">Listing details</h3>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-gray-500" />
                            <span>Area</span>
                          </div>
                          <span className="font-medium">1013</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Tag className="h-5 w-5 mr-2 text-gray-500" />
                            <span>Price Per Meter</span>
                          </div>
                          <span className="font-medium">1085 Riyal</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                            <span>Street Direction</span>
                          </div>
                          <span className="font-medium">3 Streets</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Info className="h-5 w-5 mr-2 text-gray-500" />
                            <span>Type</span>
                          </div>
                          <span className="font-medium">Residential</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-2 text-gray-500"
                            >
                              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                            </svg>
                            <span>Street Width</span>
                          </div>
                          <span className="font-medium">25 meter</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold mb-3">Property Features</h3>
                      {/* Features would go here */}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="additional" className="p-6 mt-0">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b">
                      <span className="text-gray-600">Listing ID</span>
                      <span className="font-medium">6100932</span>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b">
                      <span className="text-gray-600">Created At</span>
                      <span className="font-medium">2025/02/11</span>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b">
                      <span className="text-gray-600">License Number</span>
                      <span className="font-medium">7200438430</span>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b">
                      <span className="text-gray-600">Last Updated</span>
                      <span className="font-medium">3 Days Ago</span>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b">
                      <span className="text-gray-600">License Expiration Date</span>
                      <span className="font-medium">01/02/2026</span>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b">
                      <span className="text-gray-600">Source</span>
                      <span className="font-medium text-right">الهيئة العامة للعقار</span>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b">
                      <span className="text-gray-600">Deed Area</span>
                      <span className="font-medium">1013.87 M2</span>
                    </div>

                    <div className="flex justify-center mt-6">
                      <Button variant="outline" className="text-red-500 border-red-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 text-red-500"
                        >
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                        Report Add
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="location" className="mt-0">
                  <div className="p-6">
                    <h3 className="font-bold mb-3">Extra</h3>
                    <p className="text-gray-600 mb-4 text-right">
                      للبيع أرض سكنية على ثلاث شوارع حي جوهرة الأحمد داخل النطاق العمراني المدينة المنورة
                    </p>
                    <Button variant="link" className="text-blue-500 p-0 h-auto mb-6">
                      Read more
                    </Button>

                    <div className="bg-green-500 text-white p-6 rounded-lg flex items-center mb-6">
                      <div className="mr-6">
                        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M20 9V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V17"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M12 12H21M21 12L18 9M21 12L18 15"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl">أجرة تسويق</h4>
                        <p className="text-lg">إدفع بعد البيع</p>
                      </div>
                      <div className="ml-auto">
                        <Image
                          src="/images/qr-code.png"
                          alt="QR Code"
                          width={80}
                          height={80}
                          className="bg-white p-1 rounded"
                        />
                      </div>
                    </div>

                    <h3 className="font-bold mb-3">Location</h3>
                    <div className="h-80 bg-gray-200 rounded-lg overflow-hidden relative">
                      <Image src="/images/map.png" alt="Map" fill className="object-cover" />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="lg:col-span-1">
            {/* Agent Info Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center text-white mr-3">
                  <span className="text-xl font-semibold">م.ع</span>
                </div>
                <div>
                  <h2 className="font-bold text-lg">م. عمر المصيريع</h2>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm">4.9 Reviews (10)</span>
                  </div>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="space-y-3">
                <Button className="w-full bg-green-500 hover:bg-green-600 flex items-center justify-center">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
                <Button className="w-full bg-green-400 hover:bg-green-500 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  Whatsapp
                </Button>
                <Button className="w-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat
                </Button>
              </div>

              {/* Advertisement Notice */}
              <div className="bg-gray-100 p-4 rounded-md mt-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600">
                    Advertisement: Dealing with or without payments makes you responsible to the description and
                    information
                  </p>
                </div>
              </div>
            </div>

            {/* District Information */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">District Information for Al Gharra</h3>

              <div className="flex items-center mb-4">
                <div className="mr-3">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M2 12H4M20 12H22M12 2V4M12 20V22M6.34 6.34L4.93 4.93M19.07 4.93L17.66 6.34M17.66 17.66L19.07 19.07M4.93 19.07L6.34 17.66"
                      stroke="#10B981"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
                      stroke="#10B981"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Average meter price</p>
                  <p className="text-gray-600">1710 SAR Semiannually</p>
                </div>
              </div>

              <p className="text-sm text-gray-500">Based on the data of the ads published on Aqar platform</p>
            </div>

            {/* Similar Listings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-lg mb-4">Similar ads nearby</h3>
              <div className="space-y-4">
                <SimilarListing
                  title="Store for sale"
                  price="5,200,000 SAR"
                  area="322m²"
                  type="Commercial or residential"
                  imageUrl="/images/store.png"
                />
                <SimilarListing
                  title="Apartment for sale"
                  price="1,200,000 SAR"
                  area="240m²"
                  type="Commercial or residential"
                  imageUrl="/images/apartment1.png"
                />
                <SimilarListing
                  title="Villa for sale"
                  price="3,500,000 SAR"
                  area="344m²"
                  type="Commercial or residential"
                  imageUrl="/images/villa.png"
                />
              </div>

              <Button className="w-full mt-6 bg-green-500 hover:bg-green-600">Follow</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

interface SimilarListingProps {
  title: string
  price: string
  area: string
  type: string
  imageUrl: string
}

function SimilarListing({ title, price, area, type, imageUrl }: SimilarListingProps) {
  return (
    <div className="flex items-center border-b pb-4">
      <div className="flex-1">
        <h4 className="font-medium text-sm text-green-600">{title}</h4>
        <p className="text-green-600 text-sm">{price}</p>
        <div className="flex items-center mt-1">
          <div className="bg-gray-100 text-xs px-2 py-0.5 rounded-sm">{area}</div>
        </div>
        <div className="text-gray-500 text-xs mt-1">• {type}</div>
        <div className="text-gray-500 text-xs mt-1 text-right">• شارع الخليج، الخبر، المملكة العربية السعودية</div>
      </div>
      <div className="w-24 h-24 relative ml-3">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          width={96}
          height={96}
          className="object-cover rounded"
        />
      </div>
    </div>
  )
}

