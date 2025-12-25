/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      // Add custom colors if needed (optional)
      colors: {
        primary: {
          500: '#3b82f6', // blue-500
          600: '#2563eb', // blue-600
        },
        secondary: {
          500: '#10b981', // green-500
          600: '#059669', // green-600
        },
      },

      // Custom spacing / sizing (optional)
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },

      // Custom border radius (optional)
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },

      // Custom shadows (optional)
      boxShadow: {
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },

  darkMode: 'class', // Use .dark class on <html> for dark mode

  plugins: [
    // Add any plugins here (e.g. forms, typography)
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
};
