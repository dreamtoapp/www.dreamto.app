'use client';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React, { FC, HTMLAttributes, useEffect, useRef, useState } from 'react';

type CustomLinkProps = NextLinkProps & {
  children: React.ReactNode;
  href: string;
  target?: string;
} & HTMLAttributes<HTMLAnchorElement>;

const Link: FC<CustomLinkProps> = ({ children, href, ...rest }) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Ensure click event is properly handled
    e.preventDefault();
    e.stopPropagation();

    // Add small delay to ensure click registration
    setTimeout(() => {
      if (linkRef.current) {
        linkRef.current.click();
      }
    }, 50);
  };

  return (
    <NextLink
      href={href}
      ref={linkRef}
      prefetch={true}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </NextLink>
  );
};

export default Link;
