import { Router, Route } from '@solidjs/router';
import StaffList from './components/StaffList';
import type { Component } from 'solid-js';

const App: Component = () => {
  return (
    <Router>
      <Route path="/" component={StaffList} />
    </Router>
  );
};

export default App;
