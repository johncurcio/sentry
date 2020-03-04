import React from 'react';

import Feature from 'app/components/acl/feature';
import FeatureDisabled from 'app/components/acl/featureDisabled';
import {PanelAlert} from 'app/components/panels';
import {t} from 'app/locale';

import SecurityAndPrivacyContent from './securityAndPrivacyContent';
import {SecurityAndPrivacyProps} from './types';

const SecurityAndPrivacy = ({params, organization}: SecurityAndPrivacyProps) => (
  <Feature
    features={['datascrubbers-v2']}
    organization={organization}
    renderDisabled={() => (
      <FeatureDisabled
        alert={PanelAlert}
        features={organization.features}
        featureName={t('Security And Privacy - new')}
      />
    )}
  >
    <SecurityAndPrivacyContent params={params} organization={organization} />
  </Feature>
);

export default SecurityAndPrivacy;
