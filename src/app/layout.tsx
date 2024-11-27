import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { checkIsAuthenticated } from '@/lib/auth/checkIsAuthenticated';
import Login from '@/components/Login';
import Logout from '@/components/Logout';

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Verse Vote",
    description: "The Jefferson Bible of the internet",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const isAuthenticated = await checkIsAuthenticated();
    console.log('isAuthenticated:', isAuthenticated);

    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased flex-col mr-auto ml-auto p-12 max-w-[1280px] min-w-[545px]`}
            >
                <div className="border-b-2 border-slate-400 mb-8">
                    <header className="flex justify-between items-center">
                        <h1 className="text-4xl font-bold">Verse Vote</h1>
                        <nav>
                            <ul className="flex gap-4">
                                <li>
                                    {isAuthenticated ? (
                                        <Logout />
                                    ) : (
                                        <Login />
                                    )}
                                    <Link href="/authenticate">Authenticate</Link>
                                </li>
                            </ul>
                        </nav>
                    </header>
                </div>
                {children}
            </body>
        </html >
    );
}
