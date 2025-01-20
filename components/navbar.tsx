// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import { cn } from "@/lib/utils"

// export default function Navbar() {
//   const [activeSection, setActiveSection] = useState("home")
//   const [isScrolled, setIsScrolled] = useState(false)

//   const sections = [
//     { id: "home", label: "Home" },
//     { id: "journey", label: "Journey" },
//     { id: "work", label: "Work" },
//     { id: "videos", label: "Videos" },
//     { id: "family", label: "Family" },
//     { id: "contact", label: "Contact" },
//   ]

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50)

//       const sectionElements = sections.map(section => ({
//         id: section.id,
//         element: document.getElementById(section.id)
//       }))

//       const currentSection = sectionElements.find(({ element }) => {
//         if (!element) return false
//         const rect = element.getBoundingClientRect()
//         return rect.top <= 100 && rect.bottom >= 100
//       })

//       if (currentSection) {
//         setActiveSection(currentSection.id)
//       }
//     }

//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   const scrollToSection = (sectionId: string) => {
//     const element = document.getElementById(sectionId)
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" })
//     }
//   }

//   return (
//     <motion.header
//       className={cn(
//         "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
//         isScrolled 
//           ? "bg-white/90 backdrop-blur-md shadow-lg" 
//           : "bg-gradient-to-b from-black/50 to-transparent"
//       )}
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <nav className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-20">
//           <motion.span 
//             className="text-2xl font-bold bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent drop-shadow-lg"
//             whileHover={{ scale: 1.05 }}
//           >
//             Devendra Tamhane
//           </motion.span>
          
//           <ul className="hidden md:flex items-center gap-2">
//             {sections.map((section) => (
//               <motion.li key={section.id}>
//                 <button
//                   onClick={() => scrollToSection(section.id)}
//                   className={cn(
//                     "px-5 py-2.5 rounded-full text-[15px] font-semibold transition-all relative hover:text-white",
//                     activeSection === section.id
//                       ? "text-white"
//                       : isScrolled ? "text-gray-800" : "text-white/90"
//                   )}
//                 >
//                   {activeSection === section.id && (
//                     <motion.span
//                       className={cn(
//                         "absolute inset-0 rounded-full z-0",
//                         isScrolled 
//                           ? "bg-primary/90" 
//                           : "bg-white/20 backdrop-blur-sm"
//                       )}
//                       layoutId="activeSection"
//                       transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
//                     />
//                   )}
//                   <span className="relative z-10 drop-shadow-md">
//                     {section.label}
//                   </span>
//                 </button>
//               </motion.li>
//             ))}
//           </ul>

//           {/* Mobile menu button */}
//           <button 
//             className={cn(
//               "md:hidden p-2 rounded-lg transition-colors",
//               isScrolled 
//                 ? "text-gray-800 hover:bg-gray-100" 
//                 : "text-white hover:bg-white/10"
//             )}
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           </button>
//         </div>
//       </nav>
//     </motion.header>
//   )
// }

// "use client"

// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { cn } from "@/lib/utils"
// import { Menu } from 'lucide-react'

// export default function Navbar() {
//   const [activeSection, setActiveSection] = useState("home")
//   const [isScrolled, setIsScrolled] = useState(false)
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

//   const sections = [
//     { id: "home", label: "Home" },
//     { id: "journey", label: "Journey" },
//     { id: "work", label: "Work" },
//     { id: "videos", label: "Videos" },
//     { id: "family", label: "Family" },
//     { id: "contact", label: "Contact" },
//   ]

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50)

//       const sectionElements = sections.map(section => ({
//         id: section.id,
//         element: document.getElementById(section.id)
//       }))

//       const currentSection = sectionElements.find(({ element }) => {
//         if (!element) return false
//         const rect = element.getBoundingClientRect()
//         return rect.top <= 100 && rect.bottom >= 100
//       })

//       if (currentSection) {
//         setActiveSection(currentSection.id)
//       }
//     }

//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   const scrollToSection = (sectionId: string) => {
//     const element = document.getElementById(sectionId)
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" })
//       setIsMobileMenuOpen(false)
//     }
//   }

//   return (
//     <motion.header
//       className={cn(
//         "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
//         isScrolled 
//           ? "bg-white/90 backdrop-blur-md shadow-lg" 
//           : "bg-gradient-to-b from-black/50 to-transparent"
//       )}
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ type: "spring", stiffness: 100, damping: 20 }}
//     >
//       <nav className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-20">
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <motion.span 
//               className={cn(
//                 "text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent cursor-pointer",
//                 isScrolled 
//                   ? "from-primary via-purple-600 to-pink-500" 
//                   : "from-white via-white/90 to-white/80"
//               )}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Devendra Tamhane
//             </motion.span>
//           </motion.div>
          
