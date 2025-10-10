/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B35', // Bright orange from platform
          dark: '#E85D2C',
          darker: '#D14F23',
          light: '#FF8F66',
        },
        accent: {
          purple: '#6B7FE8', // Purple/indigo from platform headings
          green: '#10B981', // Success green
        },
        gray: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          500: '#64748b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'hero': ['3.052rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'section': ['2.441rem', { lineHeight: '1.2' }],
      },
      boxShadow: {
        'primary': '0 10px 30px rgba(255, 107, 53, 0.15)',
        'primary-lg': '0 20px 40px rgba(255, 107, 53, 0.2)',
      }
    },
  },
  plugins: [],
}
