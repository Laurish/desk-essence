import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/lib/cart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import OrderSuccess from "./pages/OrderSuccess";
import NotFound from "./pages/NotFound";
import Villkor from "./pages/Villkor";
import Integritetspolicy from "./pages/Integritetspolicy";
import Retur from "./pages/Retur";
import Leverans from "./pages/Leverans";
import Cookies from "./pages/Cookies";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/villkor" element={<Villkor />} />
            <Route path="/integritetspolicy" element={<Integritetspolicy />} />
            <Route path="/retur" element={<Retur />} />
            <Route path="/leverans" element={<Leverans />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
