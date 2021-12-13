import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
    const router = useRouter();
    
    const { subreddit } = router?.query;
    const headerTitle = subreddit ? `r/${subreddit}` : 'Popular';

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

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        router.push(`/search.json?q=${query}`)
    }

    return (
        <header className={s.header}>
            <h2>{headerTitle}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Search subreddit..."
                    className={s.search}
                    value={query}
                    onChange={handleInput}
                />
                {Boolean(results.length) && (
                    <ul className={s.resultList}>
                        {results.map(({ data }) => {
                            const {
                                display_name_prefixed,
                                displayname,
                                subscribers,
                                url,
                                icon_img = '',
                                community_icon = '',
                                id,
                            } = data;
                            if (!url) return null;
                            
                            const [iconUrl] = (icon_img || community_icon).split('?');
                            
                            return (
                                <li key={id} className={s.listItem}>
                                    <Link href={url}>
                                        <a className="flex">
                                            {iconUrl ? (
                                                <img
                                                    className="mr-sm w-lg h-lg rounded-full overflow-hidden flex-none"
                                                    alt={`Icon for ${display_name_prefixed}`}
                                                    src={iconUrl}
                                                />
                                            ) : <span className="mr-sm w-lg h-lg bg-subtle rounded-full flex-none" />}
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
            </form>
        </header>
    );
};

export default FeedHeader;
