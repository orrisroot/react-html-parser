import React from 'react';
import 'sass/app';
import Editor from '../containers/Editor';
import Html from '../containers/Html';
import Header from './Header';

export default function App() {
  return (
    <div id="app">
      <Header />
      <main id="content">
        <Editor />
        <Html />
      </main>
    </div>
  );
}
