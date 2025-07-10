"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Users, Bed, Calendar, Hash, Globe } from "lucide-react"
import ConfirmationCard from "./components/confirmation-card"
import html2canvas from "html2canvas-pro"

interface ReservationData {
  customerName: string
  hotelName: string
  checkInDate: string
  checkOutDate: string
  adults: number
  children: number
  roomType: string
  numberOfNights: number
  reservationNumber: string
}

const hotels = [
  "Wome Deluxe",
  "Angel's Marmaris",
  "Adenya",
  "Sah Inn",
  "The Oba",
  "Adin Beach",
  "Bera",
  "Rizom Beach",
  "Selge",
  "Royal Teos",
  "Rizom Tatil Köyü",
]

const languages = {
  tr: {
    reservationReady: "Rezervasyonunuz hazır.",
    dear: "Sayın",
    hotelName: "Otel Adı:",
    date: "Tarih:",
    guestCount: "Kişi Sayısı:",
    adults: "Yetişkin",
    children: "Çocuk",
    roomType: "Oda Tipi:",
    nights: "Gece Sayısı:",
    night: "Gece",
    reservationNumber: "Rezervasyon Numarası:",
    goodHolidays: "İyi Tatiller",
  },
  en: {
    reservationReady: "Your reservation is ready.",
    dear: "Dear",
    hotelName: "Hotel Name:",
    date: "Date:",
    guestCount: "Guest Count:",
    adults: "Adult",
    children: "Child",
    roomType: "Room Type:",
    nights: "Number of Nights:",
    night: "Night",
    reservationNumber: "Reservation Number:",
    goodHolidays: "Good Holidays",
  },
}

