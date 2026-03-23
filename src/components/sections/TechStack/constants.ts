// src/components/TechStack/constants.ts

export const CR  = '#C41E3A';
export const GD  = '#D4891A';
export const CRP = 'rgba(196,30,58,';
export const GDP = 'rgba(212,137,26,';

export const CAT_META: Record<string, { label: string; color: string; pfx: string }> = {
  fe:    { label: 'Frontend',       color: GD, pfx: GDP },
  be:    { label: 'Backend',        color: CR, pfx: CRP },
  infra: { label: 'Infrastructure', color: CR, pfx: CRP },
  data:  { label: 'Data',           color: GD, pfx: GDP },
};

export const SKILLS = [
  { id: 0,  name: 'TypeScript', cat: 'fe',    pct: 92 },
  { id: 1,  name: 'React',      cat: 'fe',    pct: 88 },
  { id: 2,  name: 'Next.js',    cat: 'fe',    pct: 80 },
  { id: 3,  name: 'Node.js',    cat: 'be',    pct: 85 },
  { id: 4,  name: 'Python',     cat: 'be',    pct: 78 },
  { id: 5,  name: 'GraphQL',    cat: 'be',    pct: 72 },
  { id: 6,  name: 'AWS',        cat: 'infra', pct: 82 },
  { id: 7,  name: 'Docker',     cat: 'infra', pct: 80 },
  { id: 8,  name: 'Kubernetes', cat: 'infra', pct: 70 },
  { id: 9,  name: 'PostgreSQL', cat: 'data',  pct: 75 },
  { id: 10, name: 'Redis',      cat: 'data',  pct: 68 },
  { id: 11, name: 'MongoDB',    cat: 'data',  pct: 65 },
];

export const ICON_MAP: Record<string, string> = {
  TypeScript:  'typescript/typescript-original.svg',
  React:       'react/react-original.svg',
  'Next.js':   'nextjs/nextjs-original.svg',
  'Node.js':   'nodejs/nodejs-original.svg',
  Python:      'python/python-original.svg',
  GraphQL:     'graphql/graphql-plain.svg',
  AWS:         'amazonwebservices/amazonwebservices-plain-wordmark.svg',
  Docker:      'docker/docker-original.svg',
  Kubernetes:  'kubernetes/kubernetes-plain.svg',
  PostgreSQL:  'postgresql/postgresql-original.svg',
  Redis:       'redis/redis-original.svg',
  MongoDB:     'mongodb/mongodb-original.svg',
};
