import React, { useState, useEffect } from "react";

import "./TaskCard.css";
import Tag from "./Tag";
import deleteIcon from "../assets/delete.png";

// TaskCard now supports editing (title, status, tags) and dragging.
const TaskCard = ({ task, index, handleDelete, handleUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.task);
    const [editStatus, setEditStatus] = useState(task.status);
    const [editTags, setEditTags] = useState(task.tags || []);

    useEffect(() => {
        // Keep local edit state in sync if task changes externally
        setEditTitle(task.task);
        setEditStatus(task.status);
        setEditTags(task.tags || []);
    }, [task]);

    const toggleTag = (tag) => {
        if (editTags.includes(tag)) {
            setEditTags((prev) => prev.filter((t) => t !== tag));
        } else {
            setEditTags((prev) => [...prev, tag]);
        }
    };

    const onSave = () => {
        handleUpdate(index, {
            task: editTitle,
            status: editStatus,
            tags: editTags,
        });
        setIsEditing(false);
    };

    const onCancel = () => {
        // reset edits
        setEditTitle(task.task);
        setEditStatus(task.status);
        setEditTags(task.tags || []);
        setIsEditing(false);
    };

    const onDragStart = (e) => {
        // store the original index so drop targets can update state
        e.dataTransfer.setData("text/plain", String(index));
        e.dataTransfer.effectAllowed = "move";
    };

    return (
        <article
            className='task_card'
            draggable
            onDragStart={onDragStart}
            aria-label={`task-${index}`}>
            {isEditing ? (
                <div>
                    <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className='task_input'
                    />

                    <div className='task_card_bottom_line'>
                        <div className='task_card_tags'>
                            {/* allow editing tags inline */}
                            <Tag tagName='HTML' selectTag={toggleTag} selected={editTags.includes('HTML')} />
                            <Tag tagName='CSS' selectTag={toggleTag} selected={editTags.includes('CSS')} />
                            <Tag tagName='JavaScript' selectTag={toggleTag} selected={editTags.includes('JavaScript')} />
                            <Tag tagName='React' selectTag={toggleTag} selected={editTags.includes('React')} />
                        </div>

                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} className='task_status'>
                                <option value='todo'>To do</option>
                                <option value='doing'>Doing</option>
                                <option value='done'>Done</option>
                            </select>

                            <button type='button' className='task_submit' onClick={onSave}>
                                Save
                            </button>
                            <button type='button' className='task_submit' onClick={onCancel}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <p className='task_text'>{task.task}</p>

                    <div className='task_card_bottom_line'>
                        <div className='task_card_tags'>
                            {task.tags && task.tags.map((tag, i) => (
                                <Tag key={i} tagName={tag} selected />
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <button
                                type='button'
                                onClick={() => setIsEditing(true)}
                                className='task_submit'
                                title='Edit'>
                                Edit
                            </button>

                            <div
                                className='task_delete'
                                onClick={() => handleDelete(index)}
                                title='Delete'>
                                <img src={deleteIcon} className='delete_icon' alt='delete' />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </article>
    );
};

export default TaskCard;
