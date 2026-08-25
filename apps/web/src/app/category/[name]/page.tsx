import { posts } from "@repo/db/data";
import { toUrlPath } from "@repo/utils/url";
import Link from "next/link";
import Image from 'next/image'
import { Press_Start_2P } from 'next/font/google';

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
});

export default async function Page({ params }: { params: { name: string } }) {

  const { name } = await params;

  const postsInCategory = posts.filter(post => toUrlPath(post.category) === name && post.active);

  let dogImageUrl = '';
  try {
    const req = await fetch("https://dog.ceo/api/breeds/image/random");
    const json = await req.json();
    dogImageUrl = json.message;
  } catch (error) {
    console.error('Failed to fetch dog image:', error);
  }
  

  return (
    

    <div>
      <h1>Category Selected: {name}</h1>
      <hr />
      <ul>
        
        {postsInCategory.map((post) => {
          const hasImage = post.imageUrl && post.imageUrl.trim() !== "";
          const imageToShow = hasImage ? post.imageUrl : dogImageUrl;
          
          return (
            <li key={post.id}>
              <Link
                href={`/post/${toUrlPath(post.title)}`}
                className={pressStart2P.className}
              >
                Title: {post.title}
              </Link>
              <div>Description: {post.description}</div>
              <div style={{ color: '#16a34a' }}>
                Category: {post.category}
              </div>
              <div style={{ color: '#8416a3' }}>
                Tags: {post.tags}
              </div>
              <div style={{ color: '#ff0000' }}>
                Date: {post.date.toDateString()}
              </div>
              <div>
                Image:
                <Image 
                  src={imageToShow}
                  alt={post.title}
                  width={300}
                  height={300}
                />
              </div>
              <hr />
            </li>
          );
        })}
      </ul>
    </div>
  );
}