import React, { useState } from "react";

function App() {
  const [list, updateList] = useState([]);
  console.log("reapp");
  return (
    <div className="app">
      <Logo />
      <Form updateList={updateList} />
      <PackingList list={list} updateList={updateList} />
      <Stats list={list} />
    </div>
  );
}

function Logo() {
  return <h1>💼 FAR AWAY 🌴</h1>;
}

///////-----------------------------------form

function Form({ updateList }) {
  const [description, SetItemDes] = useState("");
  const [quantity, SetItemNum] = useState(5);

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = { id: Date.now(), description, quantity, packed: false };
    updateList((lists) => [...lists, newItem]);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you Need For Trip?</h3>
      <select value={quantity} onChange={(e) => SetItemNum(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item"
        value={description}
        onChange={(e) => SetItemDes(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

//--------------------------------------packaging list
function PackingList({ list, updateList }) {
  const [filter, setfilter] = useState("input");
  let sortedlist;
  if (filter === "input") sortedlist = list;
  if (filter === "description") {
    sortedlist = list
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (filter === "PackedStatus") {
    sortedlist = list
      .slice()
      .sort((a, b) => Number(b.packed) - Number(a.packed));
  }

  function handleClear() {
    updateList([]);
  }
  return (
    <div className="list">
      <ul>
        {sortedlist.map((items) => (
          <Item item={items} updateList={updateList} key={items.id} />
        ))}
      </ul>
      <div className="actons">
        <select value={filter} onChange={(e) => setfilter(e.target.value)}>
          <option value="input">Sort By input Order</option>
          <option value="description">Sort By description</option>
          <option value="PackedStatus">Sort By Packed Status</option>
        </select>
      </div>
      <button onClick={handleClear}>Clear List</button>
    </div>
  );
}
//--------------------------------------items
function Item({ item, updateList }) {
  function handleDelete(id) {
    updateList((lists) => lists.filter((item) => item.id !== id));
  }

  function handlePacked(id) {
    updateList((lists) => {
      const change = lists.map((item) =>
        id === item.id ? { ...item, packed: !item.packed } : item
      );
      return change;
    });
  }
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => handlePacked(item.id)}
      />

      <span style={{ textDecoration: item.packed ? "line-through" : "" }}>
        {`${item.quantity} `} {item.description}
      </span>
      <button onClick={() => handleDelete(item.id)}>❌</button>
    </li>
  );
}
//-------------------------filter

///----------------------footer status
function Stats({ list }) {
  const total = list.length;
  if (total === 0) {
    return (
      <footer className="stats">
        <em>Select Item to Pack for Flight ✈️</em>
      </footer>
    );
  }
  const totalPacked = list.filter((item) => item.packed === true).length;
  const percentPac = Math.round((totalPacked / total) * 100);
  return (
    <footer className="stats">
      <em>
        You have {total} compnent in your List, and you already packed{" "}
        {totalPacked} (%{percentPac})
      </em>
    </footer>
  );
}
export default App;
