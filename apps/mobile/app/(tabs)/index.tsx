import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image } from 'react-native';

export default function HomeScreen() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://192.168.1.25:1338/api/articles?populate=image')
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const getImageUrl = (item: any) => {
    const url = item?.image?.data?.attributes?.url;
    return url ? `http://192.168.1.25:1338${url}` : undefined;
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>
        Articles from Strapi
      </Text>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 18 }}>
                {item?.title ?? 'Ingen titel'}
              </Text>
              <Text>
                {item?.content
                  ? Array.isArray(item.content)
                    ? item.content.map(
                        (block: any) =>
                          block.children?.map((child: any) => child.text).join(' ')
                      ).join(' ')
                    : typeof item.content === 'string'
                      ? item.content
                      : ''
                  : ''}
              </Text>
              {getImageUrl(item) && (
                <Image
                  source={{ uri: getImageUrl(item) }}
                  style={{ width: 200, height: 120, marginTop: 10 }}
                  resizeMode="cover"
                />
              )}
            </View>
          )}
        />
      )}
    </View>
  );
}



