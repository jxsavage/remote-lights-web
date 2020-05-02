import React from 'react';
import { Card } from 'react-bootstrap';
import { MicroState } from 'Shared/store';
import SegmentResizer from './Resizer';
import SegmentActionsButtonGroup from './Actions';

interface SegmentEditorProps {
  micro: MicroState;
}
const SegmentEditor: React.FunctionComponent<SegmentEditorProps> = ({ micro }) => {
  const {
    microId, totalLEDs, segments,
  } = micro;
  return (
    <Card>
      <Card.Header className="h3">Segment Editor</Card.Header>
      <Card.Body>
        <SegmentActionsButtonGroup {...{
          microId, totalLEDs, segments,
        }}
        />
        <SegmentResizer {...{ micro }} />
      </Card.Body>
    </Card>
  );
};
export default SegmentEditor;
