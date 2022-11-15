const form = document.querySelector("form");
const textarea = document.querySelector("textarea");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const todoContent = textarea.value;

    if (!todoContent) return;

    let requestJSON;

    try {
        requestJSON = JSON.parse(todoContent);
    } catch (err) {
        alert("Invalid JSON body!");
        return;
    }

    for (const item of requestJSON.items) {
        if (item.hasOwnProperty("admin")) {
            alert("You cannot add that property to your items: you are just a regular user >:(");
            return;
        }
    }   

    const response = await fetch("/items", {
        method: "POST",
        body: JSON.stringify(requestJSON),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.status !== 200) {
        console.error("HUH ?");
        return;
    }

    window.location.assign("/");
});

const response = await fetch("/items?noParseItems=true");
const store = await response.json();

if (textarea)
    textarea.value = JSON.stringify(store, undefined, 4);
