import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
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
import { DEFAULT_BLOG_CITY, getApiErrorMessage, getBlogById, getBlogs } from '../api/blogApi';
import { formatDisplayDate } from '../utils/date';
import type { Blog } from '../types/blog';
import type { MainStackParams } from '../types';
import { Platform, StatusBar as RNStatusBar } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

type Props = NativeStackScreenProps<MainStackParams, 'BlogDetail'>;

export default function BlogDetailScreen({ navigation, route }: Props) {
  const { width } = useWindowDimensions();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBlog = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getBlogById(route.params.blogId);
      setBlog(response);

      if (response) {
        const allBlogs = await getBlogs(DEFAULT_BLOG_CITY);
        const related = allBlogs
          .filter((b) => 
            b.id !== response.id && 
            b.category === response.category 
          )
          .slice(0, 5);
        setRelatedBlogs(related);
      }
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
            <>
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

              {/* Related Blogs Section */}
              {relatedBlogs.length > 0 && (
                <View style={s.relatedSection}>
                  <View style={s.relatedHeader}>
                    <Text style={s.relatedTitle}>Related Blogs</Text>
                    <TouchableOpacity activeOpacity={0.85} onPress={() => navigation.navigate('AllBlog')}>
                      <Text style={s.seeAll}>See All</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ paddingLeft: containerSpace }}>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={s.relatedList}
                    >
                      {relatedBlogs.map((item) => (
                        <TouchableOpacity
                          key={item.id}
                          activeOpacity={0.9}
                          style={s.relatedCard}
                          onPress={() => navigation.replace('BlogDetail', { blogId: item.id })}
                        >
                          <View style={{ gap: 10 }}>
                            {item.imageUrl ? (
                              <Image source={{ uri: item.imageUrl }} style={s.relatedImage} resizeMode="cover" />
                            ) : (
                              <View style={s.relatedImagePlaceholder} />
                            )}
                            <View style={s.relatedBody}>
                              <Text style={s.relatedCardTitle} numberOfLines={1}>
                                {item.title}
                              </Text>
                              <Text style={s.relatedCardDesc} numberOfLines={2}>
                                {item.excerpt}
                              </Text>
                              <View style={s.relatedReadButton}>
                                <Text style={s.relatedReadButtonText}>Read More</Text>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </View>
              )}
            </>
          )}
        </ScrollView>
      </View>
    </AppScreenWrapper>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, paddingTop: Platform.OS === 'ios' ? 30 : (RNStatusBar.currentHeight || 44) + 12, },
  content: { paddingTop: 16, paddingBottom: 120 },
  centerState: { marginHorizontal: containerSpace, marginTop: 12, borderRadius: 18, padding: 24, backgroundColor: '#F7FAFD', alignItems: 'center', gap: 10 },
  stateTitle: { fontFamily: FontFamily.semiBold, fontSize: 16, color: Colors.greyText, textAlign: 'center' },
  stateText: { fontFamily: FontFamily.regular, fontSize: 13, color: Colors.greyNormal, lineHeight: 19, textAlign: 'center' },
  retryButton: { marginTop: 4, borderRadius: 999, backgroundColor: Colors.primaryDark, paddingHorizontal: 16, paddingVertical: 10 },
  retryButtonText: { fontFamily: FontFamily.medium, fontSize: 13, color: Colors.white },
  articleWrap: { paddingHorizontal: containerSpace, gap: 10 },
  heroImage: { width: '100%', height: 210, borderRadius: 18, backgroundColor: '#D9ECFF' },
  date: { marginTop: 6, fontFamily: FontFamily.medium, fontSize: 12, color: Colors.primary },
  title: { fontFamily: FontFamily.semiBold, fontSize: 18, color: Colors.greyText, lineHeight: 26 },
  htmlBase: { color: Colors.greyNormal, fontFamily: FontFamily.regular, fontSize: 14, lineHeight: 20 },
  htmlParagraph: { marginTop: 0, marginBottom: 14, color: Colors.greyNormal, lineHeight: 20 },
  htmlHeading: { marginTop: 10, marginBottom: 12, color: Colors.primaryDark, fontFamily: FontFamily.semiBold, lineHeight: 28 },
  htmlListItem: { marginBottom: 2, color: Colors.greyNormal },
  htmlStrong: { color: Colors.greyText, fontFamily: FontFamily.semiBold },
  htmlLink: { color: Colors.primaryDark, textDecorationLine: 'underline' },
  relatedSection: { marginTop: 32 },
  relatedHeader: { marginHorizontal: containerSpace, marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  relatedTitle: { fontFamily: FontFamily.semiBold, fontSize: 16, color: Colors.greyText },
  seeAll: { fontFamily: FontFamily.medium, fontSize: 13, color: Colors.primary },
  relatedList: { gap: 12, paddingRight: containerSpace },
  relatedCard: { width: SCREEN_WIDTH * 0.75, borderRadius: 12, backgroundColor: '#E9EFF6', padding: 10 },
  relatedImage: { width: '100%', height: 140, borderRadius: 10 },
  relatedImagePlaceholder: { width: '100%', height: 140, borderRadius: 10, backgroundColor: '#D9ECFF' },
  relatedBody: { gap: 6 },
  relatedCardTitle: { fontFamily: FontFamily.semiBold, fontSize: 14, color: Colors.black },
  relatedCardDesc: { fontFamily: FontFamily.regular, fontSize: 11, color: '#282828', lineHeight: 16 },
  relatedReadButton: {
    alignSelf: 'flex-start',
    borderWidth: 0.5,
    borderColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'transparent',
    marginTop: 4,
  },
  relatedReadButtonText: { fontFamily: FontFamily.semiBold, fontSize: 10, color: Colors.greyText },
});
