import React from 'react';

const ImgNextGen = ({
  srcWEBP,
  srcJXR,
  srcJP2,
  srcJPG,
  alt,
  ...props

}) => {
  return (
    <picture>
       <source srcSet={srcWEBP} type="image/webp" />
       <source srcSet={srcJXR} type="image/jxr" />
       <source srcSet={srcJP2} type="image/jp2" />
       <source srcSet={srcJPG} type="image/jpeg" />
       <img src={srcJPG} alt={alt} {...props} />
    </picture>
  );
};

export default ImgNextGen;