import { log } from "node:console";
import fs from "node:fs";
import { readFile } from "node:fs/promises";

// Primjer asinkronosti
console.log("Prvi");

setTimeout(() => {
    console.log("Drugi");
}, 3000);

console.log("Treći");

// Primjer asinkronog čitanja datoteke 1 - callback princip
fs.readFile("expenses.json", "utf-8", (error, text) => {
    if (error) {
        console.error(`(1) Čitanje nije uspjelo: ${error.message}`);
        return;
    }
    console.log(`(1) Čitanje uspjelo, pročitano je ${text.length} znakova.`);
});

// Primjer asinkronog čitanja datoteke 2 - promise princip
const promise = readFile("expenses.json", "utf-8");
console.log(promise);
promise
    .then((text) =>
        console.log(`(2) Čitanje uspjelo, pročitano je ${text.length} znakova.`),
    )
    .catch((error) =>
        console.error(`(2) Čitanje nije uspjelo: ${error.message}`),
    );

// Postoji i treći princip koristeći naredbe async-await ( taj ćemo i koristiti )
