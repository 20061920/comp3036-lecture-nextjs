"use client";

import { toUrlPath } from "@repo/utils/url";
import { history } from "@/functions/history";
import { posts } from "@repo/db/data";
import { useState} from "react"
import { useRouter } from "next/navigation";

export function Navigation({
    categoryList,
    tagList,
}: {
    categoryList: string[];
    tagList: string[];
}) {

    return (
        
        <div className="blog-body">
            <aside className="blog-sidebar">
                <nav aria-label="Primary navigation">
                    <ul className="blog-nav-list">
                        {categoryList.map((item) => (
                            <li key={item} className="blog-nav-item">

                                <a href={`/category/${toUrlPath(item)}`} className="blog-nav-button">
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <nav aria-label="Secondary navigation" className="blog-nav-secondary">
                    <ul className="blog-nav-list">
                        {history(posts).map(({ month, year }) => {
                            const monthName = new Date(year, month - 1).toLocaleString(undefined, { month: "long" });
                            const key = `${year}-${String(month).padStart(2, "0")}`;
                            return (
                                <li key={key} className="blog-nav-item">
                                    <a href={`/date/${toUrlPath(key)}`} className="blog-nav-button">
                                        <span className="history-date">{monthName}, {year}</span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <nav aria-label="Secondary navigation" className="blog-nav-secondary">
                    <ul className="blog-nav-list blog-nav-list--secondary">
                        {tagList.map((item) => (
                            <li key={`secondary-${item}`} className="blog-nav-item">
                                <a href={`/tag/${toUrlPath(item)}`} className="blog-nav-button">
                                    {`#${item.trim()}`}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </div>
    );
}