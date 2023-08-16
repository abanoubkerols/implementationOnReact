import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PacketList";
import Stats from "./State";


const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];





export default function App() {
  const [items, setItems] = useState(initialItems)


  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id))
  }

  function handleAddItems(item) {
    setItems((items) => [...items, item])
  }

  function handleToggleItem(id) {
    setItems(items => items.map(item => item.id === id ? { ...item, packed: !item.packed } : item))
  }


  function handleClearList() {
    const confirmed = window.confirm('are you sure to delete')
    if (confirmed) {
      setItems([])
    }
  }
  return <div className="app">
    <Logo />
    <Form onAddItems={handleAddItems} />
    <PackingList items={items}
      onDelete={handleDeleteItem}
      onToggle={handleToggleItem}
      onClearList={handleClearList}
    />
    <Stats items={items} />
  </div>
}









