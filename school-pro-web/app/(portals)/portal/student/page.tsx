
import RoleBasedWrapper from '@/components/RoleBasedWrapper';
import React from 'react'

export default function page() {
  return (
    <RoleBasedWrapper allowedRoles={["STUDENT"]}>
      <h2>Welcome Student</h2>
    </RoleBasedWrapper>
  );
}
