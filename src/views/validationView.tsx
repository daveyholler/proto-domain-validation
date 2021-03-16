import { useState } from 'react';
import {
  EuiButton,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiPanel,
  EuiSelect,
  EuiSpacer,
  EuiText,
  EuiTitle
} from '@elastic/eui';
import { ValidationPanel } from './validationPanel';

export const ValidationView = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [failure, setFailure] = useState('');

  const failureOptions = [
    { value: '', text: 'No failures' },
    { value: 'initial', text: 'Fail initial validation' },
    { value: 'network', text: 'Fail network connectivity check' },
    { value: 'indexing', text: 'Fail indexing validation' },
    { value: 'content', text: 'Fail content validation' },
  ]

  const ValidationDisplay = () => {
    switch (failure) {
      case 'initial':
        return <ValidationPanel failInitial />
      case 'network':
        return <ValidationPanel failNetwork />
      case 'indexing':
        return <ValidationPanel failIndexing />
      case 'content':
        return <ValidationPanel failContent />
      default:
        return <ValidationPanel />
    }
  }

  return (
    <>
      <EuiPanel color="primary">
        <EuiFormRow fullWidth label="Simulate failures">
          <EuiSelect fullWidth options={failureOptions} onChange={(e) => setFailure(e.target.value)} />
        </EuiFormRow>
      </EuiPanel>
      <EuiSpacer size="l" />
      <EuiPanel className="crawler-onboarding__panel">
        <div className="crawler-onboarding__inner">
          <EuiTitle size="s">
            <h1>Add a domain to get started</h1>
          </EuiTitle>
          <EuiSpacer size="l" />
          <EuiText color="subdued">
            <p>Easily index your website's content. To get started, enter your domain name, provide optional entry points and crawl rules, and we will handle the rest.</p>
          </EuiText>
          <EuiSpacer size="m" />
        </div>
        <div style={{ padding: '0 2rem' }}>
          <EuiFlexGroup>
            <EuiFlexItem>
              <EuiFormRow fullWidth label="Domain URL" helpText="Domain URLs require a protocol and cannot contain any paths">
                <EuiFieldText fullWidth placeholder="https://mydomain.com" />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem grow={false} style={{ paddingTop: '1.5rem' }}>
              <EuiButton onClick={() => setIsVisible(true)} fill>Add Domain</EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
          {isVisible && <ValidationDisplay />}
        </div>
      </EuiPanel>
    </>
  )
}