import {useCallback, useState} from 'react';
import {TypeListItem} from '../type/TypeListItem';
import axios from 'axios';
import {API_KEY} from '@env';

type TypeVideoListResponse = {
  kind: 'youtube#videoListResponse';
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: {
    kind: 'youtube#video';
    etag: string;
    id: string;
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
        [key: string]: {
          url: string;
          width: number;
          height: number;
        };
      };
      channelTitle: string;
      tags: string[];
      categoryId: string;
    };
    contentDetails: {
      duration: string;
      dimension: string;
      definition: string;
      caption: string;
      licensedContent: boolean;
      regionRestriction: {
        allowed: [string];
        blocked: [string];
      };
      contentRating: {
        mpaaRating: string;
        tvpgRating: string;
        bbfcRating: string;
        chvrsRating: string;
        eirinRating: string;
        cbfcRating: string;
        fmocRating: string;
        icaaRating: string;
        acbRating: string;
        oflcRating: string;
        fskRating: string;
        kmrbRating: string;
        djctqRating: string;
        russiaRating: string;
        rtcRating: string;
        ytRating: string;
      };
    };
    statistics: {
      viewCount: string;
      likeCount: string;
      dislikeCount: string;
      favoriteCount: string;
      commentCount: string;
    };
  }[];
};

const axiosInstance = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
});

export function useYoutubeData() {
  const [data, setData] = useState<TypeListItem[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [nextPageCursor, setNextPageCursor] = useState<string | null>(null);

  async function fetchUsedAxios() {
    try {
      const videoResults = await axiosInstance.get<TypeVideoListResponse>(
        '/videos',
        {
          params: {
            key: API_KEY,
            part: 'snippet, contentDetails, statistics',
            chart: 'mostPopular',
            regionCode: 'KR',
          },
        },
      );

      const videoData = videoResults.data;
      setData(
        videoData.items.map(item => ({
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          publishedAt: item.snippet.publishedAt,
          viewCount: parseInt(item.statistics.viewCount, 10),
          channelTtile: item.snippet.channelTitle,
        })),
      );

      setHasNextPage(typeof videoData.nextPageToken !== 'undefined');
      setNextPageCursor(
        typeof videoData.nextPageToken !== 'undefined'
          ? videoData.nextPageToken
          : null,
      );
    } catch (error) {
      console.error(error);
    }
  }

  const loadData = useCallback(fetchUsedAxios, []);

  async function fetchUsedAxiosToMoreData() {
    if (!hasNextPage) {
      return;
    }

    try {
      const videoResults = await axiosInstance.get<TypeVideoListResponse>(
        '/videos',
        {
          params: {
            key: API_KEY,
            part: 'snippet, contentDetails, statistics',
            chart: 'mostPopular',
            regionCode: 'KR',
            pageToken: nextPageCursor,
          },
        },
      );

      const videoData = videoResults.data;
      setData(prev =>
        prev.concat(
          videoData.items.map(item => ({
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high.url,
            publishedAt: item.snippet.publishedAt,
            viewCount: parseInt(item.statistics.viewCount, 10),
            channelTtile: item.snippet.channelTitle,
          })),
        ),
      );

      setHasNextPage(typeof videoData.nextPageToken !== 'undefined');
      setNextPageCursor(
        typeof videoData.nextPageToken !== 'undefined'
          ? videoData.nextPageToken
          : null,
      );
    } catch (error) {
      console.error(error);
    }
  }

  const loadMoreData = useCallback(fetchUsedAxiosToMoreData, [
    hasNextPage,
    nextPageCursor,
  ]);

  return {
    data,
    loadData,
    loadMoreData,
  };
}
