import BookmarkFilledIcon from "@/assets/images/bookmark-filled.svg";
import BookmarkIcon from "@/assets/images/bookmark.svg";
import Header from "@/components/Header";
import { useBookmark } from "@/contexts/BookmarkContext";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const JobDetailsScreen = () => {
  const { id, initialData } = useLocalSearchParams<{
    id: string;
    initialData?: string;
  }>();
  const [job, setJob] = useState(initialData ? JSON.parse(initialData) : null);
  const [error, setError] = useState<string | null>(null);
  const { bookmarkedJobs, toggleBookmark, isBookmarked } = useBookmark();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handleBookmarkPress = () => {
    if (job) {
      toggleBookmark(job);
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.3,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  if (error) {
    return (
      <ScrollView contentContainerStyle={[styles.container, styles.center]}>
        <Text style={styles.error}>{error}</Text>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title={job?.job_role || job?.company_name || "NA"}
        showback={true}>
        <TouchableOpacity onPress={handleBookmarkPress}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            {job && isBookmarked(job.id) ? (
              <BookmarkFilledIcon
                width={24}
                height={24}
              />
            ) : (
              <BookmarkIcon
                width={24}
                height={24}
              />
            )}
          </Animated.View>
        </TouchableOpacity>
      </Header>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Location:</Text>
        <Text style={styles.value}>{job?.primary_details?.Place || "NA"}</Text>

        <Text style={styles.label}>Salary:</Text>
        <Text style={styles.value}>{job?.primary_details?.Salary || "NA"}</Text>

        <Text style={styles.label}>Contact:</Text>
        <Text style={styles.value}>{job?.whatsapp_no || "NA"}</Text>

        {/* Add more job details as needed */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginTop: 12,
    fontWeight: "600",
  },
  value: {
    fontSize: 16,
    marginBottom: 8,
  },
  error: {
    color: "red",
    fontSize: 16,
  },
});

export default JobDetailsScreen;
