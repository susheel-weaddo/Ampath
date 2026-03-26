import React, { useMemo } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AppScreenWrapper, PlainHeader } from '../../components';
import { BLOGS } from '../../constants/blogs';
import { Colors, FontFamily } from '../../theme';
import { Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
export default function BlogDetailScreen({ navigation, route }: any) {
  const blogId = route?.params?.blogId as string | undefined;

  const blog = useMemo(() => BLOGS.find((item) => item.id === blogId) ?? BLOGS[0], [blogId]);
  const relatedBlogs = useMemo(
    () => BLOGS.filter((item) => item.id !== blog.id).slice(0, 2),
    [blog.id],
  );



  return (
    <AppScreenWrapper>
      <View style={s.container}>
        <StatusBar style="dark" />
        <PlainHeader title="Back" onBack={() => navigation.goBack()} />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.content}>
          <View style={{ paddingHorizontal: 16 }}>
            <Image source={blog.image} style={s.heroImage} resizeMode="cover" />
            <View style={s.articleBlock}>
              <Text style={s.title}>{blog.title}</Text>
              {blog.content.map((paragraph, index) => (
                <Text key={`${blog.id}-${index}`} style={s.body}>
                  {paragraph}
                </Text>
              ))}
            </View>
            <View style={s.relatedHeader}>
              <Text style={s.relatedTitle}>Related Blogs</Text>
              <TouchableOpacity activeOpacity={0.85} onPress={() => navigation.navigate('AllBlog')}>
                <Text style={s.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>
          </View>

            <View style={{paddingLeft: 16}}>
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
                      <Image source={item.image} style={s.relatedImage} resizeMode="cover" />
                      <View style={s.relatedBody}>
                        <Text style={s.relatedCardTitle} numberOfLines={1}>{item.title}</Text>
                        <Text style={s.relatedCardDesc} numberOfLines={1}>{item.description}</Text>
                        <View style={s.readButton}>
                          <Text style={s.readButtonText}>Read More</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
        </ScrollView>
      </View>
    </AppScreenWrapper>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { paddingTop: 14, paddingBottom: 120 },
  heroImage: { width: '100%', height: 146, borderRadius: 10, backgroundColor: '#D9ECFF' },
  articleBlock: { marginTop: 12, gap: 10 },
  title: { fontFamily: FontFamily.semiBold, fontSize: 15, color: Colors.primaryDark },
  body: { fontFamily: FontFamily.regular, fontSize: 12, lineHeight: 17, color: '#5F5F5F' },
  relatedHeader: { marginTop: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  relatedTitle: { fontFamily: FontFamily.semiBold, fontSize: 14, color: Colors.greyText },
  seeAll: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.primaryDark },
  relatedList: { gap: 12, paddingTop: 12, paddingRight: 4 },
  relatedCard: { width: SCREEN_WIDTH * 0.75, borderRadius: 10, backgroundColor: '#E9EFF6', padding: 8, gap: 8 },
  relatedImage: { width: "100%", borderRadius: 12 },
  relatedBody: { gap: 4 },
  relatedCardTitle: { fontFamily: FontFamily.semiBold, fontSize: 12, color: Colors.black },
  relatedCardDesc: { fontFamily: FontFamily.regular, fontSize: 10, color: '#282828' },
  readButton: {
    alignSelf: 'flex-start',
    borderWidth: 0.5,
    borderColor: Colors.primary,
    borderRadius: 20,
    height: 20,
    paddingHorizontal: 12,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginTop: 2,
  },
  readButtonText: { fontFamily: FontFamily.semiBold, fontSize: 8, color: Colors.greyText },
});
