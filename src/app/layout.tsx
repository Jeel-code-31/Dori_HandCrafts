import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WishlistDrawer from '@/components/WishlistDrawer';

export const metadata: Metadata = {
  title: 'Zizziq — Premium Handcrafted Living & Artisan Decor',
  description: 'Luxury handmade macrame swings, wall tapestries, bamboo lighting, and woven decor crafted by women artisan collectives.',
  keywords: 'handmade, macrame swing, wall hanging, artisan decor, japanese wabi sabi, luxury indian craft',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#FDF9F5] text-[#2C2420] selection:bg-[#EDE4DC] selection:text-[#2C2420]">
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <Header />
                <main className="min-h-screen">{children}</main>
                <Footer />
                <WishlistDrawer />
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
