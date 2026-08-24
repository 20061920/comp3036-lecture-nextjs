import { posts } from "@repo/db/data";
import { Navigation } from "@/components/Navigation";
import { Search } from "@/components/SearchHeader";
import { getCategoryList } from "@/functions/categories";
import { getTagList } from "@/functions/tags";
import { getDateList } from "@/functions/history";

export default async function HistoryPosts({ params }: { params: { name: string } }) {

    //make dynamic route params with async. name is used as a dynamic paramater and is used for the url string and data passed
    const { name } = await params;

    //make an array of each post tags that are active and split them where there is a comma to make them independent
    const tagList = getTagList(posts);

     //make an array of each post that is active and map its category
    const categoryList = getCategoryList(posts);

    // route param expected as "YYYY-MM" (same key used in Navigation)
    const [yearStr, monthStr] = name.split("-");
    const year = Number(yearStr);
    const month = Number(monthStr);

    //filters the posts with active and if it matches with the year and the month of the paramaters id
    const filteredDates = posts.filter(
        (post) => post.active && new Date(post.date).getFullYear() === year && (new Date(post.date).getMonth() + 1) === month
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

                    <div className="blog-section-head">
                        <h2>From The Blog</h2>
                    </div>

                    <div className="blog-grid">
                        {filteredDates.map((post) => (

                            <article key={post.title} className="blog-card">
                                <div className="blog-card-image" aria-hidden="true">
                                    <img src={post.imageUrl} alt={post.title} />
                                </div>
                                <div className="blog-card-body">
                                    <h3>
                                        <a href={`/details/${post.urlId}`}>{post.title}</a>
                                    </h3>
                                    <p>{post.description}</p>

                                    <div className="blog-meta">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <span className="blog-card-tag">{post.category}</span>

                                            {post.tags && (
                                                <div className="blog-tags blog-tags--inline">
                                                    {post.tags.split(",").map((t) => (
                                                        <span key={t} className="blog-tag">{`#${t.trim()}`}</span>
                                                    ))}
                                                </div>
                                            )}

                                        </div>

                                        <div className="blog-meta-right">
                                            <span className="blog-date">{new Date(post.date).toLocaleDateString()}</span>
                                            <span className="blog-views">{post.views} views</span>

                                            <button className="Btn">
                                                <span className="leftContainer">
                                                    <svg fill="white" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path></svg>
                                                    <span className="like">Like</span>
                                                </span>
                                                <span className="likeCount">{post.likes.toLocaleString()}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
