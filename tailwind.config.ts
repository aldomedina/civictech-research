import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cielo: '#AF99F1',
        lila: '#F5D8B7',
        lima: '#E1EF58',
        success: '#C1F093',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-ibm-mono)'],
      },
    },
  },
  plugins: [],
}
export default config
