import React from 'react';
import { Card } from "react-bootstrap";
import SegmentResizer, { SegmentResizerProps } from './SegmentResizer';
import SegmentSplitter, { SegmentSplitterProps } from './SegmentSplitter';
import { SliderItem } from 'react-compound-slider/dist/types/types';
import { WebEffect } from 'src/Shared/MicroCommands';
import { WebMicroSegment, SplitSegment, MergeSegments } from 'src/Shared/MicroTypes';

export interface SegmentEditorProps {
  domain: number[];
  totalLEDs: number;
  segmentBoundaries: number[];
  segments: WebMicroSegment[];
  handleIsActive: (handle: SliderItem) => boolean;
  updateSegments: (segmentBoundaries:readonly number[]) => void;
  splitSegment: SplitSegment;
  mergeSegments: MergeSegments;
}
function SegmentEditor(
  {domain, segmentBoundaries, updateSegments,
  totalLEDs, handleIsActive, segments,
  splitSegment, mergeSegments}: SegmentEditorProps
) {
  const segmentSplitterProps: SegmentSplitterProps = {
    totalLEDs,
    segments,
    splitSegment,
    mergeSegments
  }
  const segmentResizerProps: SegmentResizerProps = {
    domain,
    handleIsActive,
    segmentBoundaries,
    onUpdate: updateSegments
  }

  return (
    <Card>
      <Card.Header className="h3">Segment Editor</Card.Header>
      <Card.Body>
        <SegmentSplitter {...segmentSplitterProps}/>
        <SegmentResizer {...segmentResizerProps}/>
      </Card.Body>
  </Card>
)}
export default SegmentEditor;