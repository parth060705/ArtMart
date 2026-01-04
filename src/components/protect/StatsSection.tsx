'use client';

import { TrendingUp, Shield, Users, Zap } from 'lucide-react';

const stats = [
  {
    id: 1,
    value: '70%',
    label: 'of artists are concerned about AI training on their work without consent',
    icon: Shield,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    id: 2,
    value: '3.5M+',
    label: 'artworks used to train AI models without artist permission',
    icon: TrendingUp,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    id: 3,
    value: '85%',
    label: 'of artists support stronger protections for their creative work',
    icon: Users,
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
  },
//   {
//     id: 4,
//     value: '12x',
//     label: 'increase in AI art generation tools in the last 2 years',
//     icon: Zap,
//     color: 'text-amber-500',
//     bgColor: 'bg-amber-50 dark:bg-amber-900/20',
//   },
];

const StatsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Growing Concern Among Artists
          </h2>
          <p className="text-muted-foreground text-lg">
            Artists worldwide are seeking better protection and fair compensation for their work in the age of AI
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
          {stats.map((stat) => (
            <div 
              key={stat.id}
              className={`p-6 rounded-xl transition-all duration-300 hover:shadow-lg ${stat.bgColor} hover:-translate-y-1`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${stat.color} ${stat.bgColor}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
