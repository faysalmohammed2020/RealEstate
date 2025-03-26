"use client"

import type React from "react"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { ChevronLeft, Globe, ChevronRight,CirclePlus, Search,User, MessageSquare, Grip, Headset, HandHelping, Podcast, ShieldMinus, FolderCode,UserIcon, MessageCircle, Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import LanguageSelector from "@/components/language-selector"
import { Link } from "@/i18n/navigation"
import { signOut, useSession } from "@/lib/auth-client"
import { Button } from "@/components/ui/button";

export default function ServicesPage() {
  const locale = useLocale()
  const isMobile = useIsMobile()
  
 

  return (
    <div className="min-h-screen bg-gray-50">
      {isMobile ? <MobileView locale={locale} /> : <DesktopView locale={locale} />}
    </div>
  )
}

function MobileView({ locale }: { locale: string }) {
  const t = useTranslations("app")
  const session = useSession()
  return (
    <div className="mx-auto h-screen max-w-md overflow-hidden bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <div className="flex items-center">
          <ChevronLeft className="mr-1 h-5 w-5" />
         <Link href="/"> <span className="text-sm font-medium">{t("listings.title")}</span></Link>
        </div>
        
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

      {/* Search bar */}
      <div className="px-4 py-3  ">
        <div className=" flex items-center justify-center rounded-md border border-green-600 px-3 py-2.5">
          <div className="mr-2 text-green-500">
          <Headset />
          </div>
          <span className="text-sm text-green-500">{t("service.cs")}</span>
        </div>
      </div>

      {/* Service categories */}
      <div className="grid grid-cols-3 gap-4 px-4 py-3">
  {[
    { icon: <Podcast />, title: t("service.subscription") },
    { icon: <ShieldMinus />, title: t("service.PS") },
    { icon: <FolderCode />, title: t("service.DS") },
  ].map((item, index) => (
    <div key={index} className="flex flex-col items-center justify-center border rounded-lg p-4 shadow-sm">
      <div className="text-black text-2xl">{item.icon}</div>
      <span className="mt-2 text-sm font-medium text-black text-center">{item.title}</span>
    </div>
  ))}
</div>
      
      
      <div className="flex ml-5">
      <HandHelping />
      <p className="ml-2">{t("service.services")}</p>
      </div>
      {/* Service list */}
      <div className="mt-2 flex-1 px-4 py-3">
        <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-gray-200">
          <ServiceItem title={t("service.today")} />
          <ServiceItem title={t("service.Ls")} />
          <ServiceItem title={t("service.SR")} />
          <ServiceItem title={t("service.EMS")} />
          <ServiceItem title={t("service.BOEDRS")} isLast />
        </div>
      </div>

      <div className = "flex ml-5">
        <img src="/Boed2.png " width={75} height={75}/>
        <p className="mt-5 ml-3">Birds of Eden App</p>
        </div>
        <div className="mt-2 flex-1 px-4 py-3">
        <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-gray-200">
          <ServiceItem title={t("service.BREB")} />
          <ServiceItem title={t("service.LD")} isLast />
        </div>
      </div>
      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 flex h-16 items-center justify-between border-t border-gray-200 bg-white px-6">
        <NavItem icon={<User className="h-6 w-6" />} label="Profile" active />
        <NavItem
          icon=
            {<Search size={20} />}
          
          label="Search"
        />
        <NavItem
          icon={<CirclePlus size={20} />}
          label="Add"
        />
        <NavItem icon={<MessageSquare className="h-6 w-6" />} label="Chat" />
        <NavItem
         icon={<Grip size={20} />}
          label="Service"
        />
      </div>
    </div>
  )
}

// Replace the entire DesktopView function with this more professional version
function DesktopView({ locale }: { locale: string }) {
  const session = useSession();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional header with shadow */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative h-8 w-8 mr-3">
              <Image src="/Boed Logo.png" alt="Birds Of Eden" width={250} height={250}  className="object-contain" />
            </div>
            
          </div>
          <div className="flex items-center space-x-4">
          <nav className="ml-auto flex items-center gap-6">
            <Link href="/services" className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
              <Briefcase className="h-5 w-5" /> Service
            </Link>
            <Link href="/chat" className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
              <MessageCircle className="h-5 w-5" />Chat
            </Link>
            {session?.data ? (
              <Link href="/profile" className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
                <UserIcon className="h-5 w-5" /> Profile
              </Link>
            ) : null}
          </nav>
             <LanguageSelector/>
           
            <button className="flex items-center space-x-2 bg-green-50 text-green-600 px-4 py-2 rounded-md hover:bg-green-100 transition-colors">
              <span className="font-medium">Contact Us</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <a href="#" className="hover:text-green-600 transition-colors">
            Home
          </a>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="font-medium text-gray-700">Services</span>
        </div>

        {/* Page title */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Our Services</h2>
          <p className="text-gray-600 max-w-3xl">
            Explore our comprehensive range of real estate services designed to meet your property needs.
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-10">
          <div className="flex items-center rounded-lg border border-gray-300 px-4 py-3 max-w-xl bg-white shadow-sm hover:shadow transition-shadow">
            <div className="mr-3 text-green-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 22V12H15V22"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-base text-gray-500">Customer Service</span>
          </div>
        </div>

        {/* Service categories */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Service Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <ProfessionalServiceCategory
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11 4H4V11H11V4Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 4H13V11H20V4Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11 13H4V20H11V13Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 13H13V20H20V13Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              title="Subscriptions"
              description="Manage your subscription plans"
            />
            <ProfessionalServiceCategory
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 9H9V15H15V9Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              title="Selling and Leasing"
              description="Property sales and rental services"
            />
            <ProfessionalServiceCategory
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 16V12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8H12.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              title="Developer Services"
              description="Solutions for property developers"
            />
            <ProfessionalServiceCategory
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              title="Professional Services"
              description="Expert real estate consulting"
            />
          </div>
        </div>

        {/* Service list */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Available Services</h3>
          <div className="overflow-hidden rounded-xl bg-white shadow border border-gray-200 divide-y divide-gray-100">
            <ProfessionalServiceItem
              title="Today Ads"
              description="View and manage your current advertisements"
              icon={
                <svg
                  className="h-5 w-5 text-green-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 7H7V17H9V7Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 7H15V13H17V7Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
            <ProfessionalServiceItem
              title="Lease Contracts"
              description="Manage and review your property lease agreements"
              icon={
                <svg
                  className="h-5 w-5 text-green-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 2V8H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 13H8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 17H8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 9H9H8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
            <ProfessionalServiceItem
              title="Search Requests"
              description="Track and manage your property search criteria"
              icon={
                <svg
                  className="h-5 w-5 text-green-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 21L16.65 16.65"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
            <ProfessionalServiceItem
              title="Exclusive Marketing Services"
              description="Premium marketing solutions for your properties"
              icon={
                <svg
                  className="h-5 w-5 text-green-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8V16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 12H16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
            <ProfessionalServiceItem
              title="Birds of Eden Real Estate"
              description="Full-service real estate agency solutions"
              icon={
                <svg
                  className="h-5 w-5 text-green-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 22V12H15V22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
          </div>
        </div>

        {/* Contact section */}
        <div className="bg-white rounded-xl shadow border border-gray-200 p-6 mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Need assistance with our services?</h3>
              <p className="text-gray-600 mb-4 md:mb-0">
                Our team of experts is ready to help you find the perfect solution.
              </p>
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="relative h-8 w-8 mr-3">
                <Image src="/Boed Logo.png" alt="Birds Of Eden" fill className="object-contain" />
              </div>
              <span className="text-gray-600">© 2025 Birds of Eden Real Estate. All rights reserved.</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-green-600 transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600 transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Add these new professional components
interface ProfessionalServiceCategoryProps {
  icon: React.ReactNode
  title: string
  description: string
}

function ProfessionalServiceCategory({ icon, title, description }: ProfessionalServiceCategoryProps) {
  return (
    <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-green-200">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600">
        {icon}
      </div>
      <h4 className="mb-2 font-semibold text-gray-800">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}

interface ProfessionalServiceItemProps {
  title: string
  description: string
  icon: React.ReactNode
}

function ProfessionalServiceItem({ title, description, icon }: ProfessionalServiceItemProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer">
      <div className="flex items-center">
        <div className="mr-4 flex-shrink-0">{icon}</div>
        <div>
          <h4 className="font-medium text-gray-800">{title}</h4>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-gray-400" />
    </div>
  )
}

interface ServiceCategoryProps {
  icon: React.ReactNode
  title: string
}

function ServiceCategory({ icon, title }: ServiceCategoryProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        <div className="text-gray-700">{icon}</div>
      </div>
      <span className="text-center text-xs">{title}</span>
    </div>
  )
}

function DesktopServiceCategory({ icon, title }: ServiceCategoryProps) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
        <div className="text-gray-700">{icon}</div>
      </div>
      <span className="text-center text-sm font-medium">{title}</span>
    </div>
  )
}

interface ServiceItemProps {
  title: string
  isLast?: boolean
}

function ServiceItem({ title, isLast = false }: ServiceItemProps) {
  return (
    <div className={cn("flex items-center justify-between px-4 py-3", !isLast && "border-b border-gray-100")}>
      <span className="text-sm font-medium">{title}</span>
      <ChevronRight className="h-5 w-5 text-gray-400" />
    </div>
  )
}

function DesktopServiceItem({ title, isLast = false }: ServiceItemProps) {
  return (
    <div className={cn("flex items-center justify-between px-6 py-4", !isLast && "border-b border-gray-100")}>
      <span className="text-base font-medium">{title}</span>
      <ChevronRight className="h-5 w-5 text-gray-400" />
    </div>
  )
}

interface NavItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
}

function NavItem({ icon, label, active = false }: NavItemProps) {
  return (
    <div className="flex flex-col items-center">
      <div className={cn("text-gray-500", active && "text-green-500")}>{icon}</div>
      <span className={cn("mt-1 text-xs text-gray-500", active && "text-green-500")}>{label}</span>
    </div>
  )
}

interface SidebarNavItemProps {
  icon: React.ReactNode
  title: string
  active?: boolean
}

function SidebarNavItem({ icon, title, active = false }: SidebarNavItemProps) {
  return (
    <a
      href="#"
      className={cn(
        "flex items-center rounded-md px-3 py-2 text-sm font-medium",
        active ? "bg-green-50 text-green-600" : "text-gray-700 hover:bg-gray-100",
      )}
    >
      <span className="mr-3">{icon}</span>
      {title}
    </a>
  )
}

