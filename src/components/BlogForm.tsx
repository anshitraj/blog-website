
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface BlogFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingBlog?: any;
}

const BlogForm = ({ isOpen, onClose, editingBlog }: BlogFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    content: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { createBlogPost, updateBlogPost } = useBlogPosts();
  const { user } = useAuth();

  useEffect(() => {
    if (editingBlog) {
      setFormData({
        title: editingBlog.title,
        content: editingBlog.content
      });
    } else {
      setFormData({ title: "", content: "" });
    }
  }, [editingBlog]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingBlog) {
        await updateBlogPost(editingBlog.id, {
          ...formData,
          author: user?.name || "Anonymous"
        });
        toast.success("Blog post updated successfully!");
      } else {
        await createBlogPost({
          ...formData,
          author: user?.name || "Anonymous",
          createdAt: new Date().toISOString()
        });
        toast.success("Blog post created successfully!");
      }
      onClose();
    } catch (error) {
      toast.error("Failed to save blog post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter blog post title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Write your blog post content here..."
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              className="min-h-[300px]"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : (editingBlog ? "Update" : "Create")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BlogForm;
