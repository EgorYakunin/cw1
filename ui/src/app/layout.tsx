import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/global.css";
import "../styles/colors.css";
import "../styles/type.css";
import "../styles/spacing.css";
import Navigation from "@/components/Navigation";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Brick UI",
    description: "Brick UI design system",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Navigation />
					{children}
				</ThemeProvider>
            </body>
        </html>
    );
}
