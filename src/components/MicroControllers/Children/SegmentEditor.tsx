import React from 'react';
import { Card } from 'react-bootstrap';
import { WebMicroInfo } from 'Shared/MicroTypes';
import SegmentSplitter from './SegmentSplitter';
import SegmentResizer from './SegmentResizer';

interface SegmentEditorProps {
  micro: WebMicroInfo;
}
const SegmentEditor: React.FunctionComponent<SegmentEditorProps> = ({ micro }) => {
  const {
    id, totalLEDs, segments,
  } = micro;
  const microId = id;
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
