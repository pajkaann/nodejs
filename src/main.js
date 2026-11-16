import formatExpense, { currency } from "./format.js";
import { loadExpenses, saveExpenses } from "./storage.js";

const APP_NAME = "Troškovnik";
console.log(`== ${APP_NAME} ==`);

/*
const args = process.argv.slice(2);
// console.log("Argumenti", args);
const command = args[0];
const arg1 = args[1];
const arg2 = args[2];
*/
const [command, arg1, arg2] = process.argv.slice(2); // npr. ["add", "Kruh", "3.2"]
// console.log("Naredba i argumenti", command, arg1, arg2);

let expenses;
try {
    expenses = await loadExpenses();
} catch (error) {
    console.error(`Datoteka expenses.json nije ispravna: ${error.message}`);
    process.exit(1);
}
// console.log("Trenutni troškovi", expenses);

switch (command) {
    case "add":
        const amounts = Number(arg2);
        if (arg1 === undefined || Number.isNaN(amounts)) {
            console.error('Korištenje: add "opis" iznos');
            process.exit(1);
        }
        let newId = 1;
        if (expenses.length > 0) {
            newId = expenses[expenses.length - 1].id + 1;
        }
        expenses.push({ id: newId, description: arg1, amount: amounts });
        await saveExpenses(expenses); // spremamo troškove
        console.log(`Dodano: ${arg1} (broj ${newId})`);
        break;

    case "list":
        if (expenses.length === 0) {
            console.log("Nema troškova.");
        } else {
            /*
                  for (let i = 0; i < expenses.length; i++) {
                      const expense = expenses[i];
                      console.log(`${expense.id}. ${expense.description}: ${expense.amount}`);
                  }
                  */
            expenses.forEach((expense) => console.log(formatExpense(expense)));
        }
        break;

    case "total":
        const amount = expenses.map((expense) => expense.amount);

        let total = 0;
        for (const expense of amount) {
            total = total + value;
        }
        console.log(`Ukupno: ${total} ${currency}`);
        break;

    case "remove":
        const id = Number(arg1);
        if (Number.isNaN(id)) {
            console.error("Korištenje: remove broj");
            process.exit(1);
        }

        let deleted = false;
        const kept = expenses.filter((expense) => {
            if (expense.id !== id) {
                return true;
            } else {
                deleted = true;
                return false;
            }
        });

        if (deleted) {
            await saveExpenses(kept);
            console.log(`Obrisan je trošak broj ${id}.`);
        } else {
            console.log(`Trošak broj ${id} nije obrisan jer ne postoji.`);
        }
        break;

    default:
        console.error("Nepoznata naredba. Koristi: add, list ili total.");
        process.exit(1);
}
