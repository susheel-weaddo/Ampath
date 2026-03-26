import React, { useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AppScreenWrapper, PlainHeader } from '../../components';
import { Colors, FontFamily } from '../../theme';
import { BLOG_CATEGORIES, BLOGS } from '../../constants/blogs';

export default function AllBlogScreen({ navigation }: any) {
  const [activeCategory, setActiveCategory] = useState<(typeof BLOG_CATEGORIES)[number]>('All');

  const filteredBlogs = useMemo(() => {
    if (activeCategory === 'All') return BLOGS;
    return BLOGS.filter((blog) => blog.category === activeCategory);
  }, [activeCategory]);

  return (
    <AppScreenWrapper>
      <View style={s.container}>
        <StatusBar style="dark" />
        <PlainHeader title="All Blog" onBack={() => navigation.goBack()} />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.content}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.chipRow}
          >
            {BLOG_CATEGORIES.map((category) => {
              const isActive = category === activeCategory;
              return (
                <TouchableOpacity
                  key={category}
                  activeOpacity={0.9}
                  style={[s.chip, isActive && s.chipActive]}
                  onPress={() => setActiveCategory(category)}
                >
                  <Text style={[s.chipText, isActive && s.chipTextActive]}>{category}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={s.list}>
            {filteredBlogs.map((blog) => (
              <TouchableOpacity
                key={blog.id}
                style={s.card}
                activeOpacity={0.92}
                onPress={() => navigation.navigate('BlogDetail', { blogId: blog.id })}
              >
                <Image source={blog.image} style={s.cardImage} resizeMode="cover" />
                <View style={s.cardBody}>
                  <Text style={s.cardTitle}>{blog.title}</Text>
                  <Text style={s.cardDescription}>{blog.description}</Text>
                  <TouchableOpacity
                    style={s.readButton}
                    activeOpacity={0.85}
                    onPress={() => navigation.navigate('BlogDetail', { blogId: blog.id })}
                  >
                    <Text style={s.readButtonText}>Read More</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </AppScreenWrapper>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { paddingTop: 14, paddingBottom: 120 },
  chipRow: { paddingHorizontal: 16, gap: 8, paddingBottom: 18 },
  chip: {
    height: 28,
    borderRadius: 999,
    paddingHorizontal: 14,
    backgroundColor: '#F4F4F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: {
    backgroundColor: Colors.primaryDark,
  },
  chipText: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    color: '#787878',
  },
  chipTextActive: {
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  list: {
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    borderRadius: 10,
    backgroundColor: '#E9EFF6',
    padding: 11,
    gap: 10,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    backgroundColor: '#D9ECFF',
  },
  cardBody: {
    gap: 6,
  },
  cardTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: 14,
    color: Colors.black,
  },
  cardDescription: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    color: '#282828',
  },
  readButton: {
    alignSelf: 'flex-start',
    borderWidth: 0.5,
    borderColor: Colors.primary,
    borderRadius: 20,
    height: 28,
    paddingHorizontal: 18,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginTop: 2,
  },
  readButtonText: {
    fontFamily: FontFamily.semiBold,
    fontSize: 12,
    color: Colors.greyText,
  },
});
