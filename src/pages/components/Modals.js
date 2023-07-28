import React, { useState } from 'react';
import {
  Row,
  Col,
  Card,
  Modal,
  Button,
  Container,
  Form,
  InputGroup,
  ButtonGroup,
  Alert,
} from '@themesberg/react-bootstrap';

import Documentation from '../../components/Documentation';
import { BulkUploadForm } from './BulkUploadForm';
import Avatar from 'react-avatar';
import om from '../../assets/img/brand/om.png';
import moov from '../../assets/img/brand/moov.png';
import momo from '../../assets/img/brand/momo.jpg';

export default () => {
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);

  return (
    <article>
      <Container className='px-0'>
        <Row className='d-flex flex-wrap flex-md-nowrap align-items-center py-4'>
          <Col className='d-block mb-4 mb-md-0'>
            <h1 className='h2'>Modals</h1>
            <p className='mb-0'>
              Use modals to develop faster and more interactive user interfaces.
            </p>
          </Col>
        </Row>

        <Row>
          <Col xs={12} className='mb-4'>
            <Documentation
              title='Example'
              description={
                <>
                  <p>
                    The <code>&#x3C;Modal&#x3E;</code> component can be used as
                    a way to show extra content on top of the existing UI based
                    on an event. For example, you can use the{' '}
                    <code>onClick</code> event from a button component to show a
                    modal by using the <code>setShowDefault(true)</code>{' '}
                    function.
                  </p>
                  <p>
                    Additionally, you can use the <code>handleClose</code> event
                    to handle the situation when the modal is being closed.
                  </p>
                </>
              }
              scope={{
                Col,
                Card,
                Button,
                Modal,
                showDefault,
                setShowDefault,
                handleClose,
                useState,
              }}
              imports={`import React, { useState } from "react";
import { Button, Modal } from '@themesberg/react-bootstrap';

const [showDefault, setShowDefault] = useState(false);
const handleClose = () => setShowDefault(false);`}
              example={`<React.Fragment>
  <Button variant="primary" className="my-3" onClick={() => setShowDefault(true)}>Default</Button>

  <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
    <Modal.Header>
      <Modal.Title className="h6">Terms of Service</Modal.Title>
      <Button variant="close" aria-label="Close" onClick={handleClose} />
    </Modal.Header>
    <Modal.Body>
      <p>With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.</p>
      <p>The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        I Got It
    </Button>
      <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
        Close
    </Button>
    </Modal.Footer>
  </Modal>
</React.Fragment>`}
            />
          </Col>
        </Row>
      </Container>
    </article>
  );
};

export const ModalAddMasseSalary = ({ handleClose, showModal }) => {
  return (
    <Modal show={showModal} onHide={handleClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Paiement en masse</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <BulkUploadForm onSuccess={handleClose} />
      </Modal.Body>
    </Modal>
  );
};

export const ModalRechargement = ({
  showRechargeModal,
  closeRechargeModal,
}) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [mobileMoneyOperator, setMobileMoneyOperator] = useState('');
  const [mobileMoneyAccountNumber, setMobileMoneyAccountNumber] = useState('');
  const [bankTransferReference, setBankTransferReference] = useState('');
  const [bankTransferReceipt, setBankTransferReceipt] = useState('');
  const [formError, setFormError] = useState(false);

  return (
    <Modal show={showRechargeModal} onHide={closeRechargeModal}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          closeRechargeModal();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Recharger mon compte</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId='rechargeAmount'>
            <Form.Label>Montant à recharger</Form.Label>
            <InputGroup>
              <div className='input-group-prepend'>
                <span className='input-group-text'>XOF</span>
              </div>
              <Form.Control
                type='number'
                placeholder='Entrer le montant de la recharge'
                {...{
                  required: 'Le montant de la recharge est requis',
                  min: {
                    value: 10000,
                    message: 'Le montant doit être supérieur à 10 000 F',
                  },
                }}
              />
            </InputGroup>
            {/* {errors.rechargeAmount && <p>{errors.rechargeAmount.message}</p>} */}
          </Form.Group>

          <Form.Group controlId='paymentMethod'>
            <Form.Label>Méthode de paiement</Form.Label>
            <Form.Control
              as='select'
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value='cash'>Espèces</option>
              <option value='mobile_money'>Mobile Money</option>
              <option value='bank_transfer'>Virement bancaire</option>
            </Form.Control>
          </Form.Group>

          {paymentMethod === 'mobile_money' && (
            <>
              <Form.Group controlId='mobileMoneyOperator'>
                <Form.Label>Opérateur Mobile Money</Form.Label>
                <ButtonGroup>
                  <Button
                    variant={
                      mobileMoneyOperator === 'Orange'
                        ? 'primary'
                        : 'outline-primary'
                    }
                    onClick={() => setMobileMoneyOperator('Orange')}
                  >
                    <Avatar src={om} size='30' round={true} /> Orange
                  </Button>
                  <Button
                    variant={
                      mobileMoneyOperator === 'MTN'
                        ? 'primary'
                        : 'outline-primary'
                    }
                    onClick={() => setMobileMoneyOperator('MTN')}
                  >
                    <Avatar src={momo} size='30' round={true} /> MTN
                  </Button>
                  <Button
                    variant={
                      mobileMoneyOperator === 'Moov'
                        ? 'primary'
                        : 'outline-primary'
                    }
                    onClick={() => setMobileMoneyOperator('Moov')}
                  >
                    <Avatar src={moov} size='30' round={true} /> Moov
                  </Button>
                </ButtonGroup>
              </Form.Group>

              <Form.Group controlId='mobileMoneyAccountNumber'>
                <Form.Label>Numéro de compte Mobile Money</Form.Label>
                <Form.Control
                  type='text'
                  value={mobileMoneyAccountNumber}
                  onChange={(e) => setMobileMoneyAccountNumber(e.target.value)}
                />
              </Form.Group>
            </>
          )}

          {paymentMethod === 'bank_transfer' && (
            <>
              <Form.Group controlId='bankTransferReference'>
                <Form.Label>Référence du virement</Form.Label>
                <Form.Control
                  type='text'
                  value={bankTransferReference}
                  onChange={(e) => setBankTransferReference(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='bankTransferReceipt'>
                <Form.Label>Reçu de virement (image ou PDF)</Form.Label>
                <Form.Control
                  type='file'
                  onChange={(e) => setBankTransferReceipt(e.target.files[0])}
                />
              </Form.Group>
            </>
          )}

          {formError && <Alert variant='danger'>{formError}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeRechargeModal}>
            Fermer
          </Button>
          {/* <Button variant="primary" onClick={handleConfirmRecharge}>
        Confirmer le rechargement
      </Button> */}
          <Button variant='primary' type='submit'>
            Confirmer le rechargement
          </Button>
        </Modal.Footer>
      </Form>
         
    </Modal>
  );
};
