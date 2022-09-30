import React from 'react';
import { Avatar as AntAvatar } from 'antd';
import Imgix from 'components/imgix';
import client from 'api/client';

const Avatar = ({ image, text, size, className, borderRadius }) => {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        height: size ? size + 'px' : '',
        width: size ? size + 'px' : '',
        flex: '0 0 auto',
        borderRadius: borderRadius || '50%',
        overflow: 'hidden',
      }}>
      {image ? (
        <Imgix layout="fill" objectFit="cover" src={client.UPLOAD_URL + image} />
      ) : (
        <AntAvatar
          shape="square"
          size={size}
          style={{
            background: '#7B65F3',
            color: '#fff',
            'font-size': size * 0.6 + 'px',
          }}>
          {text}
        </AntAvatar>
      )}
    </div>
  );
};

export default Avatar;
