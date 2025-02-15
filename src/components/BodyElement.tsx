import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import TodoList from "./TodoList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export function BodyElement() {
  const [newTodo, setNewTodo] = useState("");
  const [error, setError] = useState("");

  const localTasks = localStorage.getItem("todo-manager");
  const [tasks, setTasks] = useState(
    localTasks ? JSON.parse(localTasks).tasks : []
  );

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTodo.trim() === "") {
      setError("Todo cannot be empty");
      return;
    }

    const newTask = {
      id: Math.random(),
      title: newTodo,
      status: "Active",
    };

    const localTasks = localStorage.getItem("todo-manager");
    const parsedTasks = localTasks ? JSON.parse(localTasks) : {};
    parsedTasks.tasks = [...tasks, newTask];
    localStorage.setItem("todo-manager", JSON.stringify(parsedTasks));

    setTasks(parsedTasks.tasks);
    setNewTodo("");
    setError("");
  };
  return (
    <div className="max-w-7xl mx-auto flex justify-center">
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="all" className="w-[800px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Tasks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <TodoList tasks={tasks} setTasks={setTasks} status="All" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>Active Tasks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <TodoList tasks={tasks} setTasks={setTasks} status="Active" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="completed">
            <Card>
              <CardHeader>
                <CardTitle>Completed Tasks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <TodoList
                  tasks={tasks}
                  setTasks={setTasks}
                  status="Completed"
                />
              </CardContent>
            </Card>
          </TabsContent>
          <form className="flex gap-2 mt-4" onSubmit={handleAddTodo}>
            <Label htmlFor="newTodo" className="sr-only">
              New Todo
            </Label>
            <Input
              id="newTodo"
              placeholder="Add a new todo..."
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <Button type="submit">Add Todo</Button>
          </form>
          <span className="text-red-500">{error}</span>
        </Tabs>
      </div>
    </div>
  );
}
