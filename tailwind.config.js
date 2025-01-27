/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
    	extend: {
    		colors: {
    			background: 'hsl(var(--background))',
				strong: {
					DEFAULT: 'hsl(var(--strong-background))',
				},
				foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			neutral: {
    				DEFAULT: '#F7FFF7',
    				foreground: '#1A535C'
    			},
    			highlight: {
    				DEFAULT: '#4ECDC4',
    				foreground: '#FFFFFF'
    			},
    			success: {
    				DEFAULT: '#28A745',
    				foreground: '#FFFFFF'
    			},
    			error: {
    				DEFAULT: '#D7263D',
    				foreground: '#FFFFFF'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			},
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)',
    			xl: '1rem',
    			full: '9999px'
    		},
    		fontFamily: {
    			heading: [
    				'Poppins',
    				'sans-serif'
    			],
    			body: [
    				'Roboto',
    				'sans-serif'
    			],
    			accent: [
    				'Playfair Display',
    				'serif'
    			]
    		},
    		boxShadow: {
    			sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    			DEFAULT: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    			md: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
    			lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
    			xl: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
    			'2xl': '0 25px 50px rgba(0, 0, 0, 0.25)'
    		},
    		spacing: {
    			'18': '4.5rem',
    			'22': '5.5rem',
    			'36': '9rem',
    			'72': '18rem'
    		},
    		aspectRatio: {
    			'4/3': [
    				4,
    				3
    			],
    			'16/9': [
    				16,
    				9
    			]
    		}
    	}
    },
	plugins: [
		require('tailwindcss-animate'), // For animations
		require('@tailwindcss/typography'), // For rich text content
		require('@tailwindcss/aspect-ratio'), // Useful for image grids or videos
	],
};