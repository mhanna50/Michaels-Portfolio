/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        phone: { min: "425px", max: "767px" },
        tablet: { min: "768px", max: "1199px" },
        desktop: "1200px",
      },
      fontFamily: {
        accent: ['"Bebas Neue"', 'sans-serif'],
        body: ['Lato', 'sans-serif'],
        heading: ['Italiana', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
        sans: ['Helvetica', 'Arial', 'sans-serif'],
        source: ['"Source Sans Pro"', 'sans-serif'],
        serifalt: ['"Cormorant Garamond"', 'serif'],
      },
      colors: {
        primary: {
          DEFAULT: "#436850", // Deep Olive
          light: "#5E8A6D",
          dark: "#2C4739",
        },
        secondary: {
          DEFAULT: "#B99470", // Warm Stone
          light: "#CBA785",
          dark: "#9C7B57",
        },
        accent: {
          DEFAULT: "#EADBC8", // Soft Clay Beige
          light: "#F5EDE1",
          dark: "#D1BDA1",
        },
        neutral: {
          DEFAULT: "#2C2C2C", // Text / Background contrast
          light: "#F8F8F6", // Backgrounds
        },
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.4' }],   // 12px
        sm: ['0.875rem', { lineHeight: '1.6' }],  // 14px
        base: ['1rem', { lineHeight: '1.6' }],    // 16px
        md: ['1.125rem', { lineHeight: '1.6' }],  // 18px
        lg: ['1.25rem', { lineHeight: '1.6' }],   // 20px
        xl: ['1.375rem', { lineHeight: '1.6' }],  // 22px
        '2xl': ['1.5rem', { lineHeight: '1.6' }], // 24px
        '3xl': ['1.75rem', { lineHeight: '1.2' }],// 28px
        '4xl': ['2rem', { lineHeight: '1.2' }],   // 32px
        '5xl': ['2.5rem', { lineHeight: '1.2' }], // 40px
        '6xl': ['3rem', { lineHeight: '1.1' }],   // 48px
        '7xl': ['3.5rem', { lineHeight: '1.1' }], // 56px
        '8xl': ['4rem', { lineHeight: '1.1' }],   // 64px
        '9xl': ['5rem', { lineHeight: '1.1' }],   // 80px
        '10xl': ['6rem', { lineHeight: '1.1' }],  // 96px
        '105xl': ['6.5rem', { lineHeight: '1.1' }],  // 96px
        '11xl': ['7rem', { lineHeight: '1.05' }], // 112px
        '12xl': ['8rem', { lineHeight: '1.05' }], // 128px
        '13xl': ['9rem', { lineHeight: '1.05' }], // 144px
        '14xl': ['10rem', { lineHeight: '1.05' }],// 160px
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 280ms ease-out forwards',
      },
    },
  },
  plugins: [],
}
