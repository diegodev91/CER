import React from 'react';
import { Youtube, Users, Heart, Star, Calendar, Play } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: "El Grillo",
      role: "Presentador Principal",
      description: "El corazón del programa, siempre con una sonrisa y una historia que contar.",
    },
    {
      name: "Doctor Oñito",
      role: "Co-presentador",
      description: "El sabio del grupo, aporta conocimiento y experiencia a cada episodio.",
    },
    {
      name: "Gerardo Manuel",
      role: "Co-presentador",
      description: "La energía y diversión del programa, siempre listo para una aventura.",
    }
  ];

  const milestones = [
    {
      year: "2021",
      title: "Nace CER",
      description: "Iniciamos nuestro canal de YouTube con la primera temporada.",
      icon: Play
    },
    {
      year: "2022",
      title: "Crecimiento Exponencial",
      description: "Alcanzamos los primeros 10K suscriptores CerRanos.",
      icon: Users
    },
    {
      year: "2023",
      title: "Comunidad Consolidada",
      description: "Superamos los 50K CerRanos y lanzamos contenido exclusivo.",
      icon: Heart
    },
    {
      year: "2024",
      title: "Nuevos Horizontes",
      description: "Introducimos reels y expandimos nuestro contenido.",
      icon: Star
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <Youtube className="h-16 w-16 text-red-400 mx-auto mb-4" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Acerca de CER - Cuidando el Rancho
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Somos más que un programa de YouTube. Somos una familia que 
            comparte la pasión por la vida rural, los valores familiares 
            y las aventuras en el rancho.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Nuestra Misión
              </h2>
              <div className="space-y-4 text-lg text-gray-600">
                <p>
                  En <strong>CER - Cuidando el Rancho</strong>, creemos que la vida 
                  en el campo enseña valores fundamentales: trabajo duro, respeto 
                  por la naturaleza, amor por la familia y la importancia de la comunidad.
                </p>
                <p>
                  A través de nuestro canal de YouTube en <strong>RORO Network</strong>, 
                  compartimos historias auténticas que inspiran, educan y entretienen 
                  a toda la familia.
                </p>
                <p>
                  Cada episodio y reel es una ventana a la vida rural moderna, 
                  mostrando que la simplicidad y los valores tradicionales 
                  siguen siendo relevantes en nuestro mundo actual.
                </p>
              </div>
            </div>
            
            <div className="mt-10 lg:mt-0">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Lo que nos hace especiales
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Heart className="h-6 w-6 text-red-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Contenido Auténtico</h4>
                      <p className="text-gray-600">Historias reales de la vida en el rancho</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="h-6 w-6 text-blue-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Comunidad CerRanos</h4>
                      <p className="text-gray-600">Una familia unida por valores compartidos</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Star className="h-6 w-6 text-yellow-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Valores Familiares</h4>
                      <p className="text-gray-600">Contenido apropiado para toda la familia</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Youtube className="h-6 w-6 text-red-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Plataforma YouTube</h4>
                      <p className="text-gray-600">Accesible desde cualquier dispositivo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nuestro Camino
            </h2>
            <p className="text-lg text-gray-600">
              La evolución de CER a través de los años
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    <milestone.icon className="h-8 w-8" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {milestone.year}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {milestone.title}
                </h3>
                <p className="text-gray-600">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nuestro Equipo
            </h2>
            <p className="text-lg text-gray-600">
              Las personas que hacen posible CER
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-green-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¡Únete a la Familia CerRanos!
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Forma parte de nuestra comunidad y disfruta de contenido exclusivo, 
            detrás de cámaras y mucho más.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.youtube.com/@LaRoroNetworkOficial"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Youtube className="h-5 w-5 mr-2" />
              Suscribirse en YouTube
            </a>
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-4 bg-white text-green-700 font-semibold rounded-lg shadow-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-200"
            >
              <Heart className="h-5 w-5 mr-2" />
              Contáctanos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
