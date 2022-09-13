import React from 'react';
import { Avatar as AntAvatar } from 'antd';
import Imgix from 'components/imgix';
import client from 'api/client';

const Avatar = ({ image, text, size, className }) => {
  return (
    <div className={className} style={{ height: size, width: size }}>
      {image ? (
        <Imgix height={size} width={size} objectFit="cover" src={client.UPLOAD_URL + image} />
      ) : (
        <AntAvatar
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
