import React, { useState, useEffect } from 'react';
import { Calculator } from './components/Calculator';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Calculator />
      </main>
      <Footer />
    </div>
  );
}

export default App;