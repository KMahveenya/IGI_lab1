class Client
{
    constructor(lastName, firstName, middleName, accountNumber, depositAmount)
    {
        this.lastName = lastName;
        this.firstName = firstName;
        this.middleName = middleName;
        this.accounts = [{ accountNumber, depositAmount }];
    }

    getFullName()
    {
        return `${this.lastName} ${this.firstName} ${this.middleName}`;
    }

    getAccounts()
    {
        return this.accounts;
    }

    addAccount(accountNumber, depositAmount)
    {
        this.accounts.push({ accountNumber, depositAmount });
    }
}

class BankClient extends Client
{
    constructor(lastName, firstName, middleName, accountNumber, depositAmount)
    {
        super(lastName, firstName, middleName, accountNumber, depositAmount);
    }

    getTotalDeposits()
    {
        return this.accounts.reduce((total, account) => total + account.depositAmount, 0);
    }

    static addClientFromForm()
    {
        const error = document.getElementById('inputError');
        const lastName = document.getElementById('lastName').value;
        const firstName = document.getElementById('firstName').value;
        const middleName = document.getElementById('middleName').value;
        const accountNumber = document.getElementById('accountNumber').value;
        const depositAmount = parseFloat(document.getElementById('depositAmount').value);
        
        error.textContent = '';

        if (!lastName || !firstName || !middleName || !accountNumber || !depositAmount || depositAmount <= 0)
        {
            error.textContent = 'Перепроверьте введенные данные: ошибка!';
            return;
        }

        let existingClient = clients.find(client => client.getFullName() === `${lastName} ${firstName} ${middleName}`);

        if (existingClient)
        {
            existingClient.addAccount(accountNumber, depositAmount);
        }
        else 
        {
            const newClient = new BankClient(lastName, firstName, middleName, accountNumber, depositAmount);
            clients.push(newClient);
        }

        document.getElementById('clientForm').reset();

        BankClient.displayClients();
    }

    static displayClients()
    {
        const clientsList = document.getElementById('clientsList');
        clientsList.innerHTML = '';

        clients.forEach(client => {
            let clientInfo = `<p><strong>${client.getFullName()}</strong></p>`;
            client.accounts.forEach(account => {
                clientInfo += `<p>Номер счета: ${account.accountNumber}, Вклад: ${account.depositAmount} BYN</p>`;
            });
            clientsList.innerHTML += clientInfo;
        });

        BankClient.displayMultipleAccountsResult();
    }

    static displayMultipleAccountsResult()
    {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '';

        clients.forEach(client => {
            if (client.accounts.length > 1)
            {
                const totalDeposits = client.getTotalDeposits();
                resultDiv.innerHTML += `<p>Клиент <strong>${client.getFullName()}</strong> имеет несколько счетов. Общая сумма вкладов: ${totalDeposits} BYN.</p>`;
            }
        });
    }
}

const clients = [];