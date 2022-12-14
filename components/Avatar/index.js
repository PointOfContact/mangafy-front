import React from 'react';
import { Avatar as AntAvatar } from 'antd';
import Imgix from 'components/imgix';
import client from 'api/client';
import User from 'components/icon/new/User';

const Avatar = ({ image, text, size, className, borderRadius, useNoImageIcon }) => {
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
        background: '#f0f0f0',
      }}>
      {image ? (
        <Imgix layout="fill" objectFit="cover" src={client.UPLOAD_URL + image} />
      ) : useNoImageIcon ? (
        <User
          color="#000"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            height: '80%',
          }}
        />
      ) : (
        <AntAvatar
          shape="square"
          size={size}
          style={{
            background: '#7B65F3',
            color: '#fff',
            'font-size': size * 0.6 + 'px',
          }}>
          {text && text[0]}
        </AntAvatar>
      )}
    </div>
  );
};

export default Avatar;
