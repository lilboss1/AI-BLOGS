import React from 'react';
import { Post } from '../types.ts';
import BlogPost from './BlogPost.tsx';

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  if (posts.length === 0) {
    return (
        <div className="text-center py-16">
            <h2 className="text-2xl font-bold">No Posts Yet</h2>
            <p className="mt-2 text-base-content/70 dark:text-dark-content/70">Use the form above to generate your first blog post!</p>
        </div>
    );
  }

  return (
    <div className="grid gap-8 lg:gap-12 max-w-5xl mx-auto">
      {posts.map((post, index) => (
        <BlogPost key={post.id} post={post} isFeatured={index === 0} />
      ))}
    </div>
  );
};

export default PostList;