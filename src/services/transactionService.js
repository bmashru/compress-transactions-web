
const BASE_URL = 'http://localhost:8000'

export const getTransactions = () => {
    return fetch(`${BASE_URL}/transactions`).then(data => data.json());
}

export const addTransaction = (transaction) => {
    return fetch(`${BASE_URL}/transaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction)
    });
}

export const getCompressedTransactions = () => {
    return fetch(`${BASE_URL}/compressTransaction`).then(data => data.json());
}