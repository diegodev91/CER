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
      year: "2025",
      title: "Nace CER",
      description: "Iniciamos en 2025 para revolucionar la comedia en YouTube.",
      icon: Play
    },
    {
      year: "2025",
      title: "Humor Sin Límites",
      description: "Establecemos nuestro estilo: sátiras y humor políticamente incorrecto.",
      icon: Users
    },
    {
      year: "2025",
      title: "Pato Blanco vs CER",
      description: "Carlos Orozco se convierte en nuestro enemigo número uno.",
      icon: Heart
    },
    {
      year: "2025",
      title: "Llegamos para Quedarnos",
      description: "Consolidamos nuestra presencia y expandimos nuestro contenido.",
      icon: Star
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-cer-primary-600 via-cer-primary-700 to-cer-secondary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <Youtube className="h-16 w-16 text-red-400 mx-auto mb-4" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Acerca de CER - Cuidando el Rancho
          </h1>
          <p className="text-xl text-cer-secondary-100 max-w-3xl mx-auto">
            Somos un grupo de comedia que llegó en 2025 para quedarse. 
            Te haremos reír con nuestras ocurrencias, sátiras e insultos 
            políticamente incorrectos. ¡Prepárate para la diversión sin límites!
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
                  En <strong>CER - Cuidando el Rancho</strong>, iniciamos en 2025 
                  con una misión clara: hacerte reír hasta que te duela el estómago. 
                  Somos especialistas en humor sin filtros, sátiras que duelen y 
                  ocurrencias que nadie más se atreve a decir.
                </p>
                <p>
                  A través de nuestro canal de YouTube en <strong>RORO Network</strong>, 
                  compartimos contenido que desafía lo políticamente correcto y 
                  abraza la risa auténtica, sin máscaras ni censura.
                </p>
                <p>
                  Nuestro peor enemigo número uno es <strong>Carlos Orozco</strong> 
                  (alias "Pato Blanco"), pero incluso él no puede parar nuestra 
                  misión de llevar diversión sin límites a todos los rincones.
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
                      <h4 className="font-semibold text-gray-900">Humor Sin Filtros</h4>
                      <p className="text-gray-600">Comedy políticamente incorrecta y auténtica</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="h-6 w-6 text-blue-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Comunidad CERranos</h4>
                      <p className="text-gray-600">Unidos por el amor a la risa sin límites</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Star className="h-6 w-6 text-yellow-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Sátiras y Ocurrencias</h4>
                      <p className="text-gray-600">Contenido que nadie más se atreve a hacer</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Youtube className="h-6 w-6 text-red-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Enemigo: Pato Blanco</h4>
                      <p className="text-gray-600">Carlos Orozco no podrá detenernos</p>
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
              La evolución de CER desde 2025: de cero a héroes de la comedia
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-cer-primary-100 text-cer-primary-600">
                    <milestone.icon className="h-8 w-8" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-cer-primary-600 mb-2">
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
      <div className="py-16 bg-gradient-to-r from-cer-primary-600 to-cer-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¡Únete a la Familia CERranos!
          </h2>
          <p className="text-xl text-cer-secondary-100 mb-8 max-w-2xl mx-auto">
            Forma parte de nuestra comunidad y disfruta de humor sin filtros, 
            sátiras épicas y contenido que te hará reír hasta llorar.
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
              className="inline-flex items-center px-8 py-4 bg-white text-cer-primary-700 font-semibold rounded-lg shadow-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-200"
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
