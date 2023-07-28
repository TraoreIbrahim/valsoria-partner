import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';

import {
  Col,
  Row,
  Form,
  Card,
  Button,
  FormCheck,
  Container,
  InputGroup,
} from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from '../routes';
import BgImage from '../assets/img/illustrations/signin.svg';

export default () => {
  return (
    <main>
      <section className='d-flex align-items-center my-5 mt-lg-6 mb-lg-5'>
        <Container>
          <Row
            className='justify-content-center form-bg-image'
            style={{ backgroundImage: `url(${BgImage})` }}
          >
            <Col
              xs={12}
              className='d-flex align-items-center justify-content-center'
            >
              <div className='bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-450'>
                <div className='text-center text-md-center mb-4 mt-md-0'>
                  <h3 className='mb-0'>Connectez-vous</h3>
                </div>
                <Form className='mt-4'>
                  <Form.Group id='email' className='mb-4'>
                    <Form.Label>E-mail</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control
                        autoFocus
                        required
                        type='email'
                        placeholder='exemple@mail.com'
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id='password' className='mb-4'>
                      <Form.Label>Mot de passe</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type='password'
                          placeholder='Mot de passe'
                        />
                      </InputGroup>
                    </Form.Group>
                    <div className='d-flex justify-content-between align-items-center mb-4'>
                      <Form.Check type='checkbox'>
                        <FormCheck.Input id='defaultCheck5' className='me-2' />
                        <FormCheck.Label
                          htmlFor='defaultCheck5'
                          className='mb-0'
                        >
                          Se souvenir de moi
                        </FormCheck.Label>
                      </Form.Check>
                      <Card.Link className='small text-end'>
                        Mot de passe oublié ?
                      </Card.Link>
                    </div>
                  </Form.Group>
                  <Card.Link as={Link} to={Routes.DashboardOverview.path}>
                    <Button variant='primary' type='submit' className='w-100'>
                      Se connecter
                    </Button>
                  </Card.Link>
                </Form>

                {/* <div className='mt-3 mb-4 text-center'>
                  <span className='fw-normal'>or login with</span>
                </div>
                <div className='d-flex justify-content-center my-4'>
                  <Button
                    variant='outline-light'
                    className='btn-icon-only btn-pill text-facebook me-2'
                  >
                    <FontAwesomeIcon icon={faFacebookF} />
                  </Button>
                  <Button
                    variant='outline-light'
                    className='btn-icon-only btn-pill text-twitter me-2'
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </Button>
                  <Button
                    variant='outline-light'
                    className='btn-icon-only btn-pil text-dark'
                  >
                    <FontAwesomeIcon icon={faGithub} />
                  </Button>
                </div> */}
                {/* <div className='d-flex justify-content-center align-items-center mt-4'>
                  <span className='fw-normal'>
                    Pas inscrit ?
                    <Card.Link
                      as={Link}
                      to={Routes.Signup.path}
                      className='fw-bold'
                    >
                      {` Créer un compte `}
                    </Card.Link>
                  </span>
                </div> */}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
