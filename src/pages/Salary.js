import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import {
  Col,
  Row,
  Form,
  Button,
  ButtonGroup,
  InputGroup,
  Dropdown,
} from '@themesberg/react-bootstrap';

import { SalaryTable } from '../components/Tables';
import { ModalAddMasseSalary } from './components/Modals';

export default () => {
  const [showSalaryMasseModal, setshowSalaryMasseModal] = useState(false);
  return (
    <>
      <ModalAddMasseSalary
        showModal={showSalaryMasseModal}
        handleClose={() => setshowSalaryMasseModal(false)}
      />
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4'>
        <div className='d-block mb-4 mb-md-0'>
          <h4>Paiments Salaire</h4>
          <p className='mb-0'>La liste des paiements salaires.</p>
        </div>
        <div className='d-flex justify-content-between  flex-wrap flex-md-nowrap align-items-center'>
          <Button variant='primary' className='w-auto me-4'>
            Paiement individuel
          </Button>
          <Button
            variant='secondary'
            className='w-auto'
            onClick={() => setshowSalaryMasseModal(true)}
          >
            Paiement en masse
          </Button>
        </div>
      </div>

      <div className='table-settings mb-4'>
        <Row className='justify-content-between align-items-center'>
          <Col xs={8} md={6} lg={3} xl={4}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control type='text' placeholder='Rechercher' />
            </InputGroup>
          </Col>
          <Col xs={4} md={2} xl={1} className='ps-md-0 text-start'>
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle
                split
                as={Button}
                variant='link'
                className='text-dark m-0 p-0'
              >
                <span className='icon icon-sm icon-gray'>
                  <FontAwesomeIcon icon={faFilter} />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className='dropdown-menu-xs dropdown-menu-left'>
                <Dropdown.Item className='fw-bold text-dark'>
                  Afficher par
                </Dropdown.Item>
                <Dropdown.Item className='d-flex fw-bold'>
                  10
                  <span className='icon icon-small ms-auto'>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                </Dropdown.Item>
                <Dropdown.Item className='fw-bold'>20</Dropdown.Item>
                <Dropdown.Item className='fw-bold'>30</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>

      <SalaryTable />
    </>
  );
};
