import Marquee from "react-fast-marquee";
import about from "../../../public/about.svg";
import Image from "next/image";

function MainSection() {

    return (
        <div className="container lg:h-screen flex py-12 flex-col justify-center items-center gap-y-1">
            <h1 className="text-xs font-medium lg:text-xl">НОВОЕ</h1>
            <h2 className="text-lg font-normal lg:text-[32px]">“Клубничный поцелуй”</h2>
            <p className="text-xs font-medium lg:max-w-[760px] text-center lg:text-xl">Это воплощение лёгкости и свежести в каждом кусочке. Нежный ванильный бисквит, словно утреннее облако, обнимает воздушный сливочный крем, в котором спрятались сочные кусочки спелой клубники. Сверху десерт покрыт тонким слоем клубничного желе, переливающегося, как первые лучи солнца, и украшен свежими ягодами, добавляющими яркий акцент. Завершает композицию изящная шапочка взбитых сливок, мягкая и тающая во рту. Этот торт — идеальный выбор для тех, кто хочет начать день с чего-то прекрасного или подарить себе момент наслаждения в любое время.</p>
            <h2 className="text-5xl lg:text-9xl font-normal">Bite of Bliss</h2>
        </div>
    )
}

function Carousel() {

    return (
        <Marquee autoFill className="py-4 bg-primary lg:py-5">
            <h2 className="px-9 text-background text-xl font-normal lg:text-base">Bite of Bliss</h2>
        </Marquee>
    )
}

function AboutUsSection() {

    return (
        <div className="container py-12 lg:py-32 flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-center lg:gap-12">
            <Image src={about} alt="about" width={600} height={440}/>

            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-normal lg:text-5xl">О нас</h2>

                <p className="text-xl font-normal lg:text-2xl">Bite of Bliss — это маленькая сладкая история, которая началась с мечты дарить людям моменты чистого счастья через вкус. Мы создаём пирожные, которые не просто радуют вкусовые рецепторы, но и пробуждают эмоции: нежность утреннего рассвета, тепло уютного вечера, радость встречи с близкими. Каждое наше пирожное — это сочетание воздушных бисквитов, лёгких кремов и свежих ягод, которые мы выбираем с особой заботой. Мы верим, что десерт — это не просто еда, а способ сказать «я тебя люблю» или «ты важен для меня».</p>
            </div>
        </div>
    )
}

export default function LandingPage() {

    return (
        <div>
            <MainSection/>
            <Carousel/>
            <AboutUsSection/>
        </div>
    )
}