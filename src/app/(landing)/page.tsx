import Marquee from "react-fast-marquee";
import about from "../../../public/about.svg";
import Image from "next/image";
import { api } from "~/trpc/server";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import S3Image from "~/components/ui/image";
import { cn } from "~/lib/utils";

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

async function ProductsList() {
    const products = await api.product.getAll({});

    return (
        <div className="container space-y-6 py-12 lg:py-16">
            <div className="flex justify-between items-center">
                <h2 className="font-normal text-2xl lg:text-5xl">Десерты</h2>

                <Link href={"/products/dessert"} className="flex items-center gap-2">
                    <h1 className="text-base lg:text-xl">Смотреть все</h1>
                    <ChevronRight className="size-6 text-primary"/>
                </Link>
            </div>

            {products.map((product, index) => (
                <Link key={index} href={`/product/${product.id}`} className={cn("flex gap-16 items-center justify-between flex-col lg:flex-row", index % 2 != 0 && "lg:flex-row-reverse")}>
                    <S3Image
                        src={product.imageIds[0] ?? ""}
                        width={500}
                        height={500}
                        alt="Изображение"
                        className="size-64 lg:size-[500px] object-cover"
                    />

                    <div className="space-y-6">
                        <div className="pb-10 border-b border-b-primary space-y-2">
                            <h1 className="text-xl lg:text-5xl font-medium">0{index + 1}</h1>
                            <h2 className="text-2xl lg:text-[56px] font-normal">{product.name}</h2>
                        </div>

                        <p className="font-normal text-xl lg:text-2xl">{product.description}</p>

                        <h1 className="font-bold text-xl lg:text-5xl">{product.priceFor1}₽</h1>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default function LandingPage() {

    return (
        <div>
            <MainSection/>
            <Carousel/>
            <ProductsList/>
            <Carousel/>
            <AboutUsSection/>
        </div>
    )
}