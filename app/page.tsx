// import PropertyMap from "@/components/property-map"
// import PropertyList from "@/components/property-list"
// import SearchBar from "@/components/search-bar"
// import { Button } from "@/components/ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { MapIcon, ListIcon, SlidersHorizontal } from "lucide-react"
// import { SearchProvider } from "@/lib/search-context"

// export default function Home() {
//   return (
//     <SearchProvider>
//       <main className="min-h-screen bg-gray-50">
//         <header className="sticky top-0 z-10 bg-white shadow-sm">
//           <div className="container mx-auto px-4 py-4 flex items-center">
//             <img className="flex items-center"src="/logo.png" width={100} height={100}/>
//               <div className="ml-auto flex items-center gap-4">
//                 <Button variant="outline" size="sm">
//                 Sign In
//               </Button>
//               <Button size="sm">Sign Up</Button>
//             </div>
//           </div>
//           <div className="container mx-auto px-4 pb-4">
//             <SearchBar />
//           </div>
//         </header>

//         <div className="container mx-auto px-4 py-6">
//           <SearchResults />
//         </div>
//       </main>
//     </SearchProvider>
//   )
// }

// function SearchResults() {
//   const { searchLocation, filteredProperties } = useSearch()

//   return (
//     <>
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-semibold">
//           {filteredProperties.length} Properties in {searchLocation}
//         </h2>
//         <div className="flex items-center gap-2">
//           <Button variant="outline" size="sm">
//             <SlidersHorizontal className="h-4 w-4 mr-2" />
//             Filters
//           </Button>
//           <Tabs defaultValue="map" className="w-[200px]">
//             <TabsList className="grid w-full grid-cols-2">
//               <TabsTrigger value="map">
//                 <MapIcon className="h-4 w-4 mr-2" />
//                 Map
//               </TabsTrigger>
//               <TabsTrigger value="list">
//                 <ListIcon className="h-4 w-4 mr-2" />
//                 List
//               </TabsTrigger>
//             </TabsList>
//           </Tabs>
//         </div>
//       </div>

//       <Tabs defaultValue="map" className="w-full">
//         <TabsContent value="map" className="mt-0">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <div className="lg:col-span-2 h-[calc(100vh-220px)] rounded-lg overflow-hidden border">
//               <PropertyMap />
//             </div>
//             <div className="h-[calc(100vh-220px)] overflow-y-auto pr-2">
//               <PropertyList />
//             </div>
//           </div>
//         </TabsContent>
//         <TabsContent value="list" className="mt-0">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             <PropertyList layout="grid" />
//           </div>
//         </TabsContent>
//       </Tabs>
//     </>
//   )
// }

// function useSearch() {
//   // This is a client component that imports from a client module
//   // We need to dynamically import it to avoid "use client" directive errors
//   const { useSearch: actualUseSearch } = require("@/lib/search-context")
//   return actualUseSearch()
// }

