import React from 'react';
import { faCashRegister, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from '@themesberg/react-bootstrap';

import {
  CounterWidget,
  CircleChartWidget,
  BarChartWidget,
  SalesValueWidget,
  SalesValueWidgetPhone,
  AcquisitionWidget,
} from '../../components/Widgets';
import { trafficShares, totalOrders } from '../../data/charts';

export default () => {
  return (
    <>
      <Row className='justify-content-md-center'>
        <Col xs={12} className='mb-4 mt-4 d-none d-sm-block'>
          <SalesValueWidget
            title='Dépenses'
            value='569,000'
            percentage={10.57}
          />
        </Col>
        <Col xs={12} className='mb-4 mt-4 d-sm-none'>
          <SalesValueWidgetPhone
            title='Dépenses'
            value='10,567'
            percentage={10.57}
          />
        </Col>
        <Col xs={12} sm={6} xl={4} className='mb-4'>
          <CounterWidget
            category='Budget alloué'
            title='3,400,000 FCFA'
            period='Fev 1 - Avr 1'
            percentage={18.2}
            icon={faChartLine}
            iconColor='shape-secondary'
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className='mb-4'>
          <CounterWidget
            category='Budget dépensé'
            title='1,600,000 FCFA'
            period='Fev 1 - Avr 1'
            percentage={28.4}
            icon={faCashRegister}
            iconColor='shape-tertiary'
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className='mb-4'>
          <CircleChartWidget title='Dépenses par nature' data={trafficShares} />
        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={12} className='mb-4'>
          <Row>
            <Col xs={12} xl={8} className='mb-4'>
              <BarChartWidget
                title='Total commandes'
                value={452}
                percentage={18.2}
                data={totalOrders}
              />
            </Col>

            <Col xs={12} xl={4}>
              <Row>
                {/* <Col xs={12} className='mb-4'>
                  <BarChartWidget
                    title='Total orders'
                    value={452}
                    percentage={18.2}
                    data={totalOrders}
                  />
                </Col> */}

                {/* <Col xs={12} className='px-0 mb-4'>
                  <RankingWidget />
                </Col> */}

                <Col xs={12} className='px-0'>
                  <AcquisitionWidget />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
