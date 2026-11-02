import { Cormorant_Garamond } from 'next/font/google'

// Heritage serif for headlines; UI type is Inter (loaded globally as --font-inter)
export const lfSerif = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600'], style: ['normal', 'italic'], variable: '--lf-font-serif' })

export const littleFlowerFontVars = lfSerif.variable
