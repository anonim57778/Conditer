import Image from "next/image";
import dessert from "../../../../public/dessert.svg"; 

export default function ContactsPage() {

    const contacts = [
        {
            name: "Номер",
            value: "+7 (999) 000-00-00"
        },
        {
            name: "Адрес",
            value: "Цветной бульвар, 15с1, Москва, 127051"
        },
        {
            name: "Почта",
            value: "biteofblissmoscow@yandex.ru"
        }
    ]

    return (
        <div className="container py-12 lg:py-32">
            <div className="lg:h-[512px] flex flex-col gap-6 justify-center items-center lg:flex-row lg:gap-12">
                <Image src={dessert} alt="dessert" width={512} height={512}/>

                <div className="h-full flex flex-col gap-y-6 lg:justify-between">
                    <div className="flex flex-col gap-y-2">
                        <h2 className="text-2xl font-normal lg:font-medium lg:text-5xl">Контакты</h2>

                        <p className="text-base font-normal lg:text-2xl">Bite of Bliss — уютное и милое место, где царит тепло. Свет мягкий, интерьер в пастельных тонах, пахнет свежей выпечкой. Столики с цветами, подушки на стульях, акварельные рисунки на стенах и книги на полках создают домашнюю атмосферу. За окном — жизнь, внутри — покой, музыка и ваши любимые пирожные.</p>
                    </div>

                    <div className="flex flex-col gap-y-2">
                        {contacts.map((item, index) => (
                            <div key={index} className="flex flex-col gap-y-1 justify-between lg:flex-row lg:gap-y-0">
                                <h1 className="text-base font-medium lg:text-2xl">{item.name}</h1>

                                <p className="text-base font-normal lg:text-2xl">{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}