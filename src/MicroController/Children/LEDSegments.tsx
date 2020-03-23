import { WebMicroSegment } from "src/Shared/MicroTypes"
import { WebEffect } from "src/Shared/MicroCommands"
import { Tab, Nav, Card } from "react-bootstrap"
import React from "react"
import { EffectTabContainer } from "./EffectsTab"
const segmentButtonStyle: React.CSSProperties = {
  width: '100%',
  margin: 0,
};

interface LEDSegmentsProps {
  totalLEDs: number;
  segments: WebMicroSegment[];
  setEffect: (index: number, effect: WebEffect) => void;
}
function LEDSegments(props: LEDSegmentsProps) {

  return(
  <Tab.Container defaultActiveKey="segment1Tab">
    <SegmentNav
      {...props}></SegmentNav>
    <hr></hr>
    <SegmentTabContent
      {...props}
    >
    </SegmentTabContent>
  </Tab.Container>
)}

function SegmentNav({segments, totalLEDs}: LEDSegmentsProps) {
  return (
    <Nav style={segmentButtonStyle} variant="tabs">
      {segments.map(({ numLEDs, offset }, index) => (
        <Nav.Item
          key={`segmentNav${index}`}
          style={segmentTabWidth(totalLEDs, numLEDs, index, offset)}>
          <Nav.Link
            className="h3 text-center"
            eventKey={`segment${index + 1}Tab`}>
              {`Segment ${index + 1}`}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  )
}
function segmentTabWidth(totalLEDs: number, segmentLEDs: number, index: number, offset: number): React.CSSProperties {
  return {
    marginLeft: `${index === 0 ? (offset / totalLEDs * 100) : 0}%`,
    width: `${(segmentLEDs / totalLEDs) * 100}%`,
  };
}
interface SegmentTabContentProps {
  segments: WebMicroSegment[];
  setEffect: (index: number, effect: WebEffect) => void;
}
function SegmentTabContent({setEffect,segments}: SegmentTabContentProps) {
  return (
  <Tab.Content>
    {segments.map((segment: WebMicroSegment, index: number) => {
      const props = {
        setEffect,
        index,
        ...segment,
      }
      return (
        <Tab.Pane key={`segmentPane${index}`} eventKey={`segment${index + 1}Tab`}>
          <Card>
            <Card.Header
              className="h3">
                Segment {index + 1} Settings
            </Card.Header>
            <Card.Body>
              <SegmentInfoCard
                {...segment}></SegmentInfoCard>
              <EffectTabContainer
                {...props}
              ></EffectTabContainer>
            </Card.Body>
          </Card>
        </Tab.Pane>
      )}
    )}
  </Tab.Content>
)}
function SegmentInfoCard({effect,numLEDs,offset}: WebMicroSegment) {
  return (
  <Card>
    <Card.Header className="h4">
      Segment Information
    </Card.Header>
    <Card.Body >
      <ul className="d-flex flex-row justify-content-around mb-0">
        <li className="h5">
          <span>Effect: </span>
          <span>{effect}</span>
        </li>
        <li className="h5">
          <span>LEDs: </span>
          <span>{numLEDs}</span>
        </li>
        <li className="h5">
          <span>Offset: </span>
          <span>{offset}</span>
        </li>
      </ul>
    </Card.Body>
  </Card>
)}
export default LEDSegments;