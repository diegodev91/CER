import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Acerca de CER</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            CER - Cuidando el Rancho es el programa de televisión familiar más querido, 
            transmitido por la red RORO.
          </p>
          <p className="text-gray-600">
            Más información sobre el programa en desarrollo...
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
