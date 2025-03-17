// sitemap.js
// Inspired by https://github.com/clh161/react-router-sitemap-generator

import Generator from 'react-router-sitemap-generator';
import Router from './index.js'; //import your react router component

const generator = new Generator(
  'https://react-router-sitemap-generator.com',
  Router(),
  {
    lastmod: new Date().toISOString().slice(0, 10),
    changefreq: 'monthly',
    priority: 0.8,
  }
);
generator.save('public/sitemap.xml');