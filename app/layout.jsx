import Head from 'next/head'
import Script from 'next/script'

import { Inter } from 'next/font/google'

import 'prismjs/themes/prism-okaidia.css'
import '@style/site.css'

// import Ads from '@/ads'
import Footer from '@component/Footer'
import Header from '@component/Header'
import HeaderBanner from '@component/HeaderBanner'

export const metadata = {
  title: 'Uniswap Hooks Open Directory',
  description: 'Uniswap Hooks examples that can be used in your next project.',
  openGraph: {
    title: 'Open Source Uniswap v4 Hooks | Uniswap Hooks Open Directory',
    description:
      'Uniswap Hooks examples that can be used in your next project.',
    url: 'https://www.uniswaphooks.com/',
    siteName: 'UniswapHooks',
    type: 'website',
    images: ['https://www.uniswaphooks.com/og.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open Source Uniswap v4 Hooks | Uniswap Hooks Open Directory',
    description:
      'Uniswap Hooks examples that can be used in your next project.',
  },
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function RootLayout({ children }) {
  return (
    <html className="h-full scroll-smooth" lang="en" dir="ltr">
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_KEY}`}
      />

      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.GA_KEY}');
        `}
      </Script>

      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>

      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <HeaderBanner />

        <main className="bg-white">{children}</main>

        <Footer />

      </body>
    </html>
  )
}
