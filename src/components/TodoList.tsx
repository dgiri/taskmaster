import { BellRing, Trash2, Pencil } from "lucide-react";
import { Button } from "./ui/button";

type TodoListProps = {
  tasks: { id: number; title: string; status: string; isEditing?: boolean }[];
  status: string;
  setTasks: (
    tasks: {
      id: number;
      title: string;
      status: string;
      isEditing?: boolean;
    }[]
  ) => void;
};

function TodoList({ tasks, setTasks, status }: TodoListProps) {
  function removeTask(id: number) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function editTask(id: number) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isEditing: true };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  return (
    <div className="flex flex-col gap-4">
      {tasks
        .filter((task) => task.status === status || status === "All")
        .map((task) => (
          <div
            key={task.id}
            className={`flex items-center space-x-4 rounded-md border p-4 ${
              task.status === "Completed"
                ? "border-2 border-green-200"
                : "border-2 border-blue-200"
            }`}
          >
            <BellRing />
            <div className="flex-1 space-y-1">
              {task.isEditing ? (
                <input
                  type="text"
                  value={task.title}
                  onChange={(e) => {
                    const updatedTasks = tasks.map((t) =>
                      t.id === task.id ? { ...t, title: e.target.value } : t
                    );
                    setTasks(updatedTasks);
                  }}
                  className="text-sm font-medium leading-none w-full p-1 border rounded"
                  onBlur={() => {
                    const updatedTasks = tasks.map((t) =>
                      t.id === task.id ? { ...t, isEditing: false } : t
                    );
                    setTasks(updatedTasks);
                  }}
                  autoFocus
                />
              ) : (
                <p className="text-sm font-medium leading-none">{task.title}</p>
              )}
              {/* <p className="text-sm text-muted-foreground">
              Status: {task.status}
            </p> */}
              <p
                className={`text-sm ${
                  task.status === "Completed" ? "hidden" : ""
                }`}
              >
                <button
                  onClick={() => {
                    const updatedTasks = tasks.map((t) =>
                      t.id === task.id ? { ...t, status: "Completed" } : t
                    );
                    setTasks(updatedTasks);
                  }}
                  className="mt-2 text-xs text-muted-foreground hover:text-blue-500 border rounded-md p-1"
                >
                  Mark as Completed
                </button>
              </p>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => editTask(task.id)}
              className={task.status === "Completed" ? "hidden" : ""}
            >
              <Pencil className="h-2 w-2" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => removeTask(task.id)}
              className={task.status === "Completed" ? "hidden" : ""}
            >
              <Trash2 className="h-2 w-2" />
            </Button>
          </div>
        ))}
    </div>
  );
}

export default TodoList;
