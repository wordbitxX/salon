import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyActions from "@/components/StickyActions";
import JsonLd from "@/components/JsonLd";
import { orgSchema, websiteSchema } from "@/lib/seo";
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={[orgSchema(), websiteSchema()]} />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <StickyActions />
    </>
  );
}
