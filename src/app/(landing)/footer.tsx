import Link from "next/link"


export default function Footer() {
    
    const menu = [
        {
            name: "Десерты",
            url: "/products/dessert"
        },
        {
            name: "Подарочные наборы",
            url: "/products/gift"
        },
        {
            name: "Контакты",
            url: "/contacts"
        }
    ]

    return (
        <footer className="bg-primary py-4 lg:py-12">
            <div className="container text-background flex flex-col gap-y-6">
                <div className="flex flex-col-reverse gap-y-6 lg:flex-row lg:justify-between lg:items-start">
                    <p className="text-xl font-normal lg:max-w-[577px] lg:text-2xl text-background">Наша миссия — напоминать, что даже в самый обычный день можно найти место для маленького чуда. Мы хотим, чтобы каждый кусочек Bite of Bliss вдохновлял вас замедлиться, насладиться моментом и почувствовать себя особенным. Ведь жизнь состоит из таких мгновений — сладких, нежных и незабываемых.</p>

                    <div className="flex flex-row justify-between lg:flex-col gap-y-2">
                        {menu.map((item, index) => (
                            <Link key={index} href={item.url}>
                                <h1 className="text-base hover:underline decoration-background font-medium text-background lg:text-2xl">{item.name}</h1>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col-reverse gap-y-4 justify-center items-center lg:flex-row lg:justify-between lg:items-end lg:gap-y-0">
                    <p className="text-base font-normal text-background">2025 Все права защищены</p>

                    <Link href={"/"}>
                        <h2 className="text-5xl lg:text-[128px] text-background">Bite of Bliss</h2>
                    </Link>
                </div>
            </div>
        </footer>
    )
}