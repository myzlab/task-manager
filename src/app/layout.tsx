import type { Metadata } from "next";
import { PrimeReactProvider } from 'primereact/api';

import 'primereact/resources/themes/fluent-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import "./globals.scss";
import ReduxProvider from "./store/redux-provider";

export const metadata: Metadata = {
  title: "Task Manager",
  description: "-",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet"/>
      </head>
      <body>
        <ReduxProvider>
          <PrimeReactProvider>
            {children}
          </PrimeReactProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
