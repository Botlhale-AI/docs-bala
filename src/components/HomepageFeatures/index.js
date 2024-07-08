import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Create',
    link: '/docs/Create',
    description: (
      <>
        Learn how to create and set up your Bala account
      </>
    ),
  },
  {
    title: 'Record',
    link: '/docs/Record',
    description: (
      <>
        Learn how to create and record your meetings.
      </>
    ),
  },
  {
    title: 'Listen',
    link: '/docs/Listen',
    description: (
      <>
        Learn how to review and manage your meeting analyses.
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
      <Heading as="h3" className={styles.textheading}>Bala Documentation</Heading>
      <p className={styles.text}>Introducing Bala, an innovative meeting app designed to streamline your in-person and offline meetings on platforms like Google Meet, Teams, and Zoom. With Bala, users can easily navigate to the Listen page to access detailed transcriptions of their meetings. These transcriptions are meticulously diarized by speaker, providing a clear and organized way to review discussions, action items, and key notes. Bala ensures that you never miss a crucial detail, making your meeting management more efficient and effective.</p>
      <section>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </section>
      
      {/* <Heading as="h2" className={styles.marg}>Bala Tutorial Videos</Heading>
      <div className="row">
        {ytVideos.map((props, idx) => (
          <YoutubeVideo key={idx} {...props} />
        ))}
      </div> */}
    </div>
  );
}
