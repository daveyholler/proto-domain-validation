import React from 'react';
import { EuiSpacer, EuiText, EuiTitle } from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_amsterdam_light.css';
import './App.css';

import { ValidationView } from './views/validationView';

function App() {
  return (
    <div style={{ maxWidth: '60rem', margin: '4rem auto' }}>
      <EuiTitle size="l">
        <h1>Web Crawler</h1>
      </EuiTitle>
      <EuiText>
        <p>👩‍🎤 Select an option in the dropdown and click 'Add Domain' to simulate failures.</p>
      </EuiText>
      <EuiSpacer size="xl" />
      <ValidationView />
    </div>
  );
}

export default App;
