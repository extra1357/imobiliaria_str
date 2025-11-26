import './globals.css'

export const metadata = {
  title: "Digital Imóveis",
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
