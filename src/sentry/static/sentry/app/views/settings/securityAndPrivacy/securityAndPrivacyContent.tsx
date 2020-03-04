import React from 'react';
import PropTypes from 'prop-types';

import {t} from 'app/locale';
import SettingsPageHeader from 'app/views/settings/components/settingsPageHeader';
import JsonForm from 'app/views/settings/components/forms/jsonForm';
import Form from 'app/views/settings/components/forms/form';
import AsyncView from 'app/views/asyncView';
import {GetEndPointsOutput} from 'app/components/asyncComponent';
import ProjectActions from 'app/actions/projectActions';

import {SecurityAndPrivacyProps} from './types';
import securityAndPrivacyForms from './securityAndPrivacyForms';

class SecurityAndPrivacyContent extends AsyncView<SecurityAndPrivacyProps> {
  static contextTypes = {
    organization: PropTypes.object.isRequired,
    router: PropTypes.object,
  };

  getEndpoints(): GetEndPointsOutput {
    const {orgId, projectId} = this.props.params;
    return [['data', `/projects/${orgId}/${projectId}/`]];
  }

  renderBody() {
    const {organization} = this.context;
    const project = this.state.data;
    const {orgId, projectId} = this.props.params;
    const endpoint = `/projects/${orgId}/${projectId}/`;
    const access = new Set(organization.access);
    const features = new Set(organization.features);

    return (
      <React.Fragment>
        <SettingsPageHeader title={t('Security And Privacy')} />
        <Form
          saveOnBlur
          allowUndo
          initialData={project}
          apiMethod="PUT"
          apiEndpoint={endpoint}
          onSubmitSuccess={resp => {
            // This will update our project context
            ProjectActions.updateSuccess(resp);
          }}
          forms={securityAndPrivacyForms}
        >
          <JsonForm
            additionalFieldProps={{
              organization,
            }}
            features={features}
            disabled={!access.has('project:write')}
          />
        </Form>
      </React.Fragment>
    );
  }
}

export default SecurityAndPrivacyContent;
