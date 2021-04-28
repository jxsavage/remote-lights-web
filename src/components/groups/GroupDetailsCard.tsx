import React from 'react';
import { useShallowRootSelector, andEmitAction, RootStateDispatch } from 'components/RootStateProvider';
import { useDispatch } from 'react-redux';
import { changeGroupControlsEffect } from 'Shared/store';
import { Card, Form } from 'react-bootstrap';
import { EffectTabContainer } from 'components/effects';
import { SegmentGroup, MicroEffect } from 'Shared/types';
import { SocketDestination } from 'Shared/socket';
import {
  RemoveSegmentFromGroupButton, AddSegmentToGroupButton, DeleteSegmentGroupButton,
} from './actions';

const { SERVER } = SocketDestination;
interface GroupDetailsCardProps {
  groupId: SegmentGroup['segmentGroupId'];
}
const GroupDetailsCard:
React.FunctionComponent<GroupDetailsCardProps> = (
  { groupId },
) => {
  const {
    group: {
      segmentGroupId, segmentIds, controlsEffect, groupEffect,
    },
    segmentsEntity,
  } = useShallowRootSelector((state) => {
    const grp = state.remoteLightsEntity.segmentGroups.byId[groupId];
    const segEntity = state.remoteLightsEntity.segments;
    const grpSegs = grp.segmentIds.map(
      (segmentId) => segEntity.byId[segmentId],
    );
    return { group: grp, grpSegs, segmentsEntity: segEntity };
  });
  const dispatch = useDispatch<RootStateDispatch>();
  function handleEffectCheckboxChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    dispatch(
      andEmitAction(
        changeGroupControlsEffect(
          { controlsEffect: event.target.checked, groupId },
        ),
        SERVER,
      ),
    );
  }
  return (
    <Card>
      <Card.Header className="h2">
        {`Group ${segmentGroupId}`}
      </Card.Header>
      <Card.Body>
        <Card>
          <Card.Header className="h3">
            Group Settings
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Check
                className="h4"
                type="switch"
                id="controlEffectSwitch"
                label="Control Effect"
                checked={controlsEffect}
                onChange={handleEffectCheckboxChange}
              />
            </Form>
            {controlsEffect ? (
              <Card>
                <Card.Header className="h4">
                  {`Group Effect: ${groupEffect ? MicroEffect[groupEffect] : 'Not Set'}`}
                </Card.Header>
                <Card.Body>
                  <EffectTabContainer
                    variant="group"
                    id={groupId}
                    // setEffectElementFactory={setGroupEffectButtonFactory}
                  />
                </Card.Body>
              </Card>
            ) : (
              <Card>
                <Card.Header className="h4">
                  Group Not Currently Controlling Effect...
                </Card.Header>
              </Card>
            )}
          </Card.Body>
        </Card>
        <Card>
          <Card.Header className="h3">
            Segments in Group:
          </Card.Header>
          <Card.Body>
            {segmentIds.map((segmentId) => (
              <RemoveSegmentFromGroupButton
                key={segmentId}
                {...{ groupId, segmentId }}
              />
            ))}
          </Card.Body>
        </Card>
        <Card>
          <Card.Header className="h3">
            Segments:
          </Card.Header>
          <Card.Body>
            {segmentsEntity.allIds.map((segmentId) => {
              const otherSegments: JSX.Element[] = [];
              if (!segmentIds.includes(segmentId)) {
                otherSegments.push((
                  <AddSegmentToGroupButton
                    key={segmentId}
                    {...{ groupId, segmentId }}
                  />
                ));
              }
              return otherSegments;
            })}
          </Card.Body>
        </Card>
      </Card.Body>
      <Card.Footer>
        <DeleteSegmentGroupButton
          groupId={groupId}
        />
      </Card.Footer>
    </Card>
  );
};

export default GroupDetailsCard;
