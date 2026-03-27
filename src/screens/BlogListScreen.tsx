import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppScreenWrapper, PlainHeader } from '../components';
import { Colors, FontFamily, containerSpace } from '../theme';
import { DEFAULT_BLOG_CITY, getApiErrorMessage, getBlogs } from '../api/blogApi';
import { formatDisplayDate } from '../utils/date';
import type { Blog } from '../types/blog';
import type { MainStackParams } from '../types';

type Props = NativeStackScreenProps<MainStackParams, 'AllBlog'>;

export default function BlogListScreen({ navigation }: Props) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadBlogs = useCallback(async (options?: { silent?: boolean }) => {
    const silent = options?.silent ?? false;

    if (!silent) {
      setLoading(true);
    }

    setError(null);

    try {
      const response = await getBlogs(DEFAULT_BLOG_CITY);
      setBlogs(response);
    } catch (fetchError) {
      setError(getApiErrorMessage(fetchError));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadBlogs();
  }, [loadBlogs]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    void loadBlogs({ silent: true });
  }, [loadBlogs]);

  return (
    <AppScreenWrapper>
      <View style={s.container}>
        <StatusBar style="dark" />
        <PlainHeader title="Blogs" onBack={() => navigation.goBack()} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={s.content}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primaryDark} />}
        >
          <View style={s.intro}>
            <Text style={s.introTitle}>Latest health reads</Text>
            <Text style={s.introText}>Showing blogs for `{DEFAULT_BLOG_CITY}`. Replace this default city in [src/api/blogApi.ts].</Text>
          </View>

          {loading ? (
            <View style={s.centerState}>
              <ActivityIndicator size="small" color={Colors.primaryDark} />
              <Text style={s.stateText}>Loading blogs...</Text>
            </View>
          ) : error ? (
            <View style={s.centerState}>
              <Text style={s.stateTitle}>Unable to load blogs</Text>
              <Text style={s.stateText}>{error}</Text>
              <TouchableOpacity style={s.retryButton} activeOpacity={0.88} onPress={() => void loadBlogs()}>
                <Text style={s.retryButtonText}>Try again</Text>
              </TouchableOpacity>
            </View>
          ) : blogs.length === 0 ? (
            <View style={s.centerState}>
              <Text style={s.stateTitle}>No blogs found</Text>
              <Text style={s.stateText}>We could not find any blog posts for the selected city right now.</Text>
            </View>
          ) : (
            <View style={s.list}>
              {blogs.map((blog) => (
                <TouchableOpacity
                  key={blog.id}
                  style={s.card}
                  activeOpacity={0.92}
                  onPress={() => navigation.navigate('BlogDetail', { blogId: blog.id })}
                >
                  {blog.imageUrl ? <Image source={{ uri: blog.imageUrl }} style={s.cardImage} resizeMode="cover" /> : <View style={s.cardImagePlaceholder} />}
                  <View style={s.cardBody}>
                    <Text style={s.cardDate}>{formatDisplayDate(blog.createdAt)}</Text>
                    <Text style={s.cardTitle}>{blog.title}</Text>
                    <Text style={s.cardDescription} numberOfLines={3}>
                      {blog.excerpt}
                    </Text>
                    <View style={s.readButton}>
                      <Text style={s.readButtonText}>Read more</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </AppScreenWrapper>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { paddingTop: 16, paddingBottom: 120 },
  intro: { marginHorizontal: containerSpace, marginBottom: 18, padding: 16, borderRadius: 18, backgroundColor: '#EEF5FD', gap: 6 },
  introTitle: { fontFamily: FontFamily.semiBold, fontSize: 16, color: Colors.primaryDark },
  introText: { fontFamily: FontFamily.regular, fontSize: 12, color: Colors.greyNormal, lineHeight: 18 },
  centerState: { marginHorizontal: containerSpace, marginTop: 20, borderRadius: 18, padding: 24, backgroundColor: '#F7FAFD', alignItems: 'center', gap: 10 },
  stateTitle: { fontFamily: FontFamily.semiBold, fontSize: 16, color: Colors.greyText, textAlign: 'center' },
  stateText: { fontFamily: FontFamily.regular, fontSize: 13, color: Colors.greyNormal, lineHeight: 19, textAlign: 'center' },
  retryButton: { marginTop: 4, borderRadius: 999, backgroundColor: Colors.primaryDark, paddingHorizontal: 16, paddingVertical: 10 },
  retryButtonText: { fontFamily: FontFamily.medium, fontSize: 13, color: Colors.white },
  list: { paddingHorizontal: containerSpace, gap: 14 },
  card: { borderRadius: 18, overflow: 'hidden', backgroundColor: '#F2F7FC', borderWidth: 1, borderColor: '#E1EAF4' },
  cardImage: { width: '100%', height: 180, backgroundColor: '#D9ECFF' },
  cardImagePlaceholder: { width: '100%', height: 180, backgroundColor: '#D9ECFF' },
  cardBody: { padding: 14, gap: 8 },
  cardDate: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.primary },
  cardTitle: { fontFamily: FontFamily.semiBold, fontSize: 16, color: Colors.greyText, lineHeight: 22 },
  cardDescription: { fontFamily: FontFamily.regular, fontSize: 13, color: Colors.greyNormal, lineHeight: 20 },
  readButton: { alignSelf: 'flex-start', marginTop: 2, borderWidth: 1, borderColor: Colors.primaryDark, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8 },
  readButtonText: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.primaryDark },
});
