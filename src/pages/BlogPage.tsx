import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, BrainCircuit } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const getBlogPosts = (t: any) => [
  {
    titleKey: 'blog.posts.whatIsFinops.title',
    descriptionKey: 'blog.posts.whatIsFinops.description',
    link: '/blog/what-is-finops',
    icon: BookOpen
  },
  {
    titleKey: 'blog.posts.bringingTeams.title',
    descriptionKey: 'blog.posts.bringingTeams.description',
    link: '/blog/bringing-teams-together',
    icon: Users
  },
  {
    titleKey: 'blog.posts.dataDriven.title',
    descriptionKey: 'blog.posts.dataDriven.description',
    link: '/blog/data-driven-decisions',
    icon: BrainCircuit
  }
];

const BlogPage: React.FC = () => {
  const { t } = useTranslation();
  const blogPosts = getBlogPosts(t);
  
  return (
    <div className="bg-white">
      <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            {t('blog.title')}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            {t('blog.subtitle')}
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <div key={post.titleKey} className="flex flex-col justify-between bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200">
              <div className="p-8">
                <post.icon className="h-10 w-10 text-blue-600 mb-4" />
                <h2 className="text-xl font-bold text-gray-900">{t(post.titleKey)}</h2>
                <p className="mt-3 text-sm text-gray-600 min-h-[60px]">{t(post.descriptionKey)}</p>
              </div>
              <div className="bg-gray-100 p-6 mt-auto">
                 <Link to={post.link} className="flex items-center font-semibold text-sm text-blue-600 hover:text-blue-800 transition-colors">
                    {t('blog.readMore')}
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
