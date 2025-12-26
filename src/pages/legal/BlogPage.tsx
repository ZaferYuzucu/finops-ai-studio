import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, BrainCircuit } from 'lucide-react';

const blogPosts = [
  {
    title: 'FinOps Nedir?: Temel Bir Rehber',
    description: 'FinOps kültürünün temelini oluşturan "Bilgilendir, Optimize Et, Yönet" döngüsünü ve bu metodolojinin işletmenize nasıl değer katabileceğini keşfedin.',
    link: '/blog/what-is-finops',
    icon: BookOpen
  },
  {
    title: 'Ekipleri Buluşturmak: Finans ve Mühendislik İş Birliği',
    description: 'Finans ve mühendislik ekipleri arasında nasıl köprü kurulur? "Birim Maliyet" ve "Paylaşılan Sorumluluk" kavramlarıyla veri odaklı bir iş birliği kültürü oluşturun.',
    link: '/blog/bringing-teams-together',
    icon: Users
  },
  {
    title: 'Veri Odaklı Kararlar Almak',
    description: 'Anormallik tespiti, bütçe tahminlemesi ve kapasite planlaması gibi kritik süreçlerde verinin gücünü kullanarak nasıl daha isabetli ve stratejik kararlar alabileceğinizi öğrenin.',
    link: '/blog/data-driven-decisions',
    icon: BrainCircuit
  }
];

const BlogPage: React.FC = () => {
  return (
    <div className="bg-white">
      <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Bilgi Merkezi
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            FinOps kültürü, bulut maliyet yönetimi ve veri odaklı karar alma süreçleri hakkında derinlemesine bilgi edinin.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <div key={post.title} className="flex flex-col justify-between bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200">
              <div className="p-8">
                <post.icon className="h-10 w-10 text-blue-600 mb-4" />
                <h2 className="text-xl font-bold text-gray-900">{post.title}</h2>
                <p className="mt-3 text-sm text-gray-600 min-h-[60px]">{post.description}</p>
              </div>
              <div className="bg-gray-100 p-6 mt-auto">
                 <Link to={post.link} className="flex items-center font-semibold text-sm text-blue-600 hover:text-blue-800 transition-colors">
                    Devamını Oku
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BlogPage;
