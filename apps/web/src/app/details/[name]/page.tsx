import { posts } from "@repo/db/data";
import { toUrlPath } from "@repo/utils/url";
import { Navigation } from "@/components/Navigation";
import { history } from "@/functions/history";
import ReactMarkdown from "react-markdown";
import { Search } from "@/components/SearchHeader";
import { getCategoryList } from "@/functions/categories";
import { getTagList } from "@/functions/tags";

export default async function DetailsPost({ params }: { params: { name: string } }) {

    const { name } = await params;

    //make an array of each post tags that are active and split them where there is a comma to make them independent
    const tagList = getTagList(posts);

    //make an array of each post that is active and map its category
    const categoryList = getCategoryList(posts);

    //searches to return the one with the same title 
    const selectedPost = posts.find(
        (post) => post.active && toUrlPath(post.title).toLowerCase() === name,
    );

    return (
        <main className="blog-page">
            <Search />

            <div className="blog-body">
                <Navigation
                    categoryList={categoryList}
                    tagList={tagList}
                />

                <section className="blog-content">


                    {selectedPost ? (
                        <article className="post-detail">
                            <div className="post-detail-image">
                                <img src={selectedPost.imageUrl} alt={selectedPost.title} />
                            </div>

                            <div className="post-detail-body">
                                <span className="blog-card-tag">{selectedPost.category}</span>
                                <h1>{selectedPost.title}</h1>
                                <ReactMarkdown>{selectedPost.content}</ReactMarkdown>

                                <div className="post-detail-meta">
                                    <span className="blog-date">
                                        {new Date(selectedPost.date).toLocaleDateString()}
                                    </span>
                                    <span className="blog-views">{selectedPost.views} views</span>

                                    {selectedPost.tags && (
                                        <div className="blog-tags blog-tags--inline">
                                            {selectedPost.tags.split(",").map((t) => (
                                                <span key={t} className="blog-tag">{`#${t.trim()}`}</span>
                                            ))}
                                            <button className="Btn">
                                                <span className="leftContainer">
                                                    <svg fill="white" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path></svg>
                                                    <span className="like">Like</span>
                                                </span>
                                                <span className="likeCount">{selectedPost.likes.toLocaleString()}</span>
                                            </button>
                                        </div>



                                    )}
                                </div>
                            </div>
                        </article>
                    ) : (
                        <p>Post not found.</p>
                    )}
                </section>
            </div>
        </main>
    );
}
