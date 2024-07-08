import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Getting Started',
    link: '/docs/API',
    description: (
      <>
        Check out the languages we support and learn how we handle authentication.
      </>
    ),
  },
  {
    title: 'Chatbot APIs',
    link: '/docs/Chatbot APIs',
    description: (
      <>
        Explore the APIs behind our chatbots.
      </>
    ),
  },
  {
    title: 'Translation API',
    link: '/docs/Translation API',
    description: (
      <>
        Discover how we translate conversations with our API.
      </>
    ),
  },
  {
    title: 'Text-to-Speech API',
    link: '/docs/Text-to-Speech API',
    description: (
      <>
        Find out about the API that gives voice to our technology.
      </>
    ),
  },
  {
    title: 'Speech-to-Text API',
    link: '/docs/Speech-to-Text API',
    description: (
      <>
        Learn how our API turns spoken words into written text.
      </>
    ),
  },
  
];


const ytVideos = [
  {
    title: '1. Getting started',
    videoId: 'O8G7hpGfBmM',
  },
  {
    title: '2. Managing Organisations',
    videoId: 'crwdqdA1oLw',
  },
  {
    title: '3. Create a bot & managing intents',
    videoId: 'aqsn22rQETM',
  },
  {
    title: '4. Managing dialogues',
    videoId: 'jYZUQHF0ElQ',
  },
  {
    title: '5. Training and Testing',
    videoId: 'EPUGUwNJCRs',
  },
  {
    title: '6.1 How to use Entities',
    videoId: 'X7DJs47Ycsc',
  },
  {
    title: '6.2 Creating a bot that responds with an entity',
    videoId: 'wPeY1B1vkIc',
  },
  {
    title: '7. Using buttons',
    videoId: 'K9NnmlxBBl8',
  },
  {
    title: '8. Collection information using forms',
    videoId: 'Xs6P80pWpvE',
  },
  {
    title: '9. Hitting endpoints within the conversations',
    videoId: 'noxVPmrcXfg',
  },
];

function Feature({ title, link, description }) {
  return (
    <>
      <a href={link} rel="noopener noreferrer" className={clsx('col col--3', styles.border, styles.textv, styles.feature)}>
        <div className="text--center padding-horiz--md">
          <Heading as="h3" className={styles.hcolor}>{title}</Heading>
          <p className={styles.textcolor}>{description}</p>
        </div>
      </a>
    </>
  );
}

function YoutubeVideo({ title, videoId }) {
  return (
    <div className={clsx('col col--3', styles.yt)}>
      <div className=" padding-horiz--md">
        <iframe title={title} width="284.16px" height="159.13px" src={`https://www.youtube.com/embed/${videoId}`} allowFullScreen></iframe>
        <Heading as="p">{title}</Heading>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <div className="container">
      <Heading as="h3" className={styles.textheading}>API Documentation</Heading>
      <p className={styles.text}>Botlhale AI's APIs follow REST principles. They feature resource-oriented URLs, accept form-encoded request bodies, return JSON responses, and use standard HTTP response codes and authentication. For more details, look at the cards below.</p>
      <section>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </section>
      
      {/* <Heading as="h2" className={styles.marg}>Bua Tutorial Videos</Heading>
      <div className="row">
        {ytVideos.map((props, idx) => (
          <YoutubeVideo key={idx} {...props} />
        ))}
      </div> */}
    </div>
  );
}
