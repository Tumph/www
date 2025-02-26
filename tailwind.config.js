/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        black: '#000000',
        white: '#FFFFFF',
        blue: {
          400: '#3498db',
          500: '#2980b9',
        },
        gray: {
          300: '#d1d5db',
          400: '#9ca3af',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'neon': '0 0 5px theme("colors.blue.400"), 0 0 20px theme("colors.blue.500")',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.white'),
            h1: {
              color: theme('colors.white'),
              fontSize: '2.5rem',
              fontWeight: '700',
              marginTop: '2rem',
              marginBottom: '1.5rem',
            },
            h2: {
              color: theme('colors.white'),
              fontSize: '1.25rem',
              fontWeight: '600',
              marginTop: '2rem',
              marginBottom: '1rem',
              letterSpacing: '-0.01em',
            },
            h3: {
              color: theme('colors.white'),
              fontSize: '1.125rem',
              fontWeight: '600',
              marginTop: '1.75rem',
              marginBottom: '0.75rem',
            },
            h4: {
              color: theme('colors.white'),
              fontSize: '1rem',
              fontWeight: '600',
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
            },
            p: {
              color: theme('colors.gray.300'),
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
              textIndent: '1.5rem',
              lineHeight: '1.8',
            },
            a: {
              color: theme('colors.blue.400'),
              '&:hover': {
                color: theme('colors.blue.500'),
                textDecoration: 'underline',
              },
            },
            strong: {
              color: theme('colors.white'),
              fontWeight: '600',
            },
            ul: {
              listStyleType: 'disc',
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
              paddingLeft: '1.625rem',
            },
            ol: {
              listStyleType: 'decimal',
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
              paddingLeft: '1.625rem',
            },
            li: {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
              color: theme('colors.gray.300'),
            },
            blockquote: {
              fontStyle: 'italic',
              color: theme('colors.gray.300'),
              borderLeftColor: theme('colors.blue.400'),
              borderLeftWidth: '4px',
              paddingLeft: '1.5rem',
              marginLeft: '0',
              marginRight: '0',
            },
            code: {
              color: theme('colors.blue.400'),
              backgroundColor: theme('colors.gray.900'),
              padding: '0.25rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            pre: {
              backgroundColor: theme('colors.gray.900'),
              color: theme('colors.gray.300'),
              padding: '1rem',
              borderRadius: '0.5rem',
              overflowX: 'auto',
            },
            hr: {
              borderColor: theme('colors.gray.700'),
              marginTop: '2rem',
              marginBottom: '2rem',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 