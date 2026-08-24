import { posts } from "@repo/db/data";
import { toUrlPath } from "@repo/utils/url";
import { Navigation } from "@/components/Navigation";
import { Search} from "@/components/SearchHeader";
import { getCategoryList } from "@/functions/categories";
import { getTagList } from "@/functions/tags";

function scorePost(title: string, query: string): number {

  //scoring system based on how close the name after decoded is to the title and maps to be displayed
  const t = title.toLowerCase();
  const q = query.toLowerCase();

  if (t === q) return 3;
  if (t.startsWith(q)) return 2;
  if (t.includes(q)) return 1;
  return 0;
}

export default async function SearchResults({ params }: { params: { name: string } }) {

  const { name } = await params;

  //decodes the typed input in the search bar and reformats any spaces
  const decoded = decodeURIComponent(name);

  //based on score results map everything and show the top result
  const results = posts
    .filter((post) => post.active)
    .map((post) => ({ post, score: scorePost(post.title, decoded) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ post }) => post);

   //make an array of each post tags that are active and split them where there is a comma to make them independent
    const tagList = getTagList(posts);

    //make an array of each post that is active and map its category
    const categoryList = getCategoryList(posts);

  return (
    <main className="blog-page">
      <Search/>

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
            {results.length > 0 ? (
              results.map((post) => (
                <article key={post.id} className="blog-card">
                  <div className="blog-card-image" aria-hidden="true">
                    <img src={post.imageUrl} alt={post.title} />
                  </div>
                  <div className="blog-card-body">
                    <h3>
                      <a href={`/details/${toUrlPath(post.title).toLowerCase()}`}>
                        {post.title}
                      </a>
                    </h3>
                    <p>{post.description}</p>

                    <div className="blog-meta">
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
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
                        <span className="blog-date">
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                        <span className="blog-views">{post.views} views</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <p>0 posts found.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}