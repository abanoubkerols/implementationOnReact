import React from "react";
import Todo from "../assets/direct-hit.png";

import "./TaskColumn.css";
import TaskCard from "./TaskCard";

// TaskColumn is now a drop target. It receives handleUpdate and moveTask from parent.
const TaskColumn = ({ title, icon, tasks, status, handleDelete, handleUpdate, moveTask }) => {
    const onDragOver = (e) => {
        e.preventDefault(); // allow drop
    };

    const onDrop = (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        if (data !== null && data !== undefined && data !== "") {
            const draggedIndex = Number(data);
            if (!Number.isNaN(draggedIndex)) {
                // move the task to this column's status
                moveTask(draggedIndex, status);
            }
        }
    };

    return (
        <section className='task_column' onDragOver={onDragOver} onDrop={onDrop}>
            <h2 className='task_column_heading'>
                <img className='task_column_icon' src={icon} alt='' /> {title}
            </h2>

            {tasks.map((task, index) =>
                task.status === status && (
                    <TaskCard
                        key={index}
                        task={task}
                        index={index}
                        handleDelete={handleDelete}
                        handleUpdate={handleUpdate}
                    />
                )
            )}
        </section>
    );
};

export default TaskColumn;
