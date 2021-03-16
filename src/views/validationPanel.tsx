import { FunctionComponent, useEffect, useState } from 'react';
import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiLoadingSpinner,
  EuiPanel,
  EuiSpacer,
  EuiText,
  EuiTitle
} from '@elastic/eui';

interface ValidationProps {
  failInitial?: boolean;
  failNetwork?: boolean;
  failIndexing?: boolean;
  failContent?: boolean;
}

export const ValidationPanel: FunctionComponent<ValidationProps> = ({
  failInitial = false,
  failNetwork = false,
  failIndexing = false,
  failContent = false
}) => {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [validationItems, setValidationItems] = useState([
    {
      label: "Initial Validation",
      description: "validate domain",
      isLoading: true,
      success: !failInitial,
      failureIsBlocking: true,
      failureMessage: 'Please enter a valid domain. Domain URLs require a protocol and cannot contain any paths.',
      action: null,
    },
    {
      label: "Network Connectivity",
      description: "establish a network connection",
      isLoading: true,
      success: !failNetwork,
      failureIsBlocking: true,
      failureMessage: 'Failed to establish a network connection. Please verify that the domain you entered is accessible and being served properly.',
      action: <EuiButton size="s">Test URL in the browser</EuiButton>
    },
    {
      label: "Indexing Restrictions",
      description: "determine indexing restrictions",
      isLoading: true,
      success: !failIndexing,
      failureIsBlocking: false,
      failureMessage: 'No sitemap was found on this website. It is not required, but using a sitemap allows us to find your content considerably faster.',
      action: <EuiButton size="s">Add a sitemap manually</EuiButton>
    },
    {
      label: "Content Verification",
      description: "verify content",
      isLoading: true,
      success: !failContent,
      failureIsBlocking: true,
      failureMessage: 'lorem ipsum dolor set amet',
      action: null,
    },
  ]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const timeout = setTimeout(() => {
      if (count < validationItems.length) {
        const items = validationItems;
        items[count].isLoading = false;
        if (items[count].success) {
          setCount(count + 1);
          setValidationItems(items)
        } else {
          if (items[count].failureIsBlocking) {
            let remaining = items.splice(count + 1)
            const failedAt = items[count];
            for (const item of remaining) {
              item.isLoading = false;
              item.success = false;
              item.failureMessage = `Unable to ${item.description} because the "${failedAt.label}" check failed.`;
              item.action = null;
            }
            setValidationItems(items.concat(remaining));
            setCount(count + validationItems.length);
            setIsLoading(false);
          } else {
            items[count].isLoading = false;
            setValidationItems(items);
            setCount(count + 1);
          }
        };
      } else {
        setIsLoading(false);
      }
    }, 2000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  const color = (item: any) => {
    if (!item.isLoading && item.success) {
      return 'success'
    } else if (!item.isLoading && !item.success) {
      return 'danger'
    } else return 'subdued'
  }

  return (
    <>
      <EuiFlexGroup direction="column" gutterSize="s" style={{ marginTop: "2rem" }}>
        {validationItems.map((item) => (
          <EuiFlexItem key={item.label}>
            <EuiPanel color={color(item)}>
              <EuiFlexGroup gutterSize="s" alignItems="center">
                <EuiFlexItem grow={false}>
                  {item.isLoading ? (
                    <EuiLoadingSpinner />
                  ) : (
                    <>
                      {item.success ? (
                        <EuiIcon color="success" type="checkInCircleFilled" />
                      ) : (
                        <EuiIcon color="danger" type="crossInACircleFilled" />
                      )}
                    </>
                  )}
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiTitle size="xs"><h4>{item.label}</h4></EuiTitle>
                </EuiFlexItem>
              </EuiFlexGroup>
              {!item.isLoading && !item.success && (
                <>
                  <EuiText size="s">
                    <p>{item.failureMessage}</p>
                  </EuiText>
                  {item.action && <EuiSpacer />}
                  {item.action && item.action}
                </>
              )}
            </EuiPanel>
          </EuiFlexItem>
        ))}
      </EuiFlexGroup>
      <EuiSpacer />
      <EuiButton style={{ float: 'right' }} disabled={isLoading || failInitial || failNetwork || failContent} fill>Continue</EuiButton>
    </>
  )
}