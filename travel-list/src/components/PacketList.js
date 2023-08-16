import { useState } from "react";
import Item from "./Item";


function PackingList({ items, onDelete, onToggle, onClearList }) {

    const [sortBy, setSortBy] = useState('input')
    let sortedItems

    if (sortBy === 'input') {
        sortedItems = items
    }
    if (sortBy === 'description') {
        sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description))
    }
    if (sortBy === 'packed') {
        sortedItems = items.slice().sort((a, b) => Number(b.packed) - Number(a.packed))
    }

    return (
        <div className="list">
            <ul >
                {sortedItems.map((item) =>
                (<Item
                    item={item}
                    onDelete={onDelete}
                    onToggle={onToggle}
                    key={item.id} />))}
            </ul>
            <div className="actions">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value='input'>
                        sort by input order
                    </option>
                    <option value='description'>
                        sort by description
                    </option>
                    <option value='packed'>
                        sort by packed status
                    </option>

                </select>
                <button onClick={onClearList}>Clear List </button>
            </div>
        </div>


    )
}

export default PackingList