import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import {TodoApp} from "./components/todoapp" 

function App() {
  return (
    <div className="App">
      <TodoApp></TodoApp>
    </div>
  );
}

export default withAuthenticator(App);
