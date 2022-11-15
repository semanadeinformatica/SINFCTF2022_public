function submitNewCandy(event) {
    event.preventDefault();
    const data = new FormData();
    data.append('name', document.querySelector('#candy-name').value);
    fetch('/api/store.php', {
        method: 'POST',
        body: data,
    }).then(response => {
        if (response.status === 200) {
            loadCandies();
            updateResponseMessage('Candy added!');
        } else if (response.status === 400) {
            updateResponseMessage('Invalid candy name. Read the requirements!', 'alert-danger');
        } else {
            updateResponseMessage('Something really bad happened.', 'alert-danger');
        }
    });
}

function loadCandies() {
    fetch('/api/store.php').then(response => response.json()).then(json => {
        const candies = json.candies;
        const candyList = document.querySelector('#candies');
        candyList.innerHTML = '';
        candies.forEach(candy => {
            const candyItem = document.createElement('li');
            candyItem.innerText = candy;
            candyList.appendChild(candyItem);
        });
    });
}

function updateResponseMessage(message, alertClass = 'alert-success') {
    const responseMessage = document.querySelector('#response-message');
    responseMessage.innerHTML = '<div class="slide alert ' + alertClass + '" role="alert">' + message + '</div>';
}

window.onload = loadCandies;