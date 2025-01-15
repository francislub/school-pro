import { getServerUser } from '@/actions/auth';
import { UserRole } from '@/types/types';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';
import NotAuthorized from './not-authorized';

interface Props {
  children: ReactNode;
  allowedRoles: UserRole[];
}

export default function RoleBasedWrapper({ children, allowedRoles }: Props) {
  const [isAuthorized, setIsAuthorized] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    (async () => {
      const user = await getServerUser();
      if (!user) {
        redirect('/login');
        return;
      }

      const userRole = user.role;
      if (!allowedRoles.includes(userRole)) {
        setIsAuthorized(false);
      } else {
        setIsAuthorized(true);
      }
    })();
  }, [allowedRoles]);

  if (isAuthorized === null) {
    // You can replace this with a loading spinner or placeholder.
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return <NotAuthorized />;
  }

  return <>{children}</>;
}
