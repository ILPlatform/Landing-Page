import React from 'react';

const getSRC = (src, format) => {
  try {
    return require(`assets/img/${src}/image.${format}`).default;
  } catch (error) {}
};

const ImgNextGen = ({
  src,
  alt,
  ...props
}) => 
    <picture>
       {getSRC(src, 'webp') && <source srcSet={getSRC(src, 'webp')} type="image/webp" />}
       {getSRC(src, 'jxr') && <source srcSet={getSRC(src, 'jxr')} type="image/jxr" />}
       {getSRC(src, 'jp2') && <source srcSet={getSRC(src, 'jp2')} type="image/jp2" />}
       <img src={getSRC(src, 'jpg')} alt={alt} {...props} />
    </picture>

export default ImgNextGen;