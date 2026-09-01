export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        night: {
          900: '#0A0A0F',
          800: '#12121A',
          700: '#1A1A24'
        },
        neon: {
          cian: '#00F0FF',
          magenta: '#FF00A8',
          purple: '#9D00FF',
          lime: '#CCFF00'
        }
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 240, 255, 0.4)',
        'neon-strong': '0 0 35px rgba(0, 240, 255, 0.6)',
        'neon-magenta': '0 0 20px rgba(255, 0, 168, 0.4)',
        'neon-purple': '0 0 25px rgba(157, 0, 255, 0.5)'
      },
      animation: {
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'blink': 'blink 1.5s ease-in-out infinite'
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 240, 255, 0.7)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' }
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 }
        }
      }
    }
  },
  plugins: []
};
