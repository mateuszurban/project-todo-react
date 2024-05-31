import { Task } from "./Task";

interface ListInterface {
  taskList: [];
  handleTaskDelete: (id: string) => void;
  handleTaskFinish: (id: string) => void;
  handleTaskEdit: (id: string, name: string) => void;
  setTaskList: React.Dispatch<React.SetStateAction<string>>;
}

interface TaskInterface {
  id: string;
  name: string;
  finished: boolean;
}

export function List({
  taskList,
  handleTaskDelete,
  handleTaskFinish,
  handleTaskEdit,
}: ListInterface) {
  return (
    <ul className="pt-2 pb-2">
      {taskList.map(({ id, name, finished }: TaskInterface) => (
        <Task
          name={name}
          finished={finished}
          key={id}
          handleTaskDelete={() => {
            handleTaskDelete(id);
          }}
          handleTaskFinish={() => handleTaskFinish(id)}
          handleTaskEdit={() => handleTaskEdit(id, name)}
        />
      ))}
    </ul>
  );
}