//           <ul className="hidden md:flex items-center gap-2">
//             {sections.map((section, index) => (
//               <motion.li 
//                 key={section.id}
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <button
//                   onClick={() => scrollToSection(section.id)}
//                   className={cn(
//                     "px-5 py-2.5 rounded-full text-[15px] font-semibold transition-all relative hover:text-white group",
//                     activeSection === section.id
//                       ? "text-white"
//                       : isScrolled ? "text-gray-800" : "text-white/90"
//                   )}
//                 >
//                   {activeSection === section.id && (
//                     <motion.span
//                       className={cn(
//                         "absolute inset-0 rounded-full z-0",
//                         isScrolled 
//                           ? "bg-gradient-to-r from-primary via-purple-600 to-pink-500" 
//                           : "bg-white/20 backdrop-blur-sm"
//                       )}
//                       layoutId="activeSection"
//                       transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
//                     />
//                   )}
//                   <span className="relative z-10 drop-shadow-md">
//                     {section.label}
//                   </span>
//                   <span className={cn(
//                     "absolute inset-x-0 bottom-0 h-0.5 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
//                     isScrolled ? "bg-primary" : "bg-white"
//                   )} />
//                 </button>
//               </motion.li>
//             ))}
//           </ul>

//           {/* Mobile menu button */}
//           <motion.button 
//             className={cn(
//               "md:hidden p-2 rounded-lg transition-colors",
//               isScrolled 
//                 ? "text-gray-800 hover:bg-gray-100" 
//                 : "text-white hover:bg-white/10"
//             )}
//             whileTap={{ scale: 0.9 }}
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           >
//             <Menu className="w-6 h-6" />
//           </motion.button>
//         </div>

//         {/* Mobile menu */}
//         <AnimatePresence>
//           {isMobileMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className={cn(
//                 "md:hidden overflow-hidden",
//                 isScrolled ? "bg-white" : "bg-black/50 backdrop-blur-md"
//               )}
//             >
//               <div className="px-4 py-5 space-y-3">
//                 {sections.map((section, index) => (
//                   <motion.button
//                     key={section.id}
//                     className={cn(
//                       "block w-full text-left px-4 py-3 rounded-lg transition-colors",
//                       activeSection === section.id
//                         ? isScrolled 
//                           ? "bg-primary/10 text-primary"
//                           : "bg-white/20 text-white"
//                         : isScrolled
//                           ? "text-gray-600 hover:bg-gray-100"
//                           : "text-white/90 hover:bg-white/10"
//                     )}
//                     onClick={() => scrollToSection(section.id)}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                   >
//                     {section.label}
//                   </motion.button>
//                 ))}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </nav>
//     </motion.header>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Menu } from 'lucide-react'

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const sections = [
    { id: "home", label: "Home" },
    { id: "journey", label: "Journey" },
    { id: "work", label: "Work" },
    { id: "videos", label: "Videos" },
    { id: "family", label: "Family" },
    { id: "contact", label: "Contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      }))

      const currentSection = sectionElements.find(({ element }) => {
        if (!element) return false
        const rect = element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })

      if (currentSection) {
        setActiveSection(currentSection.id)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled 
          ? "bg-white/20 backdrop-blur-sm shadow-lg" 
          : "bg-gradient-to-b from-black/50 to-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span 
              className={cn(
                "text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent cursor-pointer",
                isScrolled 
                  ? "from-primary via-purple-600 to-pink-500" 
                  : "from-white via-white/90 to-white/80"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Devendra Tamhane
            </motion.span>
          </motion.div>
          
          <ul className="hidden md:flex items-center gap-2">
            {sections.map((section, index) => (
              <motion.li 
                key={section.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-[15px] font-semibold transition-all relative hover:text-white group",
                    activeSection === section.id
                      ? "text-white"
                      : isScrolled ? "text-gray-800" : "text-white/90"
                  )}
                >
                  {activeSection === section.id && (
                    <motion.span
                      className={cn(
                        "absolute inset-0 rounded-full z-0",
                        isScrolled 
                          ? "bg-gradient-to-r from-primary via-purple-600 to-pink-500" 
                          : "bg-white/20 backdrop-blur-sm"
                      )}
                      layoutId="activeSection"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 drop-shadow-md">
                    {section.label}
                  </span>
                  <span className={cn(
                    "absolute inset-x-0 bottom-0 h-0.5 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                    isScrolled ? "bg-primary" : "bg-white"
                  )} />
                </button>
              </motion.li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <motion.button 
            className={cn(
              "md:hidden p-2 rounded-lg transition-colors",
              isScrolled 
                ? "text-gray-800 hover:bg-gray-100" 
                : "text-white hover:bg-white/10"
            )}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "md:hidden overflow-hidden",
                isScrolled ? "bg-white/20" : "bg-black/50 backdrop-blur-md"
              )}
            >
              <div className="px-4 py-5 space-y-3">
                {sections.map((section, index) => (
                  <motion.button
                    key={section.id}
                    className={cn(
                      "block w-full text-left px-4 py-3 rounded-lg transition-colors",
                      activeSection === section.id
                        ? isScrolled 
                          ? "bg-primary/10 text-primary"
                          : "bg-white/20 text-white"
                        : isScrolled
                          ? "text-gray-600 hover:bg-gray-100"
                          : "text-white/90 hover:bg-white/10"
                    )}
                    onClick={() => scrollToSection(section.id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {section.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}

