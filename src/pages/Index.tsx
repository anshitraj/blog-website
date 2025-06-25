
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Edit, Trash2, User, LogOut, BookOpen, Sparkles } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  BlogForge
                </h1>
              </div>
              <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200">
                <Sparkles className="h-3 w-3 mr-1" />
                Beta
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">{user.name}</span>
                      {isAdmin && (
                        <Badge variant="default" className="text-xs bg-gradient-to-r from-emerald-500 to-teal-500 border-0">
                          Admin
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    className="bg-white/60 backdrop-blur-sm border-white/20 hover:bg-white/80"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={() => setShowAuthModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
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
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <BookOpen className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Welcome to{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    BlogForge
                  </span>
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Discover amazing stories, insights, and knowledge from our community of writers.
                  Join us to start reading, writing, and sharing your thoughts with the world.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Read Stories</h3>
                  <p className="text-gray-600">Explore diverse content from talented writers worldwide</p>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Edit className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Write & Share</h3>
                  <p className="text-gray-600">Create and publish your own blog posts easily</p>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect</h3>
                  <p className="text-gray-600">Join a community of passionate readers and writers</p>
                </div>
              </div>
              
              <Button 
                size="lg" 
                onClick={() => setShowAuthModal(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105"
              >
                Get Started
              </Button>
            </div>
          </div>
        ) : (
          // Main content for authenticated users
          <div className="space-y-8">
            {/* Admin Dashboard */}
            {isAdmin && (
              <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-3 text-emerald-800">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                      <PlusCircle className="h-4 w-4 text-white" />
                    </div>
                    Admin Dashboard
                  </CardTitle>
                  <CardDescription className="text-emerald-700">
                    Manage your blog posts and create amazing content
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <Button 
                    onClick={() => setShowBlogForm(true)}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create New Post
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Blog Posts */}
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <h2 className="text-4xl font-bold text-gray-900">
                  Latest Blog Posts
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent"></div>
              </div>
              
              {blogPosts.length === 0 ? (
                <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg">
                  <CardContent className="py-16 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-gray-300 to-gray-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-gray-500 text-lg mb-4">No blog posts available yet.</p>
                    {isAdmin && (
                      <Button 
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                        onClick={() => setShowBlogForm(true)}
                      >
                        Create the first post
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {blogPosts.map((blog) => (
                    <div key={blog.id} className="transform hover:scale-105 transition-all duration-300">
                      <BlogCard
                        blog={blog}
                        isAdmin={isAdmin}
                        onEdit={() => handleEditBlog(blog)}
                        onDelete={() => handleDeleteBlog(blog.id)}
                      />
                    </div>
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
