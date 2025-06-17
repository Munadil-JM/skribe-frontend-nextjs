import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

import AppProvider from "../components/UserAuth/AppProvider";
import ErrorContextNotification from "../components/ErrorAlert/ErrorContextNotification";

export const metadata = {
  title: {
    default: "Skribe | Real-Time Media Intelligence & PR Automation Platform",
  },
  description:
    "Monitor your brand, automate PR workflows, and get real-time journalist insights with Skribe. India's #1 AI-powered media intelligence platform.",
  alternates: {
    canonical: "https://app.goskribe.com",
  },
};

export const viewport = {
  themeColor: "black",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-L6REHKD7DC"
          strategy="afterInteractive"
        />

        <Script id="gtag-init" strategy="afterInteractive">
          {`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-L6REHKD7DC');
					`}
        </Script>

        <Script id="clarity" strategy="afterInteractive">
          {`
					(function(c,l,a,r,i,t,y){
						c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
						t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/mmzrfcsdvb";
						y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
					})(window, document, "clarity", "script");
				`}
        </Script> */}

        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
          rel="stylesheet"
        />
      </head>

      <body className={inter.className} suppressHydrationWarning>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root" style={{ height: "100%" }}>
          <AppProvider>
            <ErrorContextNotification>{children}</ErrorContextNotification>
          </AppProvider>
        </div>
        <div id="portal"></div>
      </body>
    </html>
  );
}
