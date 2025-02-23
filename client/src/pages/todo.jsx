"use client";
import React, { useState, useEffect } from "react";
import { AiOutlineDelete, AiFillEdit, AiOutlineCheck } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import instance from "../utils/axios";
import { loginSuccess, logout } from "../redux/slice/slice";
import Swal from "sweetalert2";

function Todo() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth?.token);
  const user = useSelector((state) => state.auth?.user);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editedTask, setEditedTask] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedCompleted, setEditedCompleted] = useState(false);
  const [editTaskId, setEditTaskId] = useState("");


  const fetchUser = async () => {
    try {
      if (!token) {
        window.location.href = "/login";
        return;
      }
  
      const res = await instance("/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (res.status === 200 && res.data) {
        dispatch(loginSuccess({ user: res.data, token }));
      } else {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      window.location.href = "/login";
    }
  };
  

  const fetchTasks = async () => {
    try {
      if (!token) {
        window.location.href = "/login";
        return;
      }
      const result = await instance.get("/api/todo/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(result.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
    fetchTasks();
  }, [token]);

  const handleAdd = async () => {
    try {
      if(newTask===""||newDescription===""){
       Swal.fire({
             icon: "error",
             title: "Please fill the form",
          });
       return
      }
      const taskData = { name: newTask, description: newDescription, completed: false };
      await instance.post("/api/todo/", taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewTask("");
      setNewDescription("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await instance.delete(`/api/todo/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = async (taskId) => {
    try {
      const updatedTaskData = { name: editedTask, description: editedDescription, completed: editedCompleted };
      await instance.put(`/api/todo/${taskId}`, updatedTaskData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditTaskId("");
      setEditedTask("");
      setEditedDescription("");
      setEditedCompleted(false);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const editTask = (task) => {
    setEditTaskId(task._id);
    setEditedTask(task.name);
    setEditedDescription(task.description);
    setEditedCompleted(task.completed);
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  return (
    <div className="p-2 max-w-5xl m-auto flex flex-col items-center">

      {/* Header Section */}
      <div className="flex flex-row justify-between w-full p-4 rounded-t-xl  bg-gray-600 text-white">
        <h1>{user ? `Hi, ${user.name}` : "Loading..."}</h1>
        <button className="bg-red-500/60 hover:bg-red-800 px-4 py-2 rounded-md" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Task Input Section */}
      <div className="flex flex-col w-full rounded-b-xl border-b-2  border-r-2 border-l-2 items-center p-3">
        <input
          type="text"
          placeholder="Task Name"
          className="block w-full p-2 mb-2 border-b-2 border-cyan-800/30 bg-transparent focus:outline-none"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          required
        />
        <textarea
          type="text"
          placeholder="Task Description"
          className="block w-full p-2 mb-2 border-b-2 border-cyan-800/30 bg-transparent focus:outline-none"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          required
        />
        <button className="bg-teal-800 text-white font-semibold hover:bg-teal-700 rounded-md p-2" onClick={handleAdd}>
          Save Task
        </button>
      </div>

      {/* Task List Section */}
      {tasks.length === 0 ? (
        <h2 className="mt-4 text-white">No tasks available</h2>
      ) : (
        <>
        <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center m-auto gap-4 w-full p-4">
       { tasks.map((task) => (
          <div
            key={task._id}
            className="glassbg hover:shadow-2xl h-44 m-auto w-3/4  p-3 rounded-md flex justify-between "
          >
            <div className="items-start w-3/4 flex flex-col">
              {task._id === editTaskId ? (
                <>
                  <input
                    type="text"
                    className="block w-full p-1 border-b-2 outline-none border-cyan-500 bg-transparent"
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                  />
                  <textarea
                    type="text"
                    className="block w-full p-1 mt-1 border-b-2 outline-none border-cyan-500 bg-transparent"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                  />
                  <label className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      checked={editedCompleted}
                      onChange={(e) => setEditedCompleted(e.target.checked)}
                      className="mr-2"
                    />
                    Completed
                  </label>
                </>
              ) : (

                <div className="flex flex-col max-h-36 min-w-32">
                  <span className="font-bold overflow-hidden w-32 ">{task.name}</span>
                  <span className="text-gray-600 overflow-y-auto w-32 h-28 scrollbar-hide">
                  {task.description}
                  </span>
                  <span className={task.completed ? "text-green-800 font-semibold" : "text-red-600 font-semibold"}>
                    {task.completed ? "Completed ✅" : "Pending ❌"}
                  </span>
                </div>
              )}
            </div>
            <div className="">
              <button className="mx-2" onClick={() => deleteTask(task._id)}>
                <AiOutlineDelete />
              </button>
              {task._id === editTaskId ? (
                <button onClick={() => handleEdit(task._id)}>
                  <AiOutlineCheck />
                </button>
              ) : (
                <button onClick={() => editTask(task)}>
                  <AiFillEdit />
                </button>
              )}
            </div>
          </div>
        ))
       } </div>
      </> )}
    </div>
  );
}

export default Todo;
