import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Plus, ListTodo } from "lucide-react";
import { Task, TaskFormData } from "@/types/Task";
import { TaskCard } from "@/components/TaskCard";
import { TaskForm } from "@/components/TaskForm";

const STORAGE_KEY = "task-manager-tasks";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"createdAt" | "priority" | "dueDate">(
    "createdAt"
  );

  // Filter and sort tasks
  const filteredAndSortedTasks = tasks
    .filter((task) => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        task.title.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query) ||
        task.priority.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (sortBy === "priority") {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      if (sortBy === "dueDate") {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.getTime() - b.dueDate.getTime();
      }
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const loadTasks = () => {
      try {
        const savedTasks = localStorage.getItem(STORAGE_KEY);
        if (savedTasks) {
          const parsedTasks = JSON.parse(savedTasks);
          // Convert date strings back to Date objects
          const tasksWithDates = parsedTasks.map((task: any) => ({
            ...task,
            dueDate: task.dueDate ? new Date(task.dueDate) : null,
            createdAt: new Date(task.createdAt),
            updatedAt: new Date(task.updatedAt),
          }));
          setTasks(tasksWithDates);
        }
      } catch (error) {
        console.error("Error loading tasks from localStorage:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTasks();
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.error("Error saving tasks to localStorage:", error);
      }
    }
  }, [tasks, isLoading]);

  // CRUD Operations
  const handleAddTask = (formData: TaskFormData) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: formData.title,
      description: formData.description || undefined,
      priority: formData.priority,
      completed: false,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks((prev) => [newTask, ...prev]);
    setShowForm(false);
  };

  const handleEditTask = (formData: TaskFormData) => {
    if (!editingTask) return;

    const updatedTask: Task = {
      ...editingTask,
      title: formData.title,
      description: formData.description || undefined,
      priority: formData.priority,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
      updatedAt: new Date(),
    };

    setTasks((prev) =>
      prev.map((task) => (task.id === editingTask.id ? updatedTask : task))
    );
    setEditingTask(null);
    setShowForm(false);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const handleToggleComplete = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed, updatedAt: new Date() }
          : task
      )
    );
  };

  const startEditing = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ListTodo className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Task Manager</h1>
              <p className="text-sm text-muted-foreground">
                Stay organized and productive
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Stats and Action Bar */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">My Tasks</h2>
                <p className="text-sm text-muted-foreground">
                  {tasks.length === 0
                    ? "No tasks yet"
                    : `${filteredAndSortedTasks.length}/${tasks.length} task${
                        tasks.length !== 1 ? "s" : ""
                      } • ${completedCount} completed`}
                </p>
              </div>
              <Button
                onClick={() => setShowForm(!showForm)}
                className="transition-all duration-200 hover:scale-105 active:scale-95 w-full sm:w-auto"
                size="default"
              >
                <Plus
                  className={`w-4 h-4 mr-2 transition-transform duration-200 ${
                    showForm ? "rotate-45" : ""
                  }`}
                />
                {showForm ? "Cancel" : "Add Task"}
              </Button>
            </div>

            {/* Search and Filter */}
            {tasks.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      ×
                    </button>
                  )}
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                >
                  <option value="createdAt">Sort by Created</option>
                  <option value="priority">Sort by Priority</option>
                  <option value="dueDate">Sort by Due Date</option>
                </select>
              </div>
            )}
          </div>

          {/* Task Form */}
          {showForm && (
            <div className="animate-in slide-in-from-top-4 fade-in-0 duration-300">
              <TaskForm
                onSubmit={editingTask ? handleEditTask : handleAddTask}
                onCancel={cancelForm}
                initialData={
                  editingTask
                    ? {
                        title: editingTask.title,
                        description: editingTask.description || "",
                        priority: editingTask.priority,
                        dueDate: editingTask.dueDate
                          ? editingTask.dueDate.toISOString().split("T")[0]
                          : "",
                      }
                    : undefined
                }
                isEditing={!!editingTask}
              />
            </div>
          )}

          {/* Task List */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="grid gap-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 bg-muted rounded mt-1"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-muted rounded w-3/4"></div>
                          <div className="h-3 bg-muted rounded w-1/2"></div>
                        </div>
                        <div className="w-16 h-6 bg-muted rounded"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : tasks.length === 0 ? (
              <Card className="border-dashed transition-all duration-300 hover:border-primary/50">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <div className="animate-bounce mb-4">
                    <CheckCircle2 className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No tasks yet</h3>
                  <p className="text-muted-foreground text-center max-w-sm mb-4">
                    Get started by creating your first task. Click the "Add
                    Task" button above.
                  </p>
                  <Button
                    onClick={() => setShowForm(true)}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Task
                  </Button>
                </CardContent>
              </Card>
            ) : filteredAndSortedTasks.length === 0 && searchQuery ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-lg font-medium mb-2">No tasks found</h3>
                  <p className="text-muted-foreground text-center max-w-sm">
                    Try adjusting your search or clearing the filter.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSearchQuery("")}
                    className="mt-4"
                    size="sm"
                  >
                    Clear search
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredAndSortedTasks.map((task, index) => (
                  <div
                    key={task.id}
                    className="animate-in slide-in-from-top-2 fade-in-0"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animationDuration: "300ms",
                      animationFillMode: "backwards",
                    }}
                  >
                    <TaskCard
                      task={task}
                      onEdit={startEditing}
                      onDelete={handleDeleteTask}
                      onToggleComplete={handleToggleComplete}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
