
import { useState, useEffect } from "react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Load blog posts from localStorage on mount
    const storedPosts = localStorage.getItem('blogPosts');
    if (storedPosts) {
      setBlogPosts(JSON.parse(storedPosts));
    } else {
      // Add some sample blog posts
      const samplePosts: BlogPost[] = [
        {
          id: '1',
          title: 'Welcome to BlogForge',
          content: 'This is your first blog post! BlogForge is a modern blogging platform built with React and designed for both readers and writers. You can create, edit, and manage your blog posts with ease.',
          author: 'System',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Getting Started with Writing',
          content: 'Writing great blog posts is an art form. Start with a compelling title, create engaging content, and always keep your audience in mind. Remember to proofread your work before publishing!',
          author: 'System',
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      setBlogPosts(samplePosts);
      localStorage.setItem('blogPosts', JSON.stringify(samplePosts));
    }
  }, []);

  const createBlogPost = async (postData: Omit<BlogPost, 'id'>) => {
    // Mock API call - replace with actual API
    console.log('Creating blog post:', postData);
    
    const newPost: BlogPost = {
      ...postData,
      id: Date.now().toString()
    };
    
    const updatedPosts = [newPost, ...blogPosts];
    setBlogPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
  };

  const updateBlogPost = async (id: string, postData: Partial<BlogPost>) => {
    // Mock API call - replace with actual API
    console.log('Updating blog post:', id, postData);
    
    const updatedPosts = blogPosts.map(post => 
      post.id === id ? { ...post, ...postData } : post
    );
    setBlogPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
  };

  const deleteBlogPost = async (id: string) => {
    // Mock API call - replace with actual API
    console.log('Deleting blog post:', id);
    
    const updatedPosts = blogPosts.filter(post => post.id !== id);
    setBlogPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
  };

  return {
    blogPosts,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost
  };
};
