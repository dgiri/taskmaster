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

  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", status: "Active" },
    { id: 2, title: "Task 2", status: "Completed" },
    { id: 3, title: "Task 3", status: "Active" },
  ]);

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTodo.trim() === "") {
      setError("Todo cannot be empty");
      return;
    }

    setTasks([
      ...tasks,
      { id: Math.random(), title: newTodo, status: "Active" },
    ]);
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
