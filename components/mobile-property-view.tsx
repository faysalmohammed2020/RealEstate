"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useLocale } from "next-intl"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  ChevronLeft,
  ChevronRight,
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

interface MobilePropertyViewProps {
  id: string
}

export default function MobilePropertyView({ id }: MobilePropertyViewProps) {
  const t = useTranslations("app.property")
  const locale = useLocale()
  const isRtl = locale === "ar"
  const [activeTab, setActiveTab] = useState("details")

  return (
    <main className="flex flex-col h-screen bg-white">
      {/* Property Image Header */}
      <div className="relative h-64 bg-gray-200">
        <Image src="/images/restaurant.jpg" alt="Property" fill className="object-cover" />

        {/* Top Navigation */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
          <Link href={`/${locale}`}>
            <Button size="sm" variant="outline" className="bg-white/80 h-8 px-2">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button size="icon" variant="outline" className="bg-white/80 h-8 w-8 rounded-full">
              <Share className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" className="bg-white/80 h-8 w-8 rounded-full">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs px-2 py-1 rounded-md flex items-center">
          <Camera className="h-3 w-3 mr-1" />
          See all photos...
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="details" className="w-full">
          <div className="px-4 pt-4 pb-2">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white mr-2">
                م.ع
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
            <div className="grid grid-cols-3 gap-2 mb-4">
              <Button className="bg-green-500 hover:bg-green-600 flex items-center justify-center">
                <Phone className="h-4 w-4 mr-1" />
                Call
              </Button>
              <Button className="bg-green-400 hover:bg-green-500 flex items-center justify-center">
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
                  className="mr-1"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Whatsapp
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-600 flex items-center justify-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                Chat
              </Button>
            </div>

            {/* Advertisement Notice */}
            <div className="bg-gray-100 p-3 rounded-md mb-4 flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-600">
                Advertisement: Dealing with or without payments makes you responsible to the description and information
              </p>
            </div>

            <h3 className="font-bold text-lg mb-2">District Information for Al Gharra</h3>

            <div className="flex items-center mb-4">
              <div className="mr-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <p className="text-sm font-medium">Average meter price</p>
                <p className="text-sm text-gray-600">1710 SAR Semiannually</p>
              </div>
            </div>

            <p className="text-xs text-gray-500 mb-4">Based on the data of the ads published on Aqar platform</p>
          </div>

          {/* Tabs Navigation */}
          <TabsList className="grid grid-cols-3 bg-gray-100 p-1 rounded-none border-y">
            <TabsTrigger
              value="details"
              className={cn("rounded-md text-sm", activeTab === "details" ? "bg-white shadow-sm" : "")}
              onClick={() => setActiveTab("details")}
            >
              Listing Main Details
            </TabsTrigger>
            <TabsTrigger
              value="additional"
              className={cn("rounded-md text-sm", activeTab === "additional" ? "bg-white shadow-sm" : "")}
              onClick={() => setActiveTab("additional")}
            >
              Additional Information
            </TabsTrigger>
            <TabsTrigger
              value="location"
              className={cn("rounded-md text-sm", activeTab === "location" ? "bg-white shadow-sm" : "")}
              onClick={() => setActiveTab("location")}
            >
              Location
            </TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="details" className="p-4 mt-0">
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h2 className="text-xl font-bold mb-2">Land for sale</h2>
                <p className="text-green-600 font-bold text-xl mb-4">1,100,000 SAR</p>

                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Would you like to own the property?</span>
                  <Button variant="outline" className="text-blue-500 border-blue-500 h-8">
                    Financing options
                  </Button>
                </div>

                <h3 className="font-bold mb-2">Listing details</h3>

                <div className="space-y-3">
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
                <h3 className="font-bold mb-2">Property Features</h3>
                {/* Features would go here */}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="additional" className="p-4 mt-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Listing ID</span>
                <span className="font-medium">6100932</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Created At</span>
                <span className="font-medium">2025/02/11</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">License Number</span>
                <span className="font-medium">7200438430</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Last Updated</span>
                <span className="font-medium">3 Days Ago</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">License Expiration Date</span>
                <span className="font-medium">01/02/2026</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Source</span>
                <span className="font-medium text-right">الهيئة العامة للعقار</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Deed Area</span>
                <span className="font-medium">1013.87 M2</span>
              </div>

              <div className="flex justify-center mt-4">
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
            <div className="p-4">
              <h3 className="font-bold mb-2">Extra</h3>
              <p className="text-gray-600 mb-4 text-right">
                للبيع أرض سكنية على ثلاث شوارع حي جوهرة الأحمد داخل النطاق العمراني المدينة المنورة
              </p>
              <Button variant="link" className="text-blue-500 p-0 h-auto mb-4">
                Read more
              </Button>
            </div>

            <div className="px-4 pb-4">
              <div className="bg-green-500 text-white p-4 rounded-lg flex items-center mb-4">
                <div className="mr-4">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                  <h4 className="font-bold text-lg">أجرة تسويق</h4>
                  <p>إدفع بعد البيع</p>
                </div>
                <div className="ml-auto">
                  <Image
                    src="/images/qr-code.png"
                    alt="QR Code"
                    width={60}
                    height={60}
                    className="bg-white p-1 rounded"
                  />
                </div>
              </div>
            </div>

            <div className="px-4 pb-4">
              <h3 className="font-bold mb-2">Location</h3>
              <div className="h-48 bg-gray-200 rounded-lg overflow-hidden relative">
                <Image src="/images/map.png" alt="Map" fill className="object-cover" />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="p-4">
          <h3 className="font-bold mb-3">Similar ads nearby</h3>
          <div className="space-y-3">
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
            <SimilarListing
              title="Lounge for Sale"
              price="1,700,000 SAR"
              area="344m²"
              type="Commercial or residential"
              imageUrl="/images/lounge.png"
            />
          </div>

          <Button className="w-full mt-4 bg-green-500 hover:bg-green-600">Follow</Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="grid grid-cols-5 border-t">
        <Button variant="ghost" className="flex flex-col items-center justify-center py-2 rounded-none">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button variant="ghost" className="flex flex-col items-center justify-center py-2 rounded-none">
          <Phone className="h-5 w-5 text-green-500" />
        </Button>
        <Button variant="ghost" className="flex flex-col items-center justify-center py-2 rounded-none">
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
            className="text-green-500"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center justify-center py-2 rounded-none">
          <MessageSquare className="h-5 w-5 text-blue-500" />
        </Button>
        <Button variant="ghost" className="flex flex-col items-center justify-center py-2 rounded-none">
          <ChevronRight className="h-5 w-5" />
        </Button>
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
    <div className="flex items-center border-b pb-3">
      <div className="flex-1">
        <h4 className="font-medium text-sm text-green-600">{title}</h4>
        <p className="text-green-600 text-sm">{price}</p>
        <div className="flex items-center mt-1">
          <div className="bg-gray-100 text-xs px-2 py-0.5 rounded-sm">{area}</div>
        </div>
        <div className="text-gray-500 text-xs mt-1">• {type}</div>
        <div className="text-gray-500 text-xs mt-1 text-right">• شارع الخليج، الخبر، المملكة العربية السعودية</div>
      </div>
      <div className="w-20 h-20 relative ml-3">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          width={80}
          height={80}
          className="object-cover rounded"
        />
      </div>
    </div>
  )
}

