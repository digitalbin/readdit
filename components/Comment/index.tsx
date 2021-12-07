import { useState, useMemo, useCallback } from 'react';
import he from 'he';
import classNames from 'classnames';
import { ICommentData, IComment } from 'types/comment';
import s from './style.module.css';

interface CommentProps extends ICommentData {
    endThread: boolean | undefined;
}

const hexString = '0123456789abcdef';
const randomColor = () => {
    let hexCode = '#';
    for (let i = 0; i < 6; i++) {
        hexCode += hexString[Math.floor(Math.random() * hexString.length)];
    }
    return hexCode;
};

const generateGrad = () => {
    const colorOne = randomColor();
    const colorTwo = randomColor();
    const angle = Math.floor(Math.random() * 360);
    return `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
};

const Comment = (props: CommentProps) => {
    const [isOpen, setIsOpen] = useState(true);
    const [visited, setVisited] = useState(false);

    const toggleOpen = () => {
        setIsOpen((pre) => !pre);
        if (!visited) setVisited(true);
    };

    const avatarGradient = useMemo(generateGrad, []);

    const { body_html, author, endThread } = props;
    if (!body_html) return null;
    // Special "view more" item... TODO
    const replies = props?.replies?.data?.children.filter(
        ({ data: { body_html } }) => Boolean(body_html),
    );
    const hasReplies = replies && replies.length > 0;

    return (
        <li>
            <div
                className={classNames('flex mb-8 relative', {
                    [s.thread]: endThread && hasReplies && isOpen,
                })}
            >
                <button onClick={toggleOpen} className={s.threadbtn} />
                <div
                    className="w-8 h-8 rounded-full mr-2"
                    style={{
                        background: avatarGradient,
                        filter: visited ? 'grayscale(1)' : undefined,
                    }}
                />
                <div className="border-2 rounded-tr rounded-b p-4 flex-1 overflow-hidden">
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
                        className={classNames({'hidden': !isOpen })}
                    />
                </div>
            </div>
            {hasReplies && (
                <ul className={classNames(s.reply, { 'hidden': !isOpen })}>
                    {replies.map((reply: IComment, i: number) => (
                        <Comment
                            {...reply.data}
                            endThread={i === replies.length - 1}
                            key={reply.data.id}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default Comment;
