import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { Col, Row, Carousel } from 'antd';

const Featured = () => {
  return (
    <Row className={styles.featured} gutter={[20, 30]}>
      {/* featured collabs slider */}
      <Col span={24} xl={12}>
        <div className={styles.featured__title}>Featured collaborations</div>
        <Carousel
          autoplay={true}
          autoplaySpeed={6000}
          draggable={true}
          speed={1000}
          easing="ease-in-out">
          <div className={styles.featuredCollabs}>
            <div className={styles.featuredCollabs__bg}>
              <img src="img/feedTemp/cover.png" />
            </div>
            <div className={styles.featuredCollabs__content}>
              <div className={styles.featuredCollabs__image}>
                <img src="img/feedTemp/cover.png" alt="manga cover" />
              </div>
              <div className={styles.featuredCollabs__textTitle}>An Unexpevcted Rescue</div>
              <div className={styles.featuredCollabs__textDescription}>
                “Tie him up!” shouted the gang leader. “Tie him to that chair over there! Don’t let
                him out, boys. Let’s teach him a lesson “Tie him up!”
              </div>
            </div>
          </div>
          {/*  */}
          <div className={styles.featuredCollabs}>
            <div className={styles.featuredCollabs__bg}>
              <img src="img/feedTemp/wide_cover.jpg" />
            </div>
            <div className={styles.featuredCollabs__content}>
              <div className={styles.featuredCollabs__image}>
                <img src="img/feedTemp/wide_cover.jpg" alt="manga cover" />
              </div>
              <div className={styles.featuredCollabs__textTitle}>
                A Very Very Unexpevcted Rescue Rescue Rescue Rescue
              </div>
              <div className={styles.featuredCollabs__textDescription}>
                “Tie him up!” shouted the gang leader. “Tie him to that chair over there! Don’t let
                him out, boys. Let’s teach him a lesson “Tie him up!” “Tie him up!” shouted the gang
                leader. “Tie him to that chair over there! Don’t let him out, boys.
              </div>
            </div>
          </div>
          {/*  */}
        </Carousel>
      </Col>
      {/* featured tasks cards */}
      <Col span={24} xl={12} className={styles.featuredTasksCol}>
        <div className={styles.featured__title}>Featured tasks</div>
        <div className={styles.featuredTasks}>
          <div className={styles.featuredTasks__card}>
            <div className={styles.featuredTasks__bg}>
              <img src="img/feedTemp/cover.png" />
            </div>
            <div className={styles.featuredTasks__title}>Fantasy Writer</div>
            <div className={styles.featuredTasks__price}>$5 USD</div>
            <div className={styles.featuredTasks__subtitle}>History * Basiyem</div>
          </div>
          {/*  */}
          <div className={styles.featuredTasks__card}>
            <div className={styles.featuredTasks__bg}>
              <img src="img/feedTemp/cover.png" />
            </div>
            <div className={styles.featuredTasks__title}>Background color</div>
            <div className={styles.featuredTasks__price}>$5 USD</div>
            <div className={styles.featuredTasks__subtitle}>History * Basiyem</div>
          </div>
          {/*  */}
          <div className={styles.featuredTasks__card}>
            <div className={styles.featuredTasks__bg}>
              <img src="img/feedTemp/cover.png" />
            </div>
            <div className={styles.featuredTasks__title}>Character creator</div>
            <div className={styles.featuredTasks__price}>$5 USD</div>
            <div className={styles.featuredTasks__subtitle}>History * Basiyem</div>
          </div>
          {/*  */}
          <div className={styles.featuredTasks__card}>
            <div className={styles.featuredTasks__bg}>
              <img src="img/feedTemp/cover.png" />
            </div>
            <div className={styles.featuredTasks__title}>Fantasy Writer</div>
            <div className={styles.featuredTasks__price}>$5 USD</div>
            <div className={styles.featuredTasks__subtitle}>History * Basiyem</div>
          </div>
          {/*  */}
          <div className={styles.featuredTasks__card}>
            <div className={styles.featuredTasks__bg}>
              <img src="img/feedTemp/cover.png" />
            </div>
            <div className={styles.featuredTasks__title}>Fantasy Writer</div>
            <div className={styles.featuredTasks__price}>$5 USD</div>
            <div className={styles.featuredTasks__subtitle}>History * Basiyem</div>
          </div>
          {/*  */}
          <div className={styles.featuredTasks__card}>
            <div className={styles.featuredTasks__bg}>
              <img src="img/feedTemp/cover.png" />
            </div>
            <div className={styles.featuredTasks__title}>Fantasy Writer</div>
            <div className={styles.featuredTasks__price}>$5 USD</div>
            <div className={styles.featuredTasks__subtitle}>History * Basiyem</div>
          </div>
          {/*  */}
        </div>
      </Col>
    </Row>
  );
};

export default Featured;
