import {View, Text, Image} from 'react-native';
import React from 'react';
import {TypeListItem} from '../type/TypeListItem';

export default function ListItemView({item}: {item: TypeListItem}) {
  return (
    <View>
      <Image style={{height: 200}} source={{uri: item.thumbnail}} />
      <View style={{padding: 12}}>
        <Text style={{fontSize: 16}}>{item.title}</Text>
        <Text style={{fontSize: 12}}>
          {item.channelTtile} ・ 조회수 {item.viewCount} ・ {item.publishedAt}
        </Text>
      </View>
    </View>
  );
}
