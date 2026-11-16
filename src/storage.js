// import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const FILE = join(process.cwd(), "expenses.json");

export function loadExpenses() {
    /*
      if (!existsSync(FILE)) {
          return [];
      }
  
      const text = readFileSync(FILE, "utf-8");
      return JSON.parse(text); // deserijalizacija ili parsiranje teksta u "kod"
      */
    try {
        const text = readFile(FILE, "utf-8");
        return JSON.parse(text);
    } catch (error) {
        if (error.code === "ENOENT") {
            return [];
        }
        throw error;
    }
}

export function saveExpenses(expenses) {
    //writeFileSync(FILE, JSON.stringify(expenses, null, 2)); // spremanje, tj. serijalizacija "koda" u tekst
    await writeFile(FILE, JSON.stringify(expenses, null, 2));
}
