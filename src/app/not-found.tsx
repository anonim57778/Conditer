import Link from "next/link";
import { Button } from "~/components/ui/button";


export default function NotFound() {

    return (
        <div className="h-screen flex flex-col items-center justify-center gap-y-5">
            <h2 className="font-medium text-9xl">404</h2>
            <Link href={"/"}>
                <Button>
                    На главную
                </Button>
            </Link>
        </div>
    )
}