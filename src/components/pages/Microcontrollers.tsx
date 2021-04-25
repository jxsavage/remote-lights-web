import React from 'react';
import { useShallowRootSelector } from 'components/RootStateProvider';
import { MicroController } from 'components/microcontrollers';
import { Card } from 'react-bootstrap';

const MicrocontrollersPage:
React.FunctionComponent = () => {
  const allMicroIds = useShallowRootSelector((state) => state.remoteLightsEntity.micros.allIds);
  return (
    <Card>
      <Card.Header className="h1">Microcontrollers</Card.Header>
      <Card.Body className="bg-light">
        {allMicroIds.map((microId) => (
          <MicroController
            key={microId}
            microId={microId}
          />
        ))}
      </Card.Body>
    </Card>
  );
};
export default MicrocontrollersPage;
