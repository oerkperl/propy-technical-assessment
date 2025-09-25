import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2, Calendar, Clock } from "lucide-react";
import { TaskCardProps, Priority } from "@/types/Task";
import { format } from "date-fns";

const getPriorityColor = (priority: Priority) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 hover:bg-red-200 border-red-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200";
    case "low":
      return "bg-green-100 text-green-800 hover:bg-green-200 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200";
  }
};

export const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
}: TaskCardProps) => {
  const handleToggleComplete = () => {
    onToggleComplete(task.id);
  };

  const handleEdit = () => {
    onEdit(task);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  const formatDueDate = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.ceil(
      (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays < 0) {
      return {
        text: `Overdue by ${Math.abs(diffInDays)} day(s)`,
        className: "text-red-600",
      };
    } else if (diffInDays === 0) {
      return { text: "Due today", className: "text-orange-600" };
    } else if (diffInDays === 1) {
      return { text: "Due tomorrow", className: "text-yellow-600" };
    } else {
      return {
        text: `Due in ${diffInDays} day(s)`,
        className: "text-muted-foreground",
      };
    }
  };

  const dueDateInfo = task.dueDate ? formatDueDate(task.dueDate) : null;

  return (
    <Card
      className={`transition-all duration-200 hover:shadow-md ${
        task.completed ? "bg-muted/50 border-muted" : "hover:border-primary/20"
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <Checkbox
              checked={task.completed}
              onCheckedChange={handleToggleComplete}
              className="mt-1 flex-shrink-0"
              aria-label={`Mark task "${task.title}" as ${
                task.completed ? "incomplete" : "complete"
              }`}
            />
            <div className="flex-1 min-w-0">
              <h3
                className={`font-semibold text-base leading-tight ${
                  task.completed ? "line-through text-muted-foreground" : ""
                }`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p
                  className={`text-sm mt-1 ${
                    task.completed
                      ? "line-through text-muted-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {task.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge
              variant="outline"
              className={`${getPriorityColor(
                task.priority
              )} text-xs font-medium`}
            >
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {task.dueDate && dueDateInfo && (
              <div
                className={`flex items-center gap-1 ${dueDateInfo.className}`}
              >
                <Calendar className="w-4 h-4" />
                <span>{dueDateInfo.text}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>Created {format(task.createdAt, "MMM dd")}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="h-8 px-2 hover:bg-primary/10 hover:text-primary"
              aria-label={`Edit task "${task.title}"`}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="h-8 px-2 hover:bg-destructive/10 hover:text-destructive"
              aria-label={`Delete task "${task.title}"`}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
