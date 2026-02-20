// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'oklab-purple': 'rgb(128, 0, 128)',
        'K':'#fff'
      },
       keyframes: {
        slideUp: {
          '0%': {
            transform: 'translateY(100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
      },
      animation: {
        slideUp: 'slideUp 0.4s ease-out forwards',
      },
    },
  },
}
