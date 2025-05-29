import Image from "next/image";
import about from "../../../public/about.svg";

export default function AboutUsSection() {

    return (
        <div className="container py-12 lg:py-32 flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-center lg:gap-12">
            <Image src={about as string} alt="about" width={600} height={440}/>

            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-normal lg:text-5xl">О нас</h2>

                <p className="text-xl font-normal lg:text-2xl">Bite of Bliss — это маленькая сладкая история, которая началась с мечты дарить людям моменты чистого счастья через вкус. Мы создаём пирожные, которые не просто радуют вкусовые рецепторы, но и пробуждают эмоции: нежность утреннего рассвета, тепло уютного вечера, радость встречи с близкими. Каждое наше пирожное — это сочетание воздушных бисквитов, лёгких кремов и свежих ягод, которые мы выбираем с особой заботой. Мы верим, что десерт — это не просто еда, а способ сказать «я тебя люблю» или «ты важен для меня».</p>
            </div>
        </div>
    )
}