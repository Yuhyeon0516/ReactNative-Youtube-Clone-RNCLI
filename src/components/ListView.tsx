import {FlatList} from 'react-native';
import React, {useEffect} from 'react';
import ListItemView from './ListItemView';
import {useYoutubeData} from '../hook/useYoutubeData';

export default function ListView() {
  const {data, loadData} = useYoutubeData();

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <FlatList
      data={data}
      renderItem={({item}) => <ListItemView item={item} />}
    />
  );
}
