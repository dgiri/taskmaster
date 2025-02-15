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

  function updateTask(
    id: number,
    title: string,
    isEditing: boolean,
    status: string
  ) {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, title: title, isEditing: isEditing, status: status }
        : task
    );

    const localTasks = localStorage.getItem("todo-manager");
    const parsedTasks = localTasks ? JSON.parse(localTasks) : {};
    parsedTasks.tasks = updatedTasks;
    localStorage.setItem("todo-manager", JSON.stringify(parsedTasks));
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
                  onChange={(e) =>
                    updateTask(task.id, e.target.value, true, task.status)
                  }
                  className="text-sm font-medium leading-none w-full p-1 border rounded"
                  onBlur={(e) =>
                    updateTask(task.id, e.target.value, false, task.status)
                  }
                  autoFocus
                />
              ) : (
                <p className="text-sm font-medium leading-none">{task.title}</p>
              )}
              <p
                className={`text-sm ${
                  task.status === "Completed" ? "hidden" : ""
                }`}
              >
                <button
                  onClick={() =>
                    updateTask(task.id, task.title, false, "Completed")
                  }
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
