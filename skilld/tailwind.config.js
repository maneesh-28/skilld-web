/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f65429' , // Use DEFAULT for the main color
          50: '#fdebd9',    // Lighter shades (optional)
          100: '#fbd7b9',   
          200: '#f9c399',
          300: '#f7ae79',
          400: '#f59a59',
          500: '#f38539',
          600: '#f17119',
          700: '#ef5c00',   // Darker shades (optional)
          800: '#ed4800',
          900: '#eb3300',
          950: '#e91f00',
        },
        neutral: {
          50: '#f9f9f9',   // Very light gray (optional)
          100: '#f0f0f0',
          200: '#e1e1e1',
          300: '#d2d2d2',
          400: '#c3c3c3',
          500: '#aaaaaa',  // Your provided light gray
          600: '#888888',
          700: '#666666',  // Your provided mid-gray
          800: '#444444',
          900: '#222222',
          950: '#111111',
          DEFAULT: '#ffffff', // White
          black: '#000000',  // Black (you can keep it this way)
        },
      },
      backgroundImage: {
        'image1': "url('/assets/img/bg1.jpg')",
        'image2': "url('/assets/img/bg2.jpg')",
      },
      fontFamily: {
        kagitingan: ['Kagitingan', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
