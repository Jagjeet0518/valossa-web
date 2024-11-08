import { Github } from "lucide-react";
import Link from "next/link";

const Navbar = () => {

    return (
        <nav className="w-full flex items-center justify-between py-4 px-8">
            {/* <img src="" alt="" /> */}
            <h2 className="gradient-text text-3xl font-bold">
                Valossa
            </h2>
            <Link href={"https://github.com/Jagjeet0518/valossa-web"} target="_blank">
                <div className="size-10 rounded-full border-white border-2 flex items-center justify-center group hover:border-primary">
                    <Github className="text-white text-lg group-hover:text-accent-yellow"/>
                </div>
            </Link>
        </nav>
    )
}

export default Navbar;