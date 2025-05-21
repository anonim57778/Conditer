import Footer from "./footer";
import Navbar from "./navbar";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar/>
            <main>{children}</main>
            <Footer/>
        </div>
    )
}