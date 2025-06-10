import BookmarkFilledIcon from "@/assets/images/bookmark-filled.svg";
import BookmarkIcon from "@/assets/images/bookmark.svg";
import Location from "@/assets/images/location.svg";
import Phone from "@/assets/images/phone.svg";
import Salary from "@/assets/images/rupee.svg";
import Colors from "@/constants/Colors";
import { useBookmark } from "@/contexts/BookmarkContext";
import { useRouter } from "expo-router";
import React from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type JobData = {
  id: number;
  title?: string;
  job_role?: string;
  company_name?: string;
  primary_details?: {
    Place?: string;
    Salary?: string;
  };
  whatsapp_no?: string;
};

type Props = {
  data: JobData;
};

const JobCard = ({ data }: Props) => {
  const router = useRouter();
  const { toggleBookmark, isBookmarked } = useBookmark();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const jobTitle = data?.job_role || data?.company_name || "Not specified";
  const location = data?.primary_details?.Place || "Not specified";
  const salary = data?.primary_details?.Salary || "Not specified";
  const phone = data?.whatsapp_no || "Not specified";

  const handlePress = () => {
    router.push({
      pathname: "/job/[id]",
      params: { id: data.id.toString(), initialData: JSON.stringify(data) },
    });
  };

  const handleBookmarkPress = () => {
    toggleBookmark(data);
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
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.9}
      style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text
            style={styles.title}
            numberOfLines={1}>
            {jobTitle}
          </Text>
          <TouchableOpacity
            onPress={handleBookmarkPress}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              {isBookmarked(data.id) ? (
                <BookmarkFilledIcon
                  width={24}
                  height={24}
                  color={Colors.primary}
                />
              ) : (
                <BookmarkIcon
                  width={24}
                  height={24}
                  color={Colors.gray500}
                />
              )}
            </Animated.View>
          </TouchableOpacity>
        </View>

        <View style={styles.detailRow}>
          <Location
            width={18}
            height={18}
            color={Colors.primary}
          />
          <Text
            style={styles.detailText}
            numberOfLines={1}>
            {location}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Salary
            width={18}
            height={18}
            color={Colors.primary}
          />
          <Text
            style={styles.detailText}
            numberOfLines={1}>
            {salary}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Phone
            width={18}
            height={18}
            color={Colors.primary}
          />
          <Text
            style={styles.detailText}
            numberOfLines={1}>
            {phone}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.gray100,
    borderRadius: 16,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: Colors.gray300,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontFamily: "poppins-semibold",
    fontSize: 16,
    color: Colors.darkText,
    flex: 1,
    marginRight: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  detailText: {
    fontFamily: "poppins-regular",
    fontSize: 14,
    color: Colors.gray700,
    flex: 1,
  },
});

export default JobCard;
