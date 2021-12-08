import { useState, useEffect, ChangeEvent } from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import useDebounce from '@hooks/useDebounce';
import s from './style.module.css';
import { kFormatter } from '@utils/index';

const doSearch = (query: string) => {
    const url = new URL(
        'https://www.reddit.com/api/subreddit_autocomplete_v2.json',
    );
    url.searchParams.append('query', query);
    return fetch(url.toString()).then((res) => res.json());
};

const FeedHeader = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        setQuery(value);
    };

    const debouncedQuery = useDebounce<string>(query, 1000);

    useEffect(() => {
        if (!debouncedQuery) return;
        doSearch(debouncedQuery).then(({ data: { children } }) =>
            setResults(children),
        );
    }, [debouncedQuery]);

    return (
        <div className={s.header}>
            <h2>Popular posts</h2>
            <form>
                <input
                    placeholder="Search subreddit..."
                    className={s.search}
                    value={query}
                    onChange={handleInput}
                />
            </form>
            {Boolean(results.length) && (
                <ul className={s.resultList}>
                    {results.map(({ data }) => {
                        const {
                            display_name_prefixed,
                            displayname,
                            subscribers,
                            url,
                            icon_img,
                            id,
                        } = data;
                        if (!url) return null;
                        return (
                            <li key={id} className={s.listItem}>
                                <Link href={url}>
                                    <a className="flex">
                                        <img
                                            className="mr-sm w-lg h-lg bg-subtle rounded-full overflow-hidden flex-none"
                                            src={icon_img}
                                        />
                                        <div>
                                            <h3 className="text-default">
                                                {display_name_prefixed}
                                            </h3>
                                            <p className="text-tiny text-subtle font-regular">
                                                {kFormatter(subscribers)} members
                                            </p>
                                        </div>
                                    </a>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default FeedHeader;