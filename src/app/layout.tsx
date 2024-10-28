import {cn} from '@/lib/utils';
import {Viewport} from 'next';
import './globals.css';
import {ThemeProvider} from '@/components/providers/theme-provider';
import { fontSans } from '@/lib/fonts';

export const viewport: Viewport = {
	themeColor: [
		{media: '(prefers-color-scheme: light)', color: 'white'},
		{media: '(prefers-color-scheme: dark)', color: 'black'},
	],
};

interface RootLayoutProps {
	children: React.ReactNode;
}

export default async function RootLayout({children}: RootLayoutProps) {
	

	return (
		<html lang='en' suppressHydrationWarning>
			<head />
			<body className={cn('min-h-screen bg-background font-sans antialiased overflow-auto', fontSans.className)}>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
					<div vaul-drawer-wrapper=''>
						<div className='relative flex min-h-screen flex-col bg-background'>
							{/* <SiteHeader /> */}
							<main className='flex-1'>{children}</main>
						</div>
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
