const accounts = [
	{ id: 1, owner: "Alice", balance: 500 }, // Sample account
	{ id: 2, owner: "Bob", balance: 300 }  // Sample account
];

function getAccountById(id) {
	if (!Number.isInteger(id) || id <= 0) { // Validate ID is a positive integer
		throw new Error("Invalid account ID");
	}
	for (let i = 0; i < accounts.length; i++) { // Loop through accounts
		if (accounts[i].id === id) {
			return accounts[i]; // Return matching account
		}
	}
	throw new Error("Account not found"); // Error if no account found
}

function createAccount(newAccountId, newAccountOwner) {
	if (!Number.isInteger(newAccountId) || newAccountId <= 0) { // Validate ID
		throw new Error("Invalid account ID: Must be a positive integer");
	}
	if (typeof newAccountOwner !== "string" || newAccountOwner.trim() === "") { // Validate name
		throw new Error("Invalid owner name: Must be a non-empty string");
	}
	for (let i = 0; i < accounts.length; i++) { // Check for duplicate ID
		if (accounts[i].id === newAccountId) {
			throw new Error("Account ID already exists");
		}
	}
	accounts.push({ id: newAccountId, owner: newAccountOwner, balance: 0 }); // Create new account
}

function depositMoney(accountId, amount) {
	const account = getAccountById(accountId); // Get account
	if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) { // Validate deposit amount
		throw new Error("Invalid deposit amount: Must be a positive finite number");
	}
	account.balance += amount; // Add funds to balance
}

function withdrawMoney(accountId, amount) {
	const account = getAccountById(accountId); // Get account
	if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) { // Validate withdrawal amount
		throw new Error("Invalid withdrawal amount: Must be a positive finite number");
	}
	if (amount > account.balance) { // Ensure sufficient funds
		throw new Error("Insufficient funds");
	}
	account.balance -= amount; // Deduct funds from balance
}

function transferMoney(fromAccountId, toAccountId, amount) {
	const fromAccount = getAccountById(fromAccountId); // Get sender account
	const toAccount = getAccountById(toAccountId); // Get recipient account

	if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) { // Validate transfer amount
		throw new Error("Invalid transfer amount: Must be a positive finite number");
	}
	if (amount > fromAccount.balance) { // Ensure sender has enough funds
		throw new Error("Insufficient funds for transfer");
	}
	fromAccount.balance -= amount; // Deduct from sender
	toAccount.balance += amount; // Add to recipient
}