import { Task } from "./Task";

export function List({
  taskList,
  handleTaskDelete,
  handleTaskFinish,
  handleTaskEdit,
}) {
  return (
    <ul className="pt-2 pb-2">
      {taskList.map(({ id, name, finished }) => (
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
