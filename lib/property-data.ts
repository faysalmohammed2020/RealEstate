export interface PropertyData {
    id: string
    title: {
      en: string
      ar: string
    }
    price: number
    area: number
    type: {
      en: string
      ar: string
    }
    address: {
      en: string
      ar: string
    }
    imageUrl: string
    showPrice?: boolean
  }
  
  export const propertyListings: PropertyData[] = [
    {
      id: "1",
      title: {
        en: "Lounge for Sale",
        ar: "صالة للبيع",
      },
      price: 325000,
      area: 322,
      type: {
        en: "Commercial or residential",
        ar: "تجاري أو سكني",
      },
      address: {
        en: "Gulf Road, Khobar, Saudi Arabia",
        ar: "شارع الخليج، الخبر، المملكة العربية السعودية",
      },
      imageUrl: "/dt3.jpg",
    },
    {
      id: "2",
      title: {
        en: "Store for sale",
        ar: "محل للبيع",
      },
      price: 300000,
      area: 280,
      type: {
        en: "Commercial or residential",
        ar: "تجاري أو سكني",
      },
      address: {
        en: "King Fahd Road, Dammam, Saudi Arabia",
        ar: "طريق الملك فهد، الدمام، المملكة العربية السعودية",
      },
      imageUrl: "/dt3.jpg",
    },
    {
      id: "3",
      title: {
        en: "Apartment for sale",
        ar: "شقة للبيع",
      },
      price: 200000,
      area: 322,
      type: {
        en: "Commercial or residential",
        ar: "تجاري أو سكني",
      },
      address: {
        en: "Prince Sultan Road, Khobar, Saudi Arabia",
        ar: "طريق الأمير سلطان، الخبر، المملكة العربية السعودية",
      },
      imageUrl: "/dt3.jpg",
    },
    {
      id: "4",
      title: {
        en: "Villa for sale",
        ar: "فيلا للبيع",
      },
      price: 200000,
      area: 344,
      type: {
        en: "Commercial or residential",
        ar: "تجاري أو سكني",
      },
      address: {
        en: "Al Olaya District, Riyadh, Saudi Arabia",
        ar: "حي العليا، الرياض، المملكة العربية السعودية",
      },
      imageUrl: "/dt3.jpg",
    },
    {
      id: "5",
      title: {
        en: "Apartment for sale",
        ar: "شقة للبيع",
      },
      price: 0,
      area: 0,
      type: {
        en: "Commercial or residential",
        ar: "تجاري أو سكني",
      },
      address: {
        en: "Al Rawdah District, Jeddah, Saudi Arabia",
        ar: "حي الروضة، جدة، المملكة العربية السعودية",
      },
      imageUrl: "/dt3.jpg",
      showPrice: false,
    },
  ]
  
  