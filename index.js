class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    // Calculate the balance using the transaction objects.
    let balance = 0;
    for (let t of this.transactions) {
      balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    // Keep track of the time of the transaction
    if (!this.isAllowed()) {
      return false;
    }
    this.time = new Date();

    // Add the transaction to the account
    this.account.addTransaction(this);
    return true;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    // Note how it has access to this.account because of the parent
    return (this.account.balance - this.amount >= 0);
  }
}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("Victoria");

console.log('Starting Account Balance: ', myAccount.balance);
console.log("--------------------------------------")
console.log('Attempting to withdraw even $1 should fail...');
const t1 = new Withdrawal(1.00, myAccount);
console.log('Commit result:', t1.commit());
console.log('Account Balance: ', myAccount.balance);
console.log("--------------------------------------")
console.log('Depositing $9.99 should succeed...');
const t2 = new Deposit(9.99, myAccount);
console.log('Commit result:', t2.commit());
console.log('Account Balance: ', myAccount.balance);
console.log("--------------------------------------")
console.log('Withdrawal for 9.99 should be allowed...');
const t3 = new Withdrawal(9.99, myAccount);
console.log('Commit result:', t3.commit());
console.log("--------------------------------------")
console.log('Ending Account Balance: ', myAccount.balance);
console.log("Lookings like I'm broke again");
console.log("--------------------------------------")
console.log('Account Transaction History: ', myAccount.transactions);
