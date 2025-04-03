/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: () => ({
        'sidebar-gradient':
          'linear-gradient(180deg, var(--d-sidebar-bg-color) 10%, var(--d-sidebar-bg-color-alt) 100%)',
      }),
    },
  },
  plugins: [],
};
