import { Link, useNavigate } from 'react-router-dom';
import styles from './AboutPage.module.scss';
import logo from '@/shared/assets/img/logo-horiz.svg';
import rss from '@/shared/assets/img/rss.svg';
import { MembersData } from '../model/MembersData';
import { useState } from 'react';

const AboutPage = () => {
  const navigate = useNavigate();

  const goBack = (): void => {
    navigate(-1);
  };

  const [activeCard, setActiveCard] = useState('');

  const toggleActiveCard = (cardIndex: string) => {
    setActiveCard(activeCard == cardIndex ? '' : cardIndex);
  };

  return (
    <div className={styles.pageWrapper}>
      <nav className={styles.nav}>
        <Link
          to='/home'
          className={styles.homeLink}
          title='Green Shop home page'>
          <img className={styles.logo} src={logo} alt='logo' />
          <span className={styles.logoText}>GREENSHOP</span>
        </Link>
        <h1 className={styles.title}>About our team</h1>
        <button
          className={styles.navigation__back}
          onClick={() => {
            goBack();
          }}>
          Go back
        </button>
      </nav>
      <main className={styles.main}>
        <Link to={'https://rs.school/'} className={styles.courseLink}>
          <img src={rss} alt='rss logo' className={styles.rssLogo} />
          <span className={styles.rssLinkText}>The Rolling Scopes School</span>
        </Link>

        {MembersData.map((member, ind) => (
          <article
            className={[
              styles.memberCard,
              String(ind) === activeCard ? styles._active : ''
            ].join(' ')}
            key={ind}
            id={String(ind)}
            onClick={() => {
              toggleActiveCard(String(ind));
            }}>
            <div className={styles.contentWrapper}>
              <div className={styles.imagesContainer}>
                <img
                  className={styles.memberPhoto}
                  src={member.photo}
                  alt='member photo'
                />
                <img
                  className={styles.memberBage}
                  src={member.bage}
                  alt='bage'
                />
              </div>
              <h3 className={styles.memberName}>{member.name}</h3>
              <h4 className={styles.memberRole}>
                <span>
                  <b>role: </b>
                </span>
                {member.role}
              </h4>
              <p className={styles.memberBio}>{member.bio}</p>
              {member.contributions.map((c, i) => (
                <p className={styles.memberContrib} key={i}>
                  {c}
                </p>
              ))}
              <a
                className={styles.memberLink}
                href={member.github}
                target='_blank'
                rel='noopener noreferrer'>
                {member.github}
              </a>
            </div>
            <div className={styles.overlay}></div>
          </article>
        ))}
      </main>
    </div>
  );
};

export default AboutPage;
