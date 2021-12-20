module.exports = {
    mode: 'jit',
    content: [
        "./src/**/*.{js,jsx}",
    ],
    theme: {
        borderWidth: {
            DEFAULT: '1px',
            '0': '0',
            '2': '2px',
            '3': '3px',
            '4': '4px',
            '6': '6px',
            '8': '8px',
        },
        extend: {
            colors: {
                'bootstrapSuccess': '#28A745',
                'bootstrapDanger': '#DC3545',
                'bootstrapSecondary': '#F3B600',
            }
        },
    },
    plugins: [],
}
