/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
		extend: {
			colors: {
				// Replace previous colors with your custom palette
				background: '#F7FFF7', // Neutral Soft White for background
				foreground: '#1A535C', // Deep Teal-themed foreground
				card: {
					DEFAULT: '#FFFFFF', // White for cards to align with background
					foreground: '#1A535C', // Deep Teal for text on cards
				},
				primary: {
					DEFAULT: '#1A535C', // Deep Teal for primary actions
					foreground: '#FFFFFF', // White for text on primary elements
				},
				secondary: {
					DEFAULT: '#FF6B6B', // Coral Red for attention-grabbing UI
					foreground: '#FFFFFF', // White text for visibility
				},
				accent: {
					DEFAULT: '#FFE66D', // Bright Yellow for decorative uses
					foreground: '#1A535C', // Deep Teal for contrast
				},
				neutral: {
					DEFAULT: '#F7FFF7', // Soft White to maintain neutrality
					foreground: '#1A535C', // Deep Teal for text
				},
				highlight: {
					DEFAULT: '#4ECDC4', // Light Aqua for highlights
					foreground: '#FFFFFF', // White text for strong emphasis
				},
				success: {
					DEFAULT: '#28A745', // Green for success notifications
					foreground: '#FFFFFF',
				},
				error: {
					DEFAULT: '#D7263D', // Red for error
					foreground: '#FFFFFF',
				},
				muted: {
					DEFAULT: '#E2E8F0', // Light Gray for muted elements
					foreground: '#718096', // Grayish-Blue for muted text
				},
				border: '#CBD5E0', // Slight grayish-blue border
				input: '#EDF2F7', // Light input colors
				ring: '#4ECDC4', // Aqua for focused rings
			},

			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				xl: '1rem', // For cards/buttons
				full: '9999px', // Rounded pill shapes
			},

			fontFamily: {
				heading: ['Poppins', 'sans-serif'], // Heading font
				body: ['Roboto', 'sans-serif'], // Body font
				accent: ['Playfair Display', 'serif'], // Decorative font
			},

			boxShadow: {
				sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
				DEFAULT: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
				md: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
				lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
				xl: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
				'2xl': '0 25px 50px rgba(0, 0, 0, 0.25)',
			},

			spacing: {
				18: '4.5rem',
				22: '5.5rem',
				36: '9rem',
				72: '18rem',
			},

			aspectRatio: {
				'4/3': [4, 3],
				'16/9': [16, 9],
			},
		},
	},
	plugins: [
		require('tailwindcss-animate'), // For animations
		require('@tailwindcss/typography'), // For rich text content
		require('@tailwindcss/aspect-ratio'), // Useful for image grids or videos
	],
};