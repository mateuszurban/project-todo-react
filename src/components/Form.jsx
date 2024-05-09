export function Form({ handleFormSubmit, inputValue, setInputValue }) {
  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col items-center mt-8 border-solid border-2 border-current rounded-lg p-4"
      >
        <h2>Add new task:</h2>
        <input
          autoFocus={true}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          type="text"
          className="mt-2 w-2/3 "
        />
        <button
          type="submit"
          className="bg-[#bf6969] rounded-md text-[#d9d9d9] w-1/3 mt-6 p-1 self-center	flex justify-center	text-lg hover:bg-[#bf5050] transition-all"
        >
          submit
        </button>
      </form>
    </>
  );
}
