import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface IllustratedCardProps {
  illustration: string;
  title: string;
  description: string;
  date?: string;
  link: string;
  badge?: string;
  colorScheme?: 'blue' | 'purple' | 'green' | 'orange' | 'teal';
}

const colorSchemes = {
  blue: {
    badge: 'bg-blue-100 text-blue-800',
    hover: 'group-hover:border-blue-400',
    button: 'text-blue-600 group-hover:text-blue-800',
  },
  purple: {
    badge: 'bg-purple-100 text-purple-800',
    hover: 'group-hover:border-purple-400',
    button: 'text-purple-600 group-hover:text-purple-800',
  },
  green: {
    badge: 'bg-green-100 text-green-800',
    hover: 'group-hover:border-green-400',
    button: 'text-green-600 group-hover:text-green-800',
  },
  orange: {
    badge: 'bg-orange-100 text-orange-800',
    hover: 'group-hover:border-orange-400',
    button: 'text-orange-600 group-hover:text-orange-800',
  },
  teal: {
    badge: 'bg-teal-100 text-teal-800',
    hover: 'group-hover:border-teal-400',
    button: 'text-teal-600 group-hover:text-teal-800',
  },
};

const IllustratedCard: React.FC<IllustratedCardProps> = ({
  illustration,
  title,
  description,
  date,
  link,
  badge,
  colorScheme = 'blue',
}) => {
  const colors = colorSchemes[colorScheme];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Link to={link}>
        <div className={`bg-white rounded-2xl border-2 border-gray-200 ${colors.hover} overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2`}>
          {/* Illustration Container */}
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center h-64 overflow-hidden">
            {/* Corner Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32">
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
                <circle cx="10" cy="10" r="2" fill="currentColor" className="text-gray-400" />
                <circle cx="25" cy="10" r="2" fill="currentColor" className="text-gray-400" />
                <circle cx="40" cy="10" r="2" fill="currentColor" className="text-gray-400" />
                <circle cx="10" cy="25" r="2" fill="currentColor" className="text-gray-400" />
                <circle cx="25" cy="25" r="2" fill="currentColor" className="text-gray-400" />
              </svg>
            </div>
            
            {/* Badge */}
            {badge && (
              <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${colors.badge}`}>
                {badge}
              </div>
            )}
            
            {/* Illustration */}
            <img 
              src={illustration} 
              alt={title} 
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          
          {/* Content */}
          <div className="p-6">
            {date && (
              <p className="text-sm text-gray-500 mb-2">{date}</p>
            )}
            
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
              {title}
            </h3>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
              {description}
            </p>
            
            <div className={`inline-flex items-center gap-2 font-semibold text-sm ${colors.button} transition-all`}>
              <span>Devamını Oku</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default IllustratedCard;

