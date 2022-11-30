import { useState } from 'react';
import AddTaskForm from './components/AddTaskForm';
import UpdateForm from './components/UpdateForm';
import ToDo from './components/ToDo';
import './App.css';

function App() {
  // Tasks (ToDoLIst) State
  const [toDo, setToDo] = useState([
    { id: 1, title: 'Task One', status: false },
    { id: 2, title: 'Task Two', status: false },
  ]);

  // Temp State
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  // Add Task
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      setToDo([...toDo, { id: num, title: newTask, status: false }]);
      setNewTask('');
    }
  };

  // Delete Task
  const deleteTask = (id) => {
    setToDo(toDo.filter((task) => task.id !== id));
  };

  // Mark Task as done or completed
  const markDone = (id) => {
    setToDo(
      toDo.map((task) =>
        task.id === id ? { ...task, status: !task.status } : task
      )
    );
  };

  // Cancel Update
  const cancelUpdate = () => {
    setUpdateData('');
  };

  // Change Task for update
  const changeHolder = (e) => {
    setUpdateData({
      ...updateData,
      title: e.target.value,
    });
  };

  // Update Task
  const updateTask = () => {
    let removeOldRecord = [...toDo].filter((task) => task.id !== updateData.id);
    setToDo([...removeOldRecord, updateData]);
    setUpdateData('');
  };

  return (
    <div className="container App">
      <br />
      <h2>To Do List App (ReactJS)</h2>
      <br />
      {/* Update Task */}
      {updateData && updateData ? (
        <UpdateForm
          updateData={updateData}
          updateTask={updateTask}
          changeHolder={changeHolder}
          cancelUpdate={cancelUpdate}
        />
      ) : (
        <AddTaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
        />
      )}

      {/* Display ToDos */}
      {toDo && toDo.length ? '' : 'No Tasks...'}

      <ToDo
        toDo={toDo}
        markDone={markDone}
        setUpdateData={setUpdateData}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
