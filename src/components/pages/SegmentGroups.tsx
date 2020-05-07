import React from 'react';
import { useShallowRootSelector } from 'components/RootStateProvider';
import { CreateSegmentGroupButton, GroupDetailsCard } from 'components/groups';
import Card from 'react-bootstrap/Card';

const SegmentGroupsPage:
React.FunctionComponent = () => {
  const allSegmentGroupIds = useShallowRootSelector(
    (state) => state.remoteLightsEntity.segmentGroups.allIds,
  );
  return (
    <Card>
      <Card.Header className="h1">Groups</Card.Header>
      <Card.Body>
        {(allSegmentGroupIds.length > 0) ? allSegmentGroupIds.map((groupId) => (
          <GroupDetailsCard
            key={groupId}
            groupId={groupId}
          />
        )) : (
          <Card>
            <Card.Header className="h2 text-center">
              No Groups Yet...
            </Card.Header>
          </Card>
        )}
      </Card.Body>
      <Card.Footer>
        <CreateSegmentGroupButton />
      </Card.Footer>
    </Card>
  );
};

export default SegmentGroupsPage;
