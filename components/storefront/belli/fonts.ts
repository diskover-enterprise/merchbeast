import { Anton, Space_Mono } from 'next/font/google'

// Stand-ins until Belli's licensed fonts are added: Anton for Aro (display), Space Mono for Disket Mono.
// The CSS asks for 'Aro' and 'Disket Mono' first, so dropping in their @font-face rules takes over automatically.
export const belliDisplay = Anton({ subsets: ['latin'], weight: '400', variable: '--bl-font-display' })
export const belliMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--bl-font-mono' })

export const belliFontVars = `${belliDisplay.variable} ${belliMono.variable}`
