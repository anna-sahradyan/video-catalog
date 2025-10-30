/** @type {import('tailwindcss').Config} */

export default {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            fontFamily: {
                readex: ['Readex Pro', 'sans-serif']
            },
            colors: {
                'header-text': '#FFBB00'
            },
            textShadow: {
                header: '7px 7px 0px rgba(255, 0, 0, 0.6), 15px 15px 0px rgba(0, 0, 255, 0.6)'
            }
        }
    },
    plugins: []
};
