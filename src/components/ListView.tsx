import {FlatList} from 'react-native';
import React, {useState} from 'react';
import {TypeListItem} from '../type/TypeListItem';
import ListItemView from './ListItemView';

export default function ListView() {
  const [list, setList] = useState<TypeListItem[]>([
    {
      title: 'Title_01',
      thumbnail:
        'https://docs.expo.dev/static/images/tutorial/background-image.png',
      publishedAt: '2023-08-08',
      viewCount: 100,
      channelTtile: 'ChannelTitle_01',
    },
    {
      title: 'Title_02',
      thumbnail:
        'https://docs.expo.dev/static/images/tutorial/background-image.png',
      publishedAt: '2023-08-07',
      viewCount: 200,
      channelTtile: 'ChannelTitle_02',
    },
    {
      title: 'Title_03',
      thumbnail:
        'https://docs.expo.dev/static/images/tutorial/background-image.png',
      publishedAt: '2023-08-06',
      viewCount: 300,
      channelTtile: 'ChannelTitle_03',
    },
  ]);
  return (
    <FlatList
      data={list}
      renderItem={({item}) => <ListItemView item={item} />}
    />
  );
}
