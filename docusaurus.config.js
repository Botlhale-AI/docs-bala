
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {

  title: 'Bala - Docs',
  tagline: "Documentation",
  url: 'https://docs-bala.botlhale.xyz', 
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Botlhale-AI', 
  projectName: 'docs-bala', 
  deploymentBranch: 'gh-pages', 
  trailingSlash: false,

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
         // editUrl: 'https://botlhale-ai.github.io/documentation/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/murggar/murggar.github.io/edit/main/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],


  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/ficon.png',
      navbar: {
        title: 'Bala',
        logo: {
          alt: 'Botlhale AI Logo',
          src: 'img/bala.ico',
        }, 
        items: [          
          {
            type: 'doc',
            docId: 'API',
            position: 'right',
            to: '/',
            href: '/',
            html: `
              <img
                src="/img/bala-logo.png"
                alt="Botlhale AI Logo"
                class="navbar-logo-custom"
                style="height: 2rem; margin-right: 1rem; filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.75)); "
              >`,
          },
        ],
      },
      scripts: [
        { src: '/js/custom.js', async: true },
      ],
      
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      head: [
      {
        tagName: 'link',
        attributes: {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap',
        },
      },
    ],
    }),
};

export default config;
