import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const addForm = document.getElementById('addTaxPayerForm');
    const searchForm = document.getElementById('searchTaxPayerForm');
    const searchResult = document.getElementById('searchResult');
    const taxPayerList = document.getElementById('taxPayerList');

    addForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const tid = document.getElementById('tid').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const address = document.getElementById('address').value;

        await backend.addTaxPayer(tid, firstName, lastName, address);
        addForm.reset();
        await updateTaxPayerList();
    });

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const searchTid = document.getElementById('searchTid').value;
        const result = await backend.searchTaxPayer(searchTid);
        
        if (result.length > 0) {
            const taxPayer = result[0];
            searchResult.innerHTML = `
                <h3>Search Result:</h3>
                <p>TID: ${taxPayer.tid}</p>
                <p>Name: ${taxPayer.firstName} ${taxPayer.lastName}</p>
                <p>Address: ${taxPayer.address}</p>
            `;
        } else {
            searchResult.innerHTML = '<p>No TaxPayer found with that TID.</p>';
        }
    });

    async function updateTaxPayerList() {
        const taxPayers = await backend.getAllTaxPayers();
        taxPayerList.innerHTML = '<h3>All TaxPayers:</h3>';
        taxPayers.forEach(taxPayer => {
            const taxPayerElement = document.createElement('div');
            taxPayerElement.className = 'taxpayer-item';
            taxPayerElement.innerHTML = `
                <p>TID: ${taxPayer.tid}</p>
                <p>Name: ${taxPayer.firstName} ${taxPayer.lastName}</p>
                <p>Address: ${taxPayer.address}</p>
            `;
            taxPayerList.appendChild(taxPayerElement);
        });
    }

    await updateTaxPayerList();
});
