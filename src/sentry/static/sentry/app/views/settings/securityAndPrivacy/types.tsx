import {Organization} from 'app/types';

export type SecurityAndPrivacyProps = {
  organization: Organization;
  params: {
    orgId: string;
    projectId: string;
  };
};
