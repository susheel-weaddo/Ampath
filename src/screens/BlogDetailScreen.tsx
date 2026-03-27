import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import RenderHTML from 'react-native-render-html';
import { AppScreenWrapper, PlainHeader } from '../components';
import { Colors, FontFamily, containerSpace } from '../theme';
import { getApiErrorMessage, getBlogById } from '../api/blogApi';
import { formatDisplayDate } from '../utils/date';
import type { Blog } from '../types/blog';
import type { MainStackParams } from '../types';

type Props = NativeStackScreenProps<MainStackParams, 'BlogDetail'>;

export default function BlogDetailScreen({ navigation, route }: Props) {
  const { width } = useWindowDimensions();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBlog = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getBlogById(route.params.blogId);
      setBlog(response);
    } catch (fetchError) {
      setError(getApiErrorMessage(fetchError));
    } finally {
      setLoading(false);
    }
  }, [route.params.blogId]);

  useEffect(() => {
    void loadBlog();
  }, [loadBlog]);

  return (
    <AppScreenWrapper>
      <View style={s.container}>
        <StatusBar style="dark" />
        <PlainHeader title="Blog Detail" onBack={() => navigation.goBack()} />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.content}>
          {loading ? (
            <View style={s.centerState}>
              <ActivityIndicator size="small" color={Colors.primaryDark} />
              <Text style={s.stateText}>Loading article...</Text>
            </View>
          ) : error ? (
            <View style={s.centerState}>
              <Text style={s.stateTitle}>Unable to load article</Text>
              <Text style={s.stateText}>{error}</Text>
              <TouchableOpacity style={s.retryButton} activeOpacity={0.88} onPress={() => void loadBlog()}>
                <Text style={s.retryButtonText}>Try again</Text>
              </TouchableOpacity>
            </View>
          ) : !blog ? (
            <View style={s.centerState}>
              <Text style={s.stateTitle}>Article not found</Text>
              <Text style={s.stateText}>This blog could not be found or is no longer available.</Text>
            </View>
          ) : (
            <View style={s.articleWrap}>
              {blog.imageUrl ? <Image source={{ uri: blog.imageUrl }} style={s.heroImage} resizeMode="cover" /> : null}
              <Text style={s.date}>{formatDisplayDate(blog.createdAt)}</Text>
              <Text style={s.title}>{blog.title}</Text>

              <RenderHTML
                contentWidth={width - containerSpace * 2}
                source={{ html: blog.content || '<p>No content available.</p>' }}
                baseStyle={s.htmlBase}
                tagsStyles={{
                  p: s.htmlParagraph,
                  h1: s.htmlHeading,
                  h2: s.htmlHeading,
                  h3: s.htmlHeading,
                  li: s.htmlListItem,
                  strong: s.htmlStrong,
                  a: s.htmlLink,
                }}
              />
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
  centerState: { marginHorizontal: containerSpace, marginTop: 12, borderRadius: 18, padding: 24, backgroundColor: '#F7FAFD', alignItems: 'center', gap: 10 },
  stateTitle: { fontFamily: FontFamily.semiBold, fontSize: 16, color: Colors.greyText, textAlign: 'center' },
  stateText: { fontFamily: FontFamily.regular, fontSize: 13, color: Colors.greyNormal, lineHeight: 19, textAlign: 'center' },
  retryButton: { marginTop: 4, borderRadius: 999, backgroundColor: Colors.primaryDark, paddingHorizontal: 16, paddingVertical: 10 },
  retryButtonText: { fontFamily: FontFamily.medium, fontSize: 13, color: Colors.white },
  articleWrap: { paddingHorizontal: containerSpace, gap: 10 },
  heroImage: { width: '100%', height: 210, borderRadius: 18, backgroundColor: '#D9ECFF' },
  date: { marginTop: 6, fontFamily: FontFamily.medium, fontSize: 12, color: Colors.primary },
  title: { fontFamily: FontFamily.semiBold, fontSize: 22, color: Colors.greyText, lineHeight: 30 },
  htmlBase: { color: Colors.greyNormal, fontFamily: FontFamily.regular, fontSize: 15, lineHeight: 24 },
  htmlParagraph: { marginTop: 0, marginBottom: 14, color: Colors.greyNormal, lineHeight: 24 },
  htmlHeading: { marginTop: 10, marginBottom: 12, color: Colors.primaryDark, fontFamily: FontFamily.semiBold, lineHeight: 28 },
  htmlListItem: { marginBottom: 8, color: Colors.greyNormal },
  htmlStrong: { color: Colors.greyText, fontFamily: FontFamily.semiBold },
  htmlLink: { color: Colors.primaryDark, textDecorationLine: 'underline' },
});
