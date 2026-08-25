import { posts } from "@repo/db/data";
import { toUrlPath } from "@repo/utils/url";
import Image from 'next/image'
import { Press_Start_2P } from 'next/font/google';
import { notFound } from 'next/navigation';

const pressStart2P = Press_Start_2P({
    weight: '400',
    subsets: ['latin'],
});

export default async function Page({ params }: { params: { urlid: string } }) {

    let dogImageUrl = '';
    try {
        const req = await fetch("https://dog.ceo/api/breeds/image/random");
        const json = await req.json();
        dogImageUrl = json.message;
    } catch (error) {
        console.error('Failed to fetch dog image:', error);
    }

    const { urlid } = await params;


    const filteredpost = posts.find(post => post.urlId === urlid);

    if (!filteredpost) {
        notFound(); // Shows Next.js 404 page
    }

    const hasImage = filteredpost.imageUrl && filteredpost.imageUrl.trim() !== "";
    const imageToShow = hasImage ? filteredpost.imageUrl : dogImageUrl;

    return (

        <div>
            <h1>Post Selected: {params.urlid}  </h1>
            <hr />
            <ul>
                {filteredpost && (

                    <li key={filteredpost.id}>
                        <h2 className={pressStart2P.className}> Title: {filteredpost.title} </h2>
                        <div>Content: {filteredpost.content}</div>
                        <div>Image:
                            <Image src={imageToShow}
                                alt="image"
                                width={600}
                                height={600}
                            />
                        </div>
                        <hr />
                    </li>
                )}
            </ul>
        </div>
    );
}