// Get references to the input field and the filtered list
const inputField = document.getElementById('inputField');
const filteredList = document.getElementById('filteredList');

// Replace this with your actual dataset or array of items to be filtered
const allItems = ['Apple', 'Banana', 'Orange', 'Grapes', 'Mango', 'Pineapple'];

// Function to filter the items based on user input
function filterItems(input) {
    const filteredItems = allItems.filter(item => item.toLowerCase().includes(input.toLowerCase()));
    return filteredItems;
}

// Function to update the filtered list displayed on the page
function updateFilteredList(filteredItems) {
    filteredList.innerHTML = '';

    filteredItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        filteredList.appendChild(listItem);
    });
}

// Event handler for the input field
inputField.addEventListener('input', function () {
    const userInput = this.value;
    const filteredItems = filterItems(userInput);
    updateFilteredList(filteredItems);
});




