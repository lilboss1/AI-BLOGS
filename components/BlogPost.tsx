import React from 'react';
import { Post } from '../types.ts';

interface BlogPostProps {
  post: Post;
  isFeatured: boolean;
}

const BlogPost: React.FC<BlogPostProps> = ({ post, isFeatured }) => {
  return (
    <article className={`bg-base-100 dark:bg-dark-200 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 border border-base-300 dark:border-dark-300 ${isFeatured ? 'ring-2 ring-brand-primary dark:ring-sky-400' : ''}`}>
      <img
        src={post.imageUrl}
        alt={post.imagePrompt}
        className="w-full h-64 object-cover"
      />
      <div className="p-6 sm:p-8">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-base-content dark:text-dark-content">
          {post.title}
        </h3>
        <div className="prose prose-slate dark:prose-invert max-w-none text-base-content/90 dark:text-dark-content/90">
            {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 last:mb-0">{paragraph}</p>
            ))}
        </div>
        <div className="mt-6 pt-4 border-t border-base-300 dark:border-dark-300">
            <p className="text-xs text-base-content/60 dark:text-dark-content/60 italic">
                Image inspired by: "{post.imagePrompt}"
            </p>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;