
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Calendar, User, Clock } from "lucide-react";
import { format } from "date-fns";

interface BlogCardProps {
  blog: {
    id: string;
    title: string;
    content: string;
    author: string;
    createdAt: string;
  };
  isAdmin: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const BlogCard = ({ blog, isAdmin, onEdit, onDelete }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return "Unknown date";
    }
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  return (
    <Card className="h-full flex flex-col bg-white/70 backdrop-blur-sm border-white/30 shadow-lg hover:shadow-2xl transition-all duration-300 hover:bg-white/80 group overflow-hidden">
      {/* Decorative gradient top border */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      
      <CardHeader className="flex-shrink-0 relative">
        <div className="flex justify-between items-start mb-3">
          <CardTitle className="text-xl leading-tight text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
            {blog.title}
          </CardTitle>
          {isAdmin && (
            <div className="flex space-x-2 ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={onEdit}
                className="bg-white/60 backdrop-blur-sm border-white/30 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600"
              >
                <Edit className="h-3 w-3" />
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={onDelete}
                className="bg-white/60 backdrop-blur-sm border-white/30 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-3 py-1">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                <User className="h-3 w-3 text-white" />
              </div>
              <span className="font-medium">{blog.author}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{getReadingTime(blog.content)} min read</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <CardDescription className="text-sm leading-relaxed text-gray-700 line-clamp-4">
          {truncateContent(blog.content)}
        </CardDescription>
        
        {/* Read more indicator */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <Badge 
              variant="secondary" 
              className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200"
            >
              Article
            </Badge>
            <span className="text-xs text-gray-400 group-hover:text-blue-500 transition-colors duration-200">
              Click to read more →
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
