import Link from "next/link"
import Image from "next/image"

interface FooterProps {
  userType?: string
}

export default function Footer({ userType = "user" }: FooterProps) {
  return (
    <footer className="bg-white pt-12 pb-20 border-t">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Title Row - No bottom border */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">
          Discover your dream home with NestHub
        </h2>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Logo */}
          <div className="md:col-span-3 flex justify-start">
            <Image src="/logogreen.png" alt="NestHub Logo" width={180} height={70} className="object-contain" />
          </div>

          {/* Middle Column: Contact Info */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            <p className="text-sm text-gray-900">
              <span className="font-bold text-black">Customer support:</span> support@nesthub.com
            </p>
            <p className="text-sm text-gray-900">
              <span className="font-bold text-black">Email:</span> community@nesthub.com
            </p>
            <p className="text-sm text-gray-900">
              <span className="font-bold text-black">Contact number:</span> 0976654321
            </p>
            <p className="text-sm text-gray-900 leading-relaxed md:whitespace-nowrap">
              <span className="font-bold text-black">Location:</span> Royal University of Phnom Penh, Russian Federation Blvd (110)
            </p>
          </div>

          {/* Right Column: Social & Navigation */}
          <div className="md:col-span-4 flex flex-col items-center md:items-end w-full">
            {/* Social Icons Centered above Navigation */}
            <div className="flex space-x-6 mb-6 justify-center md:justify-center w-full">
              {/* Facebook */}
              <a href="#" className="flex items-center justify-center w-[42px] h-[42px] rounded-full bg-[#1877F2] text-white hover:bg-[#166FE5] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="flex items-center justify-center w-[42px] h-[42px] rounded-full border-[2.5px] border-[#D81B60] text-[#D81B60] hover:bg-pink-50 transition-colors">
                <svg className="w-[22px] h-[22px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              {/* Telegram */}
              <a href="#" className="flex items-center justify-center w-[42px] h-[42px] rounded-full bg-[#2AABEE] text-white hover:bg-[#2298D4] transition-colors">
                <svg className="w-6 h-6 -ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
                </svg>
              </a>
              {/* X / Twitter */}
              <a href="#" className="flex items-center justify-center w-[42px] h-[42px] rounded-full bg-black text-white hover:bg-gray-800 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* TikTok */}
              <a href="#" className="flex items-center justify-center w-[42px] h-[42px] rounded-full bg-black text-white hover:bg-gray-800 transition-colors">
                <svg className="w-[26px] h-[26px]" viewBox="-80 -80 608 672" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Cyan shadow */}
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" fill="#24f6f0" transform="translate(-30, -30)" />
                  {/* Magenta shadow */}
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" fill="#fe2c55" transform="translate(30, 30)" />
                  {/* White main */}
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" fill="#ffffff" />
                </svg>
              </a>
            </div>

            {/* Navigation Links evenly spaced below the line */}
            <div className="border-t border-gray-200 pt-5 w-full">
              <div className="flex justify-between px-2">
                <Link href={`/${userType}`} className="text-sm md:text-base text-gray-800 hover:text-green-800 tracking-wide">
                  HOME
                </Link>
                <Link href={`/${userType}/rent`} className="text-sm md:text-base text-gray-800 hover:text-green-800 tracking-wide">
                  RENT
                </Link>
                <Link href={`/${userType}/about`} className="text-sm md:text-base text-gray-800 hover:text-green-800 tracking-wide">
                  ABOUT US
                </Link>
                <Link href={`/${userType}/faq`} className="text-sm md:text-base text-gray-800 hover:text-green-800 tracking-wide">
                  FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}


