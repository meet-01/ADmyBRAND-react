import { useEffect, useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(0);

  useEffect(() => {
    const updateUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    };
    updateUsers();
  }, []);

  console.log(users);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body,
        userId: selectedUser,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  const handleSelectedUser = (e) => {
    const id = Number(e.target.value);
    setSelectedUser(id);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="users">Select user:</label>

        <select name="user" id="users" onChange={handleSelectedUser}>
          <option value="0">Select User</option>;
          {users.map((user) => {
            return (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>
        <label>
          title:
          <input
            type="text"
            value={title}
            name="Name"
            id=""
            onChange={handleTitleChange}
          />
        </label>
        <label>
          Body:
          <input
            type="text"
            value={body}
            name="Body"
            id=""
            onChange={handleBodyChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  body: JSON.stringify({
    title: "foo",
    body: "bar",
    userId: 1,
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data));
const fetchUsers = async () => {
  return fetch("https://jsonplaceholder.typicode.com/users", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      return json.map((item) => {
        const filteredUsers = { name: item.name, id: item.id };
        return filteredUsers;
      });
    })
    .catch((error) => {
      alert(`errror : ${error}`);
      return [];
    });
};
export default App;