export default function HotelConfirmationGenerator() {
  const [reservationData, setReservationData] = useState<ReservationData>({
    customerName: "",
    hotelName: "",
    checkInDate: "",
    checkOutDate: "",
    adults: 1,
    children: 0,
    roomType: "",
    numberOfNights: 1,
    reservationNumber: "",
  })

  const [showConfirmation, setShowConfirmation] = useState(false)
  const [language, setLanguage] = useState<"tr" | "en">("tr")
  const confirmationCardRef = useRef<HTMLDivElement>(null)

  const handleInputChange = (field: keyof ReservationData, value: string | number) => {
    setReservationData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const calculateNights = (checkIn: string, checkOut: string) => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn)
      const end = new Date(checkOut)
      const diffTime = Math.abs(end.getTime() - start.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    }
    return 1
  }

  const handleDateChange = (field: "checkInDate" | "checkOutDate", value: string) => {
    const updatedData = { ...reservationData, [field]: value }

    if (field === "checkInDate" || field === "checkOutDate") {
      const nights = calculateNights(
        field === "checkInDate" ? value : reservationData.checkInDate,
        field === "checkOutDate" ? value : reservationData.checkOutDate,
      )
      updatedData.numberOfNights = nights
    }

    setReservationData(updatedData)
  }

  const generateConfirmation = () => {
    setShowConfirmation(true)
  }

  const formatDateRange = (checkIn: string, checkOut: string) => {
    if (!checkIn || !checkOut) return ""

    const startDate = new Date(checkIn)
    const endDate = new Date(checkOut)

    const months = {
      tr: [
        "OCAK",
        "ŞUBAT",
        "MART",
        "NİSAN",
        "MAYIS",
        "HAZİRAN",
        "TEMMUZ",
        "AĞUSTOS",
        "EYLÜL",
        "EKİM",
        "KASIM",
        "ARALIK",
      ], 
      en: [
        "JANUARY",
        "FEBRUARY",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMBER",
      ]
    }

    const startDay = startDate.getDate()
    const endDay = endDate.getDate()
    const startMonth = startDate.getMonth()
    const endMonth = endDate.getMonth()
    const month = months[language][startMonth]
    const year = startDate.getFullYear()

    if (startMonth === endMonth) {
      return `${startDay}-${endDay} ${month} ${year}`
    } else {
      return `${startDay} ${month} - ${endDay} ${months[language][endMonth]} ${year}`
    }
  }

  const downloadScreenshot = async () => {
    if (confirmationCardRef.current) {
      try {
        const canvas = await html2canvas(confirmationCardRef.current, {
          backgroundColor: null,
          scale: 2,
          useCORS: true,
          allowTaint: true,
        })

        const link = document.createElement("a")
        link.download = `rezervasyon-${reservationData.reservationNumber || "confirmation"}.png`
        link.href = canvas.toDataURL()
        link.click()
      } catch (error) {
        console.error("Screenshot error:", error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-9xl">
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Form Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">Rezervasyon Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="customerName" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Müşteri Adı
                  </Label>
                  <Input
                    id="customerName"
                    placeholder="Müşteri adını giriniz"
                    value={reservationData.customerName}
                    onChange={(e) => handleInputChange("customerName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hotelName">Otel Adı</Label>
                  <Select onValueChange={(value) => handleInputChange("hotelName", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Otel seçiniz" />
                    </SelectTrigger>
                    <SelectContent>
                      {hotels.map((hotel) => (
                        <SelectItem key={hotel} value={hotel}>
                          {hotel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="checkIn" className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      Giriş Tarihi
                    </Label>
                    <Input
                      id="checkIn"
                      type="date"
                      value={reservationData.checkInDate}
                      onChange={(e) => handleDateChange("checkInDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkOut" className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      Çıkış Tarihi
                    </Label>
                    <Input
                      id="checkOut"
                      type="date"
                      value={reservationData.checkOutDate}
                      onChange={(e) => handleDateChange("checkOutDate", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="adults">Yetişkin Sayısı</Label>
                    <Input
                      id="adults"
                      type="number"
                      min="1"
                      value={reservationData.adults}
                      onChange={(e) => handleInputChange("adults", Number.parseInt(e.target.value) || 1)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="children">Çocuk Sayısı</Label>
                    <Input
                      id="children"
                      type="number"
                      min="0"
                      value={reservationData.children}
                      onChange={(e) => handleInputChange("children", Number.parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="roomType" className="flex items-center gap-2">
                    <Bed className="w-4 h-4" />
                    Oda Tipi
                  </Label>
                  <Input
                    id="roomType"
                    placeholder="Oda tipini giriniz"
                    value={reservationData.roomType}
                    onChange={(e) => handleInputChange("roomType", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nights" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Gece Sayısı
                  </Label>
                  <Input
                    id="nights"
                    type="number"
                    min="1"
                    value={reservationData.numberOfNights}
                    onChange={(e) => handleInputChange("numberOfNights", Number.parseInt(e.target.value) || 1)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reservationNumber" className="flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    Rezervasyon Numarası
                  </Label>
                  <Input
                    id="reservationNumber"
                    placeholder="Rezervasyon numarasını giriniz"
                    value={reservationData.reservationNumber}
                    onChange={(e) => handleInputChange("reservationNumber", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Kart Dili
                  </Label>
                  <Select value={language} onValueChange={(value: "tr" | "en") => setLanguage(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tr">Türkçe</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={generateConfirmation} className="w-full bg-emerald-500 hover:bg-emerald-600" size="lg">
                  Onay Kartı Oluştur
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Confirmation Card Section */}
          <div>
            {showConfirmation && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">Rezervasyon Onay Kartı</h2>
                  <Button
                    onClick={downloadScreenshot}
                    variant="outline"
                    className="flex items-center gap-2 bg-transparent"
                  >
                    📸 Bu alanın ekran görüntüsünü alabilirsiniz
                  </Button>
                </div>
                <div className="" ref={confirmationCardRef}>
                  <ConfirmationCard
                    customerName={reservationData.customerName}
                    hotelName={reservationData.hotelName}
                    dateRange={formatDateRange(reservationData.checkInDate, reservationData.checkOutDate)}
                    adults={reservationData.adults}
                    childrenCount={reservationData.children}
                    roomType={reservationData.roomType}
                    numberOfNights={reservationData.numberOfNights}
                    reservationNumber={reservationData.reservationNumber}
                    language={language}
                    translations={languages[language]}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
