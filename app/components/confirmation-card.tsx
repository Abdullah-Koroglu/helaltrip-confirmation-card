import { Instagram } from "lucide-react"
import Image from "next/image"

interface ConfirmationCardProps {
  customerName: string
  hotelName: string
  dateRange: string
  adults: number
  childrenCount: number
  roomType: string
  numberOfNights: number
  reservationNumber: string
  language: "tr" | "en"
  translations: {
    reservationReady: string
    dear: string
    hotelName: string
    date: string
    guestCount: string
    adults: string
    children: string
    roomType: string
    nights: string
    night: string
    reservationNumber: string
    goodHolidays: string
  }
}

export default function ConfirmationCard({
  customerName,
  hotelName,
  dateRange,
  adults,
  childrenCount,
  roomType,
  numberOfNights,
  reservationNumber,
  language,
  translations,
}: ConfirmationCardProps) {
  return (
    <div className="relative w-full mx-auto bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-3xl overflow-hidden shadow-2xl">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-white/20 rounded-full"></div>
        <div className="absolute top-32 right-16 w-8 h-8 bg-white/30 rounded-full"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-white/20 rounded-full"></div>

        {/* Decorative dots pattern */}
        <div className="absolute top-16 left-16">
          <div className="grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-white/40 rounded-full"></div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-16 right-32">
          <div className="grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-white/40 rounded-full"></div>
            ))}
          </div>
        </div>

        {/* Palm leaf decoration */}
        <div className="absolute top-40 left-8 w-16 h-32 opacity-30">
          <svg viewBox="0 0 100 200" className="w-full h-full fill-emerald-800">
            <path d="M50 10 Q30 50 20 100 Q30 150 50 190 Q70 150 80 100 Q70 50 50 10 Z" />
            <path d="M50 10 Q40 30 35 60 Q45 90 50 120 Q55 90 65 60 Q60 30 50 10 Z" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-emerald-700 rounded-full flex items-center justify-center">
              <img src="/logo.png" alt="HelalTrip" className="w-12 h-12 object-cover" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">HelalTrip</h1>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/90 text-sm">www.helaltrip.com</p>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Hotel image and name */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                {translations.reservationReady}
              </h2>
            </div>

            {/* Hotel image placeholder */}
            <div className="relative">
              <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 mb-4">
                <div className="aspect-video bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={`/hotels/${hotelName}.jpg`}
                    alt="Hotel view"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-emerald-900 text-center">{hotelName || "HOTEL NAME"}</h3>
              </div>

              {/* Small circular image */}
              {/* <div className="absolute -bottom-6 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full overflow-hidden border-4 border-white">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Hotel aerial view"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div> */}
            </div>
          </div>

          {/* Right side - Reservation details */}
          <div className="space-y-6 text-white mt-32 ml-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                {translations.dear} {customerName || "MÜŞTERİ ADI"};
              </h3>
            </div>

            <div className="space-y-3 text-lg">
              <div>
                <span className="font-semibold">{translations.hotelName}</span> {hotelName || "HOTEL NAME"}
              </div>

              <div>
                <span className="font-semibold">{translations.date}</span> {dateRange || "TARİH ARALIĞI"}
              </div>

              <div>
                <span className="font-semibold">{translations.guestCount}</span> {adults} {translations.adults}{" "}
                {childrenCount > 0 && `x ${childrenCount} ${translations.children}`}
              </div>

              <div>
                <span className="font-semibold">{translations.roomType}</span>{" "}
                {roomType || "ODA TİPİ"}
              </div>

              <div>
                <span className="font-semibold">{translations.nights}</span> {numberOfNights} {translations.night}
              </div>

              <div>
                <span className="font-semibold">{translations.reservationNumber}</span>{" "}
                <span className="text-xl font-mono">{reservationNumber || "REZERVASYON NO"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end mt-12">
          <div className="flex items-center space-x-3">
            <img src="/instagram.png" alt="Instagram" className="w-12 h-12" />
            <div>
              <p className="text-white font-semibold">/helaltrip</p>
              <p className="text-white text-lg">0533 818 99 58</p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-4xl text-emerald-800 mb-2">HelalTrip</div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-center"> 
              <span className="text-emerald-900 font-semibold">{translations.goodHolidays}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
