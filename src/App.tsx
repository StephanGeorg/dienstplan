import { Router, Route } from '@solidjs/router'
import type { Component } from 'solid-js'
import CalendarView from './components/CalendarView'
import MemberManagement from './components/MemberManagement'

const App: Component = () => {
  return (
    <div class="min-h-screen bg-gray-50">
      <Router>
        <Route path="/" component={CalendarView} />
        <Route path="/members" component={MemberManagement} />
      </Router>
    </div>
  )
}

export default App