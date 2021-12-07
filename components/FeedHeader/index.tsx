import s from './style.module.css';

const FeedHeader = () => {
    return (
        <div className={s.header}>
            <h2>Popular posts</h2>
            <input placeholder="Search..." className={s.search} />
        </div>
      )
}

export default FeedHeader;
