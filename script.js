document.addEventListener('DOMContentLoaded', () => {
    // Default options
    let options = [
        "Pizza",
        "Sushi",
        "Tacos",
        "Pasta",
        "Burgers",
        "Salad",
        "Curry",
        "Stir Fry"
    ];

    const decideBtn = document.getElementById('decide-btn');
    const resultContainer = document.getElementById('result-container');
    const resultDisplay = document.getElementById('result-display');
    const retryBtn = document.getElementById('retry-btn');
    const optionsList = document.getElementById('options-list');
    const newOptionInput = document.getElementById('new-option-input');
    const addOptionBtn = document.getElementById('add-option-btn');

    // Initialize list
    renderOptions();

    // Event Listeners
    decideBtn.addEventListener('click', pickDinner);
    retryBtn.addEventListener('click', pickDinner);
    
    addOptionBtn.addEventListener('click', addOption);
    newOptionInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addOption();
    });

    function renderOptions() {
        optionsList.innerHTML = '';
        options.forEach((option, index) => {
            const li = document.createElement('li');
            li.className = 'option-item';
            li.innerHTML = `
                <span>${option}</span>
                <button class="delete-btn" data-index="${index}">&times;</button>
            `;
            optionsList.appendChild(li);
        });

        // Add delete functionality
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                options.splice(index, 1);
                renderOptions();
            });
        });
    }

    function addOption() {
        const value = newOptionInput.value.trim();
        if (value) {
            options.push(value);
            newOptionInput.value = '';
            renderOptions();
        }
    }

    function pickDinner() {
        if (options.length === 0) {
            alert("Please add some options first!");
            return;
        }

        // Add a simple animation effect
        resultContainer.classList.remove('hidden');
        resultDisplay.textContent = "Thinking...";
        
        let counter = 0;
        const maxCount = 10;
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * options.length);
            resultDisplay.textContent = options[randomIndex];
            counter++;

            if (counter >= maxCount) {
                clearInterval(interval);
                // Final pick
                const finalIndex = Math.floor(Math.random() * options.length);
                resultDisplay.textContent = options[finalIndex];
            }
        }, 100);
    }
});
