import {FlatList} from 'react-native';
import React, {useEffect} from 'react';
import ListItemView from './ListItemView';
import {useYoutubeData} from '../hook/useYoutubeData';

export default function ListView() {
  const {data, loadData, loadMoreData} = useYoutubeData();

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <FlatList
      data={data}
      renderItem={({item}) => <ListItemView item={item} />}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.1}
    />
  );
}
