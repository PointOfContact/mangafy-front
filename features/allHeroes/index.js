import React, { useEffect, useState } from 'react';
import Imgix from 'components/imgix';
import client from 'api/client';
import styles from './styles.module.scss';
import cn from 'classnames';

const AllHeroes = ({ data }) => {
  const [personages, setPersonage] = useState([]);
  const [components, setComponent] = useState([]);
  const [backgrounds, setBackground] = useState([]);

  useEffect(() => {
    const personages = data.heroes.filter((item) => item.type === 'personage');
    const components = data.heroes.filter((item) => item.type === 'component');
    const backgrounds = data.heroes.filter((item) => item.type === 'background');
    setPersonage(personages);
    setComponent(components);
    setBackground(backgrounds);
  }, []);

  const ui = (heroes, type) => {
    const jsx = heroes.map((item) => {
      return (
        <div key={item._id} className={cn(styles.content, !item.imageUrl && styles.center)}>
          {!!item.imageUrl && (
            <div className={styles.images}>
              <Imgix
                width={500}
                height={400}
                layout="intrinsic"
                src={client.UPLOAD_URL + item.imageUrl}
                alt="heroes image"
              />
            </div>
          )}
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </div>
      );
      return jsx;
    });

    return <div className={styles.container}>{jsx}</div>;
  };

  return (
    <div>
      <h2 className={styles.title}>Personages</h2>
      {ui(personages)}
      <h2 className={styles.title}>Components</h2>
      {ui(components)}
      <h2 className={styles.title}>Backgrounds</h2>
      {ui(backgrounds)}
    </div>
  );
};

export default AllHeroes;
