import React from 'react';
import {Text as RNText} from 'react-native';

export function Typography({
  color,
  fontSize,
  children,
  numOfLines,
}: {
  color?: string;
  fontSize?: number;
  children?: React.ReactElement | string | string[] | React.ReactElement[];
  numOfLines?: number;
}) {
  return (
    <RNText
      style={{
        color: color || 'black',
        fontSize: fontSize,
      }}
      numberOfLines={numOfLines}>
      {children}
    </RNText>
  );
}
