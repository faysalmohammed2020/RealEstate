export interface PropertyType {
  id: string
  price: number
  address: string
  city: string
  state: string
  zipCode: string
  bedrooms: number
  bathrooms: number
  sqft: number
  type: "House" | "Condo" | "Apartment" | "Townhouse"
  imageUrl: string
  lat: number
  lng: number
}

