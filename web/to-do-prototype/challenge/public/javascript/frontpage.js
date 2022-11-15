const form = document.querySelector("form");
const ol = document.querySelector("ol");

export const createToDoItem = ({ text, checked, id }) => {
    const li = document.createElement("li");
    li.dataset.id = id;
    const label = document.createElement("label");
    const span = document.createElement("span");
    span.innerText = text;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = checked;

    label.append(checkbox, span);
    li.appendChild(label);

    return li;
}

const updateTodoItem = async (itemId, checked) => {
    const response = await fetch(`/item/${itemId}`, {
        method: "PATCH",
        body: JSON.stringify({ checked }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const item = await response.json();
}

export const addToDoItem = (todoItem) => {

    const checkbox = todoItem.querySelector("input");

    if (checkbox) {
        checkbox.addEventListener("change", async function () {
            
            await updateTodoItem(todoItem.dataset.id, this.checked);
        });
    }

    if (ol)
        ol.appendChild(todoItem);
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const todoContent = form.content.value;

    if (!todoContent) return;

    const data = {
        text: todoContent,
        checked: false,
    };

    const response = await fetch("/item", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const { item: newItem } = await response.json();

    addToDoItem(createToDoItem(newItem));

    form.content.value = "";
});

const response = await fetch("/items");
const { items: toDoItems } = await response.json();

toDoItems.forEach((item) => {

    console.log("creating todo item:", item);

    addToDoItem(createToDoItem(item));
});