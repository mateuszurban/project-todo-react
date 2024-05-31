import { useEffect, useState } from "react";
import { PlusCircle } from "react-feather";
import { List } from "./components/List";
import { Form } from "./components/Form";
import { v4 as uuidv4 } from "uuid";

interface Task {
  name: string;
  id: string;
  done: boolean;
}

function App() {
  const [formVisibility, setFormVisibility] = useState<boolean>(false);

  // This way of declaring state makes sure that useEffect monitoring changes in taskList has something to grab on DURING FIRST MOUNT. Otherwise, it just overwrote localStorage, and the result was immediately saved, and the loop was closed & localStorage was emptied on first render.
  const [taskList, setTaskList] = useState(
    !localStorage.getItem("todos")
      ? [
          { name: "first note", id: 1, finished: false },
          { name: "second note", id: 2, finished: false },
          { name: "already done", id: 3, finished: true },
        ]
      : // @ts-expect-error: this line is already "fixed" as suggested, but still lights up. If you type the same '""' structure again, it appears fixed again.
        JSON.parse(localStorage.getItem("todos")) || '""'
  );

  const [inputValue, setInputValue] = useState<string>("");

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // This was not the proper way, but with ts-ignore it worked. It should work in React and JS, too. I do not understand, yet, why this doesn't work. To be fixed/changed soon.
    // console.log(event.target[0].value);
    // let nameValue: string = event.target[0].value;

    setTaskList((prevTaskList: []) => [
      ...prevTaskList,
      {
        name: inputValue,
        finished: false,
        id: uuidv4(),
      },
    ]);
    setFormVisibility(false);
    setInputValue("");
  }

  const handleTaskDelete = (id: string) => {
    setTaskList((prevTasks: []) =>
      prevTasks.filter((task: Task) => task.id !== id)
    );
  };

  const handleTaskFinish = (id: string) => {
    setTaskList((prevTasks: []) =>
      prevTasks.map((task: Task) => {
        if (task.id !== id) {
          return task;
        }

        if (task.id === id) {
          return {
            ...task,
            finished: true,
          };
        }
      })
    );
  };

  const handleTaskEdit = (id: string, name: string) => {
    setFormVisibility(true);
    setInputValue(name);
    handleTaskDelete(id);
  };

  // Monitors taskList value for changes and saves it to localStorage:
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(taskList));
  }, [taskList]);

  return (
    <>
      <div className="flex flex-col pt-2 w-96">
        <h1 className="text-3xl font-bold mb-2">Daily</h1>
        <List
          taskList={taskList}
          setTaskList={setTaskList}
          handleTaskDelete={handleTaskDelete}
          handleTaskFinish={handleTaskFinish}
          handleTaskEdit={handleTaskEdit}
        />
        <button
          onClick={() => setFormVisibility(true)}
          className="bg-[#bf6969] rounded-md text-[#d9d9d9] w-2/5 mt-6 p-1 self-center	flex justify-center	text-lg hover:bg-[#bf5050] transition-all"
        >
          add task <PlusCircle className="pl-2 self-center" />
        </button>
      </div>
      {formVisibility && (
        <Form
          handleFormSubmit={handleFormSubmit}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      )}
    </>
  );
}

export default App;
