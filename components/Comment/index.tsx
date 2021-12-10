import { useState } from 'react';
import he from 'he';
import classNames from 'classnames';
import Avatar from '@components/Avatar';
import { ICommentData, IComment } from 'types/comment';
import { kFormatter, timeSince } from '@utils/index';
import s from './style.module.css';

interface CommentProps extends ICommentData {
    isLast: boolean | undefined;
}

const Comment = (props: CommentProps) => {
    const [isOpen, setIsOpen] = useState(true);
    const [visited, setVisited] = useState(false);

    const toggleOpen = () => {
        setIsOpen((pre) => !pre);
        if (!visited) setVisited(true);
    };

    const { body_html, author, isLast, replies, ups, created } = props;
    if (!body_html) return null;
    
    // Special "view more" item... TODO
    const filteredReplies = replies?.data?.children.filter(
        ({ data: { body_html } }) => Boolean(body_html),
    );
    const hasReplies = filteredReplies && filteredReplies.length > 0;

    const authorElementString = `<h3>${author} </h3>`

    const decodedHtmlBody = he.decode(body_html);

    const withAuthor = decodedHtmlBody.replace('>', '>' + authorElementString)
    
    return (
        <li
            className={
                classNames('relative', {
                [s.thread]: isOpen && !isLast,
            })}
        >
            <div
                className={
                    classNames('flex mb-xl relative', {
                    [s.thread]: isOpen && (!isLast || hasReplies),
                    'filter grayscale': visited,
                })}
            >
                <button onClick={toggleOpen} className={s.threadbtn} />
                <Avatar type="user" name={author} />
                <div className="flex-1 overflow-hidden">
                    {!isOpen && <h3 className="text-default">{author}</h3>}
                    <div
                        dangerouslySetInnerHTML={{
                            __html: withAuthor,
                        }}
                        className={classNames( s.comment, { 'hidden': !isOpen })}
                    />
                    <p className="text-tiny text-subtle mt-sm">{timeSince(created)} • {kFormatter(ups)} upvotes</p>
                </div>
            </div>
            {hasReplies && (
                <ul className={classNames(s.reply, { 'hidden': !isOpen })}>
                    {filteredReplies.map((reply: IComment, i: number) => (
                        <Comment
                            {...reply.data}
                            isLast={i === filteredReplies.length - 1}
                            key={reply.data.id}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default Comment;
