import React from 'react';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

export function GenerateTestCsvButton() {
  function generateTestData() {
    const data = [];
    const operators = ['orange_ci', 'moov_ci', 'mtn_ci', 'banque'];
    const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];

    for (let i = 0; i < 100; i++) {
      let operator = operators[Math.floor(Math.random() * operators.length)];
      const name = names[Math.floor(Math.random() * names.length)];
      const id = i + 1;
      const amount = Math.round(Math.random() * 10000) / 100;

      let accountNumber;
      if (operator === 'banque') {
        // Generate a RIB-like bank account number
        const country = 'CI';
        const checkDigits = String(Math.floor(Math.random() * 100)).padStart(
          2,
          '0'
        );
        const bankCode = String(Math.floor(Math.random() * 1e3)).padStart(
          3,
          '0'
        );
        const branchCode = String(Math.floor(Math.random() * 1e4)).padStart(
          5,
          '0'
        );
        const accountNumberTemp = String(
          Math.floor(Math.random() * 1e11)
        ).padStart(12, '0');
        const ribKey = String(Math.floor(Math.random() * 1e2)).padStart(2, '0');

        operator = `${country}${bankCode}`;
        accountNumber = `${country}${bankCode}${branchCode}${accountNumberTemp}${ribKey}`;
      } else {
        accountNumber = String(Math.floor(Math.random() * 1e9)).padStart(
          10,
          '0'
        ); // Generate a 10-digit account number for mobile operators
      }

      data.push({
        id,
        nom: name,
        numero_compte: accountNumber,
        operateur: operator,
        montant: amount,
      });
    }

    return Papa.unparse(data);
  }

  const downloadCsv = (e) => {
    e.preventDefault();
    const csvData = generateTestData();
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'data_test.csv');
  };

  return (
    <a
      href='#'
      size='sm'
      onClick={downloadCsv}
      style={{ color: 'black', cursor: 'pointer', textDecoration: 'underline' }}
    >
      Télécharger des données de test
    </a>
  );
}
