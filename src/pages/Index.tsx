
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Edit, Trash2, User, LogOut } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import BlogForm from "@/components/BlogForm";
import BlogCard from "@/components/BlogCard";
import { useAuth } from "@/hooks/useAuth";
import { useBlogPosts } from "@/hooks/useBlogPosts";

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const { user, logout } = useAuth();
  const { blogPosts, deleteBlogPost } = useBlogPosts();

  const isAdmin = user?.role === 'admin';

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setShowBlogForm(true);
  };

  const handleDeleteBlog = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      await deleteBlogPost(blogId);
    }
  };

  const handleCloseBlogForm = () => {
    setShowBlogForm(false);
    setEditingBlog(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-gray-900">BlogForge</h1>
              <Badge variant="secondary">Beta</Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">{user.name}</span>
                    {isAdmin && <Badge variant="default">Admin</Badge>}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button onClick={() => setShowAuthModal(true)}>
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!user ? (
          // Landing page for non-authenticated users
          <div className="text-center py-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to BlogForge
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover amazing stories, insights, and knowledge from our community of writers.
              Sign in to start reading and contributing to our blog.
            </p>
            <Button size="lg" onClick={() => setShowAuthModal(true)}>
              Get Started
            </Button>
          </div>
        ) : (
          // Main content for authenticated users
          <div>
            {/* Admin Dashboard */}
            {isAdmin && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PlusCircle className="h-5 w-5" />
                    Admin Dashboard
                  </CardTitle>
                  <CardDescription>
                    Manage your blog posts and content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setShowBlogForm(true)}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create New Post
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Blog Posts */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Latest Blog Posts
              </h2>
              
              {blogPosts.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-gray-500">No blog posts available yet.</p>
                    {isAdmin && (
                      <Button 
                        className="mt-4" 
                        onClick={() => setShowBlogForm(true)}
                      >
                        Create the first post
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {blogPosts.map((blog) => (
                    <BlogCard
                      key={blog.id}
                      blog={blog}
                      isAdmin={isAdmin}
                      onEdit={() => handleEditBlog(blog)}
                      onDelete={() => handleDeleteBlog(blog.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
      
      <BlogForm
        isOpen={showBlogForm}
        onClose={handleCloseBlogForm}
        editingBlog={editingBlog}
      />
    </div>
  );
};

export default Index;
