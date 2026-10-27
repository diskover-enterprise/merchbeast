import { Covered_By_Your_Grace, Reenie_Beanie } from 'next/font/google'

// Main chalk hand: loose marker-style capitals, legible at product-name sizes
export const chalkHand = Covered_By_Your_Grace({ subsets: ['latin'], weight: '400', variable: '--mg-font-chalk' })

// Second, thinner hand for small notes so not every line looks like the same writer
export const noteHand = Reenie_Beanie({ subsets: ['latin'], weight: '400', variable: '--mg-font-note' })

export const magariFontVars = `${chalkHand.variable} ${noteHand.variable}`
