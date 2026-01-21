import { useParams } from 'react-router-dom';

import NoImage from '../../assets/Image-not-found.png';
import { CommentsSection } from '../../components/comments/commentsSection/CommentsSection.tsx';
import { LikeDislike } from '../../components/likeDislike/LikeDislike.tsx';
import { Loader } from '../../components/loader/Loader.tsx';
import { Typography } from '../../components/ui/typography/Typography.tsx';
import { formatDate } from '../../helpers/dataHelper.ts';
import { useGetPostQuery } from '../../hooks/postsHooks/useGetPostQuery.tsx';
import { useAuth } from '../../hooks/useAuthContext.tsx';
import styles from './postPage.module.scss';

export const PostPage = () => {
    const { id } = useParams<{ id: string }>();
    const { isAuth, user } = useAuth();
    if (!id) {
        return <div>Wrong post id</div>;
    }
    const { data: post, isLoading } = useGetPostQuery(id);

    if (isLoading) {
        return <Loader />;
    }

    if (!post) {
        return <div>No post</div>;
    }
    return (
        <div className={styles.postPage}>
            <div className="container">
                <div className={styles.postPageInner}>
                    <div className={styles.imageWrapper}>
                        <img src={post.imageUrl || NoImage} alt={post.title} />
                    </div>
                    <div className={styles.pageHeader}>
                        <div className={styles.info}>
                            <Typography variant="h1" className={styles.title}>
                                {post.title}
                            </Typography>
                            <Typography variant="h2">{post.shortDescription}</Typography>
                            <Typography variant="body1">
                                Created: {formatDate(post.createdAt)}
                            </Typography>
                            <Typography variant="body1">Author: {post.userName}</Typography>
                        </div>
                        <div className={styles.likes}>
                            <LikeDislike
                                isAuth={isAuth}
                                postId={post.id}
                                extendedLikesInfo={post.extendedLikesInfo}
                            />
                        </div>
                    </div>
                    <hr className={styles.line} />
                    <div className={styles.contentWrapper}>
                        <div className={styles.content}>
                            <Typography variant="body1">{post.content}</Typography>
                        </div>
                    </div>
                    <hr className={styles.line} />
                    <CommentsSection
                        isAuth={isAuth}
                        postId={post.id}
                        currentUserId={user?.userId}
                    />
                </div>
            </div>
        </div>
    );
};
