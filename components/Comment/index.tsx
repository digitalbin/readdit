import { useState } from 'react';
import he from 'he';
import classNames from 'classnames';
import Avatar from '@components/Avatar';
import { ICommentData, IComment } from 'types/comment';
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

    const { body_html, author, isLast } = props;
    if (!body_html) return null;
    // Special "view more" item... TODO
    const replies = props?.replies?.data?.children.filter(
        ({ data: { body_html } }) => Boolean(body_html),
    );
    const hasReplies = replies && replies.length > 0;

    return (
        <li
            className={
                classNames('relative', {
                [s.thread]: isOpen && !isLast,
            })}
        >
            <div
                className={
                    classNames('flex mb-lg relative', {
                    [s.thread]: isOpen && (!isLast || hasReplies),
                    'filter grayscale': visited,
                })}
            >
                <button onClick={toggleOpen} className={s.threadbtn} />
                <Avatar type="user" name={author} />
                <div className="bg-subtle rounded-tr rounded-b p-sm flex-1 overflow-hidden">
                    <div
                        className={classNames('text-tiny font-bold', {
                            'text-subtle': visited,
                        })}
                    >
                        {author}
                    </div>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: he.decode(body_html),
                        }}
                        className={classNames({ 'hidden': !isOpen })}
                    />
                </div>
            </div>
            {hasReplies && (
                <ul className={classNames(s.reply, { 'hidden': !isOpen })}>
                    {replies.map((reply: IComment, i: number) => (
                        <Comment
                            {...reply.data}
                            isLast={i === replies.length - 1}
                            key={reply.data.id}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default Comment;
