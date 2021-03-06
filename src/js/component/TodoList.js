import React, { useState, useEffect } from "react";

//import TodoItem from "./TodoItem";

export const TodoList = () => {
	const [singleTodo, setSingleTodo] = useState({});
	const [todos, setTodos] = useState([{ label: "Eat" }]);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/jgus0001")
			.then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				// Read the response as json.
				return response.json();
			})
			.then(function(responseAsJson) {
				// Do stuff with the JSON
				console.log("responseAsJson", responseAsJson);
				setTodos(responseAsJson);
			})
			.catch(function(error) {
				console.log("Looks like there was a problem: \n", error);
			});
	}, []);

	const handleChange = e => {
		setSingleTodo({ label: e.target.value, done: false });
	};
	const handleClick = e => {
		setTodos([...todos, singleTodo]);
		setSingleTodo({});
		//var data = [{ label: singleTodo, done: false }];
		fetch("https://assets.breatheco.de/apis/fake/todos/user/jgus0001", {
			method: "PUT",
			body: JSON.stringify(todos), // data can be `string` or {object}!
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(() => {
				fetch(
					"https://assets.breatheco.de/apis/fake/todos/user/jgus0001"
				)
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						// Read the response as json.
						return response.json();
					})
					.then(function(responseAsJson) {
						// Do stuff with the JSON
						console.log("responseAsJson", responseAsJson);
						setTodos(...todos, responseAsJson);
					})
					.catch(function(error) {
						console.log(
							"Looks like there was a problem: \n",
							error
						);
					});
			})
			.then(res => res.json())
			.catch(error => console.error("Error", error));
	};

	const deleteTask = task => {
		var newTodos = todos.filter(item => item.label !== task);
		setTodos(newTodos);
	};

	//filter cannot be a standalone function, it needs to be a variable example: var newTodos =
	//after filtering the function we needed to set the new todos to the updated (setTodos) so it can show the new
	//list of labels without the item we deleted

	return (
		<>
			<form onSubmit={e => e.preventDefault()}>
				<label>
					To Do:{" "}
					<input
						type="text"
						name="todo"
						value={singleTodo.label}
						onChange={handleChange}
					/>
					<button onClick={handleClick}> Save </button>
				</label>
			</form>

			{todos.map((TodoItem, i) => {
				return (
					<div className="todo-item" key={i}>
						{TodoItem.label}
						<button
							className="btn-delete"
							type="button"
							onClick={() => deleteTask(TodoItem.label)}>
							X
						</button>
					</div>
				);
			})}
		</>
	);
};

//adding arrow function before delelte task makes the function run once its clicked if not the page will load as soon as you open the page .
//mapping function is looping through an array and for each one
//practice mapping function on sandbox/jsfiddle by removing and adding items

// const [todos, setTodos] = useState (["Run", "walk", "sleep"]);
// const deletetask = (ind) => {
//     var newTodos = todos.filter ((item, i) => {return ind !=== i});
// }

// return

// <button onClick = {() = > deletetask(1)}>Delete</button>
