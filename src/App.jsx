import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", age: "" });

  useEffect(() => {
    window.electronAPI.receiveUsers((updatedUsers) => {
      setUsers(updatedUsers);
    });
  }, []);

  const showForm = () => {
    setFormVisible(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.electronAPI.addUser(formData);
    setFormData({ name: "", email: "", age: "" });
    setFormVisible(false);
  };

  return (
    <div className="app">
      <h1>Пользователи</h1>
      <button onClick={showForm}>Добавить пользователя</button>

      {isFormVisible && (
        <div className="form-container">
          <h2>Добавить пользователя</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Имя:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Возраст:
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <button type="submit">Добавить</button>
            <button type="button" onClick={() => setFormVisible(false)}>
              Отмена
            </button>
          </form>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Email</th>
            <th>Возраст</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
