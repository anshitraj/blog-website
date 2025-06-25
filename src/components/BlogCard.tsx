
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Calendar, User } from "lucide-react";
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

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex-shrink-0">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg leading-tight">{blog.title}</CardTitle>
          {isAdmin && (
            <div className="flex space-x-1 ml-2">
              <Button size="sm" variant="outline" onClick={onEdit}>
                <Edit className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="outline" onClick={onDelete}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <User className="h-3 w-3" />
            <span>{blog.author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <CardDescription className="text-sm leading-relaxed">
          {truncateContent(blog.content)}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
