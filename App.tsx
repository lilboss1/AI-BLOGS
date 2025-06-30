import React, { useState, useCallback, useEffect } from 'react';
import { Post } from './types.ts';
import { generateBlogPost } from './services/geminiService.ts';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import NewPostForm from './components/NewPostForm.tsx';
import PostList from './components/PostList.tsx';
import LoadingSpinner from './components/LoadingSpinner.tsx';
import ErrorMessage from './components/ErrorMessage.tsx';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const createPostFromTopic = useCallback(async (topic: string, addToStart: boolean = true) => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedPost = await generateBlogPost(topic);
      const newPost: Post = {
        id: new Date().toISOString(),
        ...generatedPost,
        imageUrl: `https://picsum.photos/seed/${encodeURIComponent(generatedPost.title)}/1200/600`,
      };

      setPosts(prevPosts => 
        addToStart ? [newPost, ...prevPosts] : [...prevPosts, newPost]
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    // Generate an initial post on first load to showcase functionality
    const fetchInitialPost = async () => {
        if(posts.length === 0) {
            await createPostFromTopic("The Future of Web Development", false);
        }
    };
    
    fetchInitialPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-base-200 dark:bg-dark-100 text-base-content dark:text-dark-content">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section id="generate" className="mb-12">
            <div className="max-w-3xl mx-auto bg-base-100 dark:bg-dark-200 p-6 sm:p-8 rounded-2xl shadow-lg border border-base-300 dark:border-dark-300">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">Weave a New Story</h2>
                <p className="text-center text-base-content/70 dark:text-dark-content/70 mb-6">What topic sparks your curiosity today?</p>
                <NewPostForm onGeneratePost={createPostFromTopic} isLoading={isLoading} />
            </div>
        </section>

        {error && <ErrorMessage message={error} />}
        
        <section id="posts">
            {isLoading && posts.length === 0 ? (
                <div className="text-center py-16">
                    <LoadingSpinner />
                    <p className="mt-4 text-lg">Weaving your first masterpiece...</p>
                </div>
            ) : (
                <PostList posts={posts} />
            )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;