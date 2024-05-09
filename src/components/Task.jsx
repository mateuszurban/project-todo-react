import { Square, CheckSquare, Edit, Trash2 } from "react-feather";

export function Task({
  name,
  finished,
  handleTaskDelete,
  handleTaskFinish,
  handleTaskEdit,
}) {
  return (
    <li className="pt-2 flex flex-row">
      {finished ? (
        <button className="pr-2">
          <CheckSquare />
        </button>
      ) : (
        <button onClick={handleTaskFinish} className="pr-2">
          <Square />
        </button>
      )}

      {finished ? (
        <p className="grow text-lg line-through">{name}</p>
      ) : (
        <p className="grow text-lg">{name}</p>
      )}
      {!finished && (
        <button onClick={handleTaskEdit} className="pl-2 ">
          <Edit />
        </button>
      )}

      <button onClick={handleTaskDelete} className="pl-2">
        <Trash2 />
      </button>
    </li>
  );
}
