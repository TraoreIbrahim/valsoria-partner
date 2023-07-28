// import axios from 'axios';
import Papa from 'papaparse';
import {
  OverlayTrigger,
  Tooltip,
  Card,
  Button,
  Row,
  Col,
  Form,
} from '@themesberg/react-bootstrap';
import DataTable from 'react-data-table-component';
import { GenerateTestCsvButton } from './GenerateTestCsvButton';
import React from 'react';

export function BulkUploadForm({ onSuccess }) {
  const [file, setFile] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [dataPreview, setDataPreview] = React.useState(null);

  const [summary, setSummary] = React.useState({
    invalidAccounts: 0,
    invalidAmounts: 0,
    totalAccounts: 0,
    totalAmounts: 0,
    operatorStats: [{ count: 0, amount: 0 }],
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    Papa.parse(e.target.files[0], {
      header: true,
      complete: function (results) {
        const dataWithValidation = validateData(results.data);

        const invalidAccounts = dataWithValidation.filter(
          (row) => row.validation === 'Invalide'
        ).length;
        const invalidAmounts = dataWithValidation.reduce(
          (total, row) =>
            total +
            (row.validation === 'Invalide' ? parseFloat(row.montant) : 0),
          0
        );

        const totalAccounts = dataWithValidation.filter(
          (row) => row.validation === 'Valide'
        ).length;
        const totalAmounts = dataWithValidation.reduce(
          (total, row) =>
            total + (row.validation === 'Valide' ? parseFloat(row.montant) : 0),
          0
        );
        const operatorStats = dataWithValidation.reduce((stats, row) => {
          if (row.validation === 'Valide') {
            if (!stats[row.operateur]) {
              stats[row.operateur] = { count: 0, amount: 0 };
            }
            stats[row.operateur].count += 1;
            stats[row.operateur].amount += parseFloat(row.montant);
          }
          return stats;
        }, {});

        setSummary({
          invalidAccounts,
          invalidAmounts,
          totalAccounts,
          totalAmounts,
          operatorStats,
        });
        setDataPreview(dataWithValidation);
      },
    });
  };

  //   function validateRow(row) {
  //     const requiredColumns = [
  //       'id',
  //       'nom',
  //       'numero_compte',
  //       'operateur',
  //       'montant',
  //     ];
  //     const missingColumns = requiredColumns.filter(
  //       (col) => !row.hasOwnProperty(col) || !row[col]
  //     );

  //     if (missingColumns.length > 0) {
  //       return 'Incomplet';
  //     }

  //     if (row.numero_compte.length === 10) {
  //       if (
  //         !/^\d+$/.test(row.numero_compte) ||
  //         !['orange_ci', 'moov_ci', 'mtn_ci'].includes(row.operateur)
  //       ) {
  //         return 'Invalide';
  //       }
  //     } else if (row.numero_compte.length === 24) {
  //       const bankCode = row.numero_compte.slice(0, 5);
  //       if (row.operateur !== bankCode) {
  //         return 'Invalide';
  //       }
  //     } else {
  //       return 'Invalide';
  //     }

  //     if (!isFinite(row.montant) || row.montant <= 0) {
  //       return 'Invalide';
  //     }

  //     return 'Valide';
  //   }

  const validateData = (data) => {
    return data.map((row) => {
      const errors = [];

      if (
        !row.id ||
        !row.nom ||
        !row.numero_compte ||
        !row.operateur ||
        !row.montant
      ) {
        errors.push('Certaines colonnes essentielles sont manquantes.');
      }

      const validOperators = ['orange_ci', 'moov_ci', 'mtn_ci'];
      if (row.numero_compte.length === 10 && isNaN(row.numero_compte)) {
        errors.push(
          'Le numero_compte doit être numérique pour les numéros de 10 positions.'
        );
      } else if (
        row.numero_compte.length === 10 &&
        !validOperators.includes(row.operateur)
      ) {
        errors.push(
          "L'opérateur n'est pas valide pour les numéros de 10 positions."
        );
      }

      if (row.numero_compte.length !== 10 && row.numero_compte.length !== 24) {
        errors.push('Le format du numero_compte est invalide.');
      } else if (
        row.numero_compte.length === 24 &&
        row.numero_compte.substring(0, 5) !== row.operateur
      ) {
        errors.push(
          "L'opérateur n'est pas valide pour les numéros de 24 positions."
        );
      }

      if (isNaN(row.montant) || Number(row.montant) <= 0) {
        errors.push('Le montant est invalide.');
      }

      return {
        ...row,
        validation: errors.length === 0 ? 'Valide' : 'Invalide',
        validationReason: errors.join(' '),
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!file) return;

    // // Utilisation de FormData pour préparer les données pour la requête de téléchargement de fichier
    // const formData = new FormData();
    // formData.append('file', file);

    // setIsLoading(true);

    // try {
    //   await axios.post('/api/upload', formData); // Remplacez par l'URL de votre API
    //   onSuccess(); // Fermez le modal et actualisez les données du tableau après un téléchargement réussi
    // } catch (err) {
    //   console.error(err);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  // Définition des colonnes pour le tableau de données
  const columns =
    dataPreview && dataPreview.length > 0
      ? [
          ...Object.keys(dataPreview[0])
            .filter((key) => key !== 'validation' && key !== 'validationReason')
            .map((key) => ({
              name: key.toUpperCase(),
              selector: key,
              style: {
                //   backgroundColor: 'aliceblue',
                fontWeight: 700,
              },
            })),
          {
            name: 'VALIDATION',
            selector: 'validation',
            cell: (row) => (
              <OverlayTrigger
                overlay={
                  <Tooltip id={`tooltip-${row.id}`}>
                    {row.validation === 'Valide'
                      ? 'La ligne est valide'
                      : `La ligne est invalide : ${row.validationReason}`}
                  </Tooltip>
                }
              >
                <span
                  style={{
                    color: row.validation === 'Valide' ? 'green' : 'red',
                  }}
                >
                  {row.validation}
                </span>
              </OverlayTrigger>
            ),
          },
        ]
      : [];

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Row>
          <Col>
            <Form.Label>Chargement du fichier CSV</Form.Label>
          </Col>
          <Col>
            <GenerateTestCsvButton />
          </Col>
        </Row>

        <Form.Control
          id='file-upload'
          type='file'
          accept='.csv'
          onChange={handleFileChange}
        />
      </Form.Group>

      {dataPreview && (
        <>
          {summary && (
            <>
              <Row>
                <Col xs={6}>
                  <Card className='mb-2 h-100' style={{ fontSize: '0.8rem' }}>
                    <Card.Body>
                      <Card.Title>Comptes Valides</Card.Title>
                      <Card.Text>
                        Nombre: {summary.totalAccounts} <br />
                        Montant total: {summary.totalAmounts.toFixed(2)}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={6}>
                  <Card className='mb-2 h-100' style={{ fontSize: '0.8rem' }}>
                    <Card.Body>
                      <Card.Title>Comptes Invalides</Card.Title>
                      <Card.Text>
                        Nombre: {summary.invalidAccounts} <br />
                        Montant total: {summary.invalidAmounts}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              {/* <div style={{ maxWidth: '100%', overflowX: 'auto', display: 'flex', flexDirection: 'row' }}>
                    {Object.entries(summary.operatorStats).map(([operator, stats]) => (
                        <div style={{ flex: '0 0 auto' }} key={operator}>
                            <Card className="mb-4 h-100" style={{fontSize: '0.8rem'}}>
                                <Card.Body>
                                    <Card.Title>{operator}</Card.Title>
                                    <Card.Text>
                                        Comptes: {stats.count} <br/>
                                        Montant total: {stats.amount}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div> */}
            </>
          )}

          <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
            <DataTable
              title='Aperçu des données'
              columns={columns}
              data={dataPreview}
              conditionalRowStyles={[
                {
                  when: (row, rowIndex) => rowIndex % 2 === 0,
                  style: {
                    backgroundColor: 'aliceblue',
                  },
                },
              ]}
              theme='solarized'
            />
            <p>Confirmez-vous ces données ?</p>
          </div>
        </>
      )}
      <br />
      <Button variant='primary' type='submit' disabled={!file || isLoading}>
        {isLoading ? 'Chargement...' : 'Charger'}
      </Button>
    </Form>
  );
}
