/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                brand: {
                    // Primary blues (from login)
                    dark: '#050535',          // Very dark blue
                    'dark-alt': '#1D1160',    // Dark purple-blue
                    blue: '#10069F',          // Primary blue
                    'blue-light': '#1812CF',  // Lighter blue

                    // Blue + Yellow blend (30% yellow max)
                    'blue-yellow': '#4B3FBF', // Blue with subtle yellow
                    yellow: '#FFB800',         // Accent yellow (30% use)

                    // Lime fluor (for inactive icons)
                    lime: '#CFF214',          // Lime fluor
                    'lime-soft': '#E5F76E',   // Softer lime

                    // Cyan accent (from original)
                    cyan: '#00C6CC',
                    'cyan-light': '#00E5CC',

                    // Neutrals
                    bg: '#f5f7fa',
                    'bg-dark': '#0A0A2E',
                },
                // Keep critical alert colors only
                alert: {
                    error: '#EF4444',    // Red for critical errors only
                    success: '#CFF214',  // Use lime instead of green
                }
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.3s ease-out',
                'pulse-glow': 'pulseGlow 2s infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(0, 198, 204, 0.4)' },
                    '50%': { boxShadow: '0 0 40px rgba(0, 198, 204, 0.8)' },
                }
            }
        },
    },
    plugins: [],
}
