"use client";

import { useUserTodos } from "@/api/hooks/useProfile";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, CheckSquare, Circle } from "lucide-react";

interface UserTodosTabProps {
  userId: string;
}

const UserTodosTab = ({ userId }: UserTodosTabProps) => {
  const { data: todos, isLoading, error } = useUserTodos(userId);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <CheckSquare className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Todos</h3>
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 flex-1" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <CheckSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Error Loading Todos</h3>
        <p className="text-muted-foreground">
          Failed to load todos. Please try again.
        </p>
      </div>
    );
  }

  if (!todos || todos.length === 0) {
    return (
      <div className="text-center py-8">
        <CheckSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Todos Found</h3>
        <p className="text-muted-foreground">
          This user doesn&apos;t have any todos yet.
        </p>
      </div>
    );
  }

  const completedTodos = todos.filter((todo) => todo.completed);
  const incompleteTodos = todos.filter((todo) => !todo.completed);
  const completionPercentage = Math.round(
    (completedTodos.length / todos.length) * 100
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <CheckSquare className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Todos</h3>
        <Badge variant="secondary">{todos.length}</Badge>
      </div>

      {/* Completion Statistics */}
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-medium">
                {completedTodos.length} of {todos.length} completed
              </span>
            </div>
            <Badge variant="outline" className="text-sm">
              {completionPercentage}%
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Incomplete Todos */}
      {incompleteTodos.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Circle className="h-4 w-4" />
            Pending ({incompleteTodos.length})
          </h4>
          {incompleteTodos.map((todo) => (
            <Card key={todo.id} className="border-l-4 border-l-yellow-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Checkbox checked={false} disabled />
                  <span className="flex-1">{todo.title}</span>
                  <Badge variant="secondary" className="text-xs">
                    Pending
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Completed Todos */}
      {completedTodos.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Completed ({completedTodos.length})
          </h4>
          {completedTodos.map((todo) => (
            <Card
              key={todo.id}
              className="border-l-4 border-l-green-500 bg-green-50/50 dark:bg-green-950/20"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Checkbox checked={true} disabled />
                  <span className="flex-1 line-through text-muted-foreground">
                    {todo.title}
                  </span>
                  <Badge
                    variant="default"
                    className="text-xs bg-green-600 hover:bg-green-700"
                  >
                    Done
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserTodosTab;
