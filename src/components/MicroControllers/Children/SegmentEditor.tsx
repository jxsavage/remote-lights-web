import React from 'react';
import { Card } from 'react-bootstrap';
import { MicroState } from 'Shared/MicroTypes';
import SegmentSplitter from './SegmentSplitter';
import SegmentResizer from './SegmentResizer';

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
        <SegmentSplitter {...{
          microId, totalLEDs, segments,
        }}
        />
        <SegmentResizer {...{ micro }} />
      </Card.Body>
    </Card>
  );
};
export default SegmentEditor;
