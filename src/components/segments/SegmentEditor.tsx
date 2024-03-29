import React from 'react';
import { Card } from 'react-bootstrap';
import { MicroState } from 'Shared/types';
import SegmentResizer from './SegmentResizer';
import SegmentActionsButtonGroup from './SegmentActionsButtonGroup';

interface SegmentEditorProps {
  micro: MicroState;
}
const SegmentEditor: React.FunctionComponent<SegmentEditorProps> = ({ micro }) => {
  const {
    microId, totalLEDs, segmentIds,
  } = micro;
  return (
    <Card className="mb-3 border border-light rounded">
      <Card.Header className="h3">Segment Editor</Card.Header>
      <Card.Body>
        <SegmentActionsButtonGroup {...{
          microId, totalLEDs, segmentIds,
        }}
        />
        <SegmentResizer {...{ micro }} />
      </Card.Body>
    </Card>
  );
};
export default SegmentEditor;
