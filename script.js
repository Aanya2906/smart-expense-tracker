document.addEventListener("DOMContentLoaded", function () {

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    window.addExpense = function () {
        let date = document.getElementById('date').value;
        let category = document.getElementById('category').value;
        let amount = parseFloat(document.getElementById('amount').value);

        if (!date || !category || isNaN(amount)) {
            alert("Please fill all fields correctly.");
            return;
        }

        expenses.push({ date, category, amount });
        localStorage.setItem('expenses', JSON.stringify(expenses));

        alert("Expense added!");

        document.getElementById('date').value = '';
        document.getElementById('category').value = '';
        document.getElementById('amount').value = '';
    };

    window.viewExpenses = function () {
        let tbody = document.getElementById('expense-list');
        tbody.innerHTML = '';

        expenses.forEach(exp => {
            let tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${exp.date}</td>
                <td>${exp.category}</td>
                <td>${exp.amount.toFixed(2)}</td>
            `;
            tbody.appendChild(tr);
        });
    };

    window.monthlySummary = function () {
        let month = document.getElementById('month').value;
        if (!month) {
            alert("Select a month");
            return;
        }

        let total = expenses
            .filter(exp => exp.date.startsWith(month))
            .reduce((sum, exp) => sum + exp.amount, 0);

        document.getElementById('monthly-total').textContent =
            `Total for ${month}: ${total.toFixed(2)}`;
    };

    window.categorySummary = function () {
        let cat = document.getElementById('summary-category').value.trim();
        if (!cat) {
            alert("Enter category");
            return;
        }

        let total = expenses
            .filter(exp => exp.category.toLowerCase() === cat.toLowerCase())
            .reduce((sum, exp) => sum + exp.amount, 0);

        document.getElementById('category-total').textContent =
            `Total for ${cat}: ${total.toFixed(2)}`;
    };

    window.exportCSV = function () {
        if (expenses.length === 0) {
            alert("No expenses to export");
            return;
        }

        let csv = "Date,Category,Amount\n";
        expenses.forEach(e => {
            csv += `${e.date},${e.category},${e.amount}\n`;
        });

        let blob = new Blob([csv], { type: "text/csv" });
        let url = URL.createObjectURL(blob);

        let a = document.createElement("a");
        a.href = url;
        a.download = "expenses.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

});