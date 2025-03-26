"use client";

import PropertyMap from "@/components/property-map";
import PropertyList from "@/components/property-list";
import SearchBar from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapIcon, ListIcon, SlidersHorizontal, UserIcon, MessageCircle, Briefcase } from "lucide-react";

import { useTranslations } from "next-intl";
import { useSearch } from "@/lib/search-context";
import { Link } from "@/i18n/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import Chat from "../components/chat"; // Importing the chat component
import { useState } from "react"; // Importing useState to manage chat visibility

const languageOptions = [
  { code: "en", label: "English", flag: "https://flagcdn.com/w40/us.png" },
  { code: "ar", label: "العربية", flag: "https://flagcdn.com/w40/sa.png" },
];

export default function DesktopView() {
  const router = useRouter();
  const t = useTranslations("app");
  const session = useSession();
  const changeLanguage = (lang: string) => {
    router.push(`/${lang}`);
  };

  // State to manage chat visibility
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Toggle chat visibility
  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <img src="/Boed Logo.png" width={120} height={120} />
          <nav className="ml-auto flex items-center gap-6">
            {/* Service Link */}
            <Link
              href="/services"
              className="flex items-center gap-1 font-bold text-gray-700 hover:text-gray-900"
            >
              <Briefcase className="h-5 w-5 font-bold" /> Service
            </Link>

            {/* Profile Link, only visible if the session exists */}
            {session?.data ? (
              <Link
                href="/profile"
                className="flex items-center gap-1 font-bold text-gray-700 hover:text-gray-900"
              >
                <UserIcon className="h-5 w-5 " /> Profile
              </Link>
            ) : null}

       
           {/* Navbar Chat Button */}
           <button
              onClick={toggleChat}
              className="flex items-center gap-1 font-bold text-gray-700 hover:text-gray-900"
            >
              <MessageCircle className="h-5 w-5" />
              Chat
            </button>
          </nav>

          {/* Language Selector */}
          <div className="ml-6 flex items-center gap-4">
            <div className="hidden md:flex items-center">
              <Typography
                variant="subtitle2"
                className="text-black font-semibold uppercase text-xs mb-1 p-4"
              >
                Choose Language :
              </Typography>
              <div className="flex items-center space-x-2">
                {languageOptions.map(({ code, label, flag }) => (
                  <button
                    key={code}
                    onClick={() => changeLanguage(code)}
                    className="flex flex-col items-center hover:opacity-75 transition duration-200"
                  >
                    <img
                      src={flag}
                      alt={label}
                      width={40}
                      height={40}
                      className="shadow-md"
                    />
                  </button>
                ))}
              </div>
            </div>
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
        <div className="container mx-auto px-4 pb-4">
          <SearchBar />
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <SearchResults />
      </div>

      {/* Conditionally render the Chat component at the bottom of the screen */}
          {/* Conditionally render the Chat component */}
          {isChatOpen && <Chat isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />}

    </main>
  );
}

function SearchResults() {
  const t = useTranslations("app");
  const { searchLocation, filteredProperties } = useSearch();

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">
          {t("search.results", {
            count: filteredProperties.length,
            location: searchLocation,
          })}
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            {t("navigation.filters")}
          </Button>
          <Tabs defaultValue="map" className="w-[200px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="map">
                <MapIcon className="h-4 w-4 mr-2" />
                {t("navigation.map")}
              </TabsTrigger>
              <TabsTrigger value="list">
                <ListIcon className="h-4 w-4 mr-2" />
                <Link href="/listings">{t("navigation.list")}</Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Tabs defaultValue="map" className="w-full">
        <TabsContent value="map" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-[calc(100vh-220px)] rounded-lg overflow-hidden border">
              <PropertyMap />
            </div>
            <div className="h-[calc(100vh-220px)] overflow-y-auto pr-2">
              <Link href="/listings">
                <PropertyList />
              </Link>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="list" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PropertyList layout="grid" />
          </div>
        </TabsContent>
      </Tabs>
      
    </>
  );
}
