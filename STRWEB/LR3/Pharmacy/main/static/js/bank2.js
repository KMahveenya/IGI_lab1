function Client2(lastName, firstName, middleName, accountNumber, depositAmount)
{
    this.lastName = lastName;
    this.firstName = firstName;
    this.middleName = middleName;
    this.accounts = [{ accountNumber, depositAmount }];
}

Client2.prototype.getFullName = function()
{
    return `${this.lastName} ${this.firstName} ${this.middleName}`;
};

Client2.prototype.getAccounts = function()
{
    return this.accounts;
};

Client2.prototype.addAccount = function(accountNumber, depositAmount)
{
    this.accounts.push({ accountNumber, depositAmount });
};

function BankClient2()
{
    this.clients = [];
}

BankClient2.prototype = Object.create(Client2.prototype);
BankClient2.prototype.constructor = BankClient2;

BankClient2.prototype.addClientFromForm = function()
{
    const error = document.getElementById('inputError2');
    const lastName = document.getElementById('lastName2').value;
    const firstName = document.getElementById('firstName2').value;
    const middleName = document.getElementById('middleName2').value;
    const accountNumber = document.getElementById('accountNumber2').value;
    const depositAmount = parseFloat(document.getElementById('depositAmount2').value);

    error.textContent = '';

    if (!lastName || !firstName || !middleName || !accountNumber || !depositAmount || depositAmount <= 0)
    {
        error.textContent = 'Перепроверьте введенные данные: ошибка!';
        return;
    }

    let existingClient = this.clients.find(client => client.getFullName() === `${lastName} ${firstName} ${middleName}`);

    if (existingClient)
    {
        existingClient.addAccount(accountNumber, depositAmount);
    }
    else
    {
        const newClient = new Client2(lastName, firstName, middleName, accountNumber, depositAmount);
        this.clients.push(newClient);
    }

    document.getElementById('clientForm2').reset();

    this.displayClients();
};

BankClient2.prototype.displayClients = function()
{
    const clientsList = document.getElementById('clientsList2');
    clientsList.innerHTML = '';

    this.clients.forEach(client => {
        let clientInfo = `<p><strong>${client.getFullName()}</strong></p>`;
        client.accounts.forEach(account => {
            clientInfo += `<p>Номер счета: ${account.accountNumber}, Вклад: ${account.depositAmount} BYN</p>`;
        });
        clientsList.innerHTML += clientInfo;
    });

    this.displayMultipleAccountsResult();
};

BankClient2.prototype.calculateTotalDeposits = function(client)
{
    return client.getAccounts().reduce((total, account) => total + account.depositAmount, 0);
};

BankClient2.prototype.displayMultipleAccountsResult = function()
{
    const resultDiv = document.getElementById('result2');
    resultDiv.innerHTML = '';

    this.clients.forEach(client => {
        if (client.accounts.length > 1) {
            const totalDeposits = this.calculateTotalDeposits(client);
            resultDiv.innerHTML += `<p>Клиент <strong>${client.getFullName()}</strong> имеет несколько счетов. Общая сумма вкладов: ${totalDeposits} BYN.</p>`;
        }
    });
};

const bankClient = new BankClient2();