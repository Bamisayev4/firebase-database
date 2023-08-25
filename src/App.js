import { useState, useEffect } from "react";
import { db } from "./Firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import "./App.css";

function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const [toggleFetch, setToggleFetch] = useState(false);

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const createUser = async () => {
    await addDoc(usersCollectionRef, { Name: newName, age: newAge });
    setToggleFetch((prev) => !prev);
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: Number(age) + 1 };
    await updateDoc(userDoc, newFields);
    setToggleFetch((prev) => !prev);
  };
  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    setToggleFetch((prev) => !prev);
  };

  useEffect(() => {
    getUsers();
  }, [toggleFetch]);

  return (
    <>
      <div className="App">
        <h1>Add User</h1>
        <br />
        <input
          type="text"
          placeholder="Name"
          onChange={(event) => {
            setNewName(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Age"
          onChange={(event) => {
            setNewAge(event.target.value);
          }}
        />
        <button onClick={createUser}>Create user</button>
        {users.map((user, index) => {
          return (
            <div key={index.toString()}>
              <div>
                <h1> Name: {user.Name}</h1>
                <h1>Age: {user.age}</h1>
                <button onClick={() => updateUser(user.id, user.age)}>
                  Increase age
                </button>
                <button
                  onClick={() => {
                    deleteUser(user.id);
                  }}
                >
                  Delete user
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
