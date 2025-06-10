import BookmarkFilledIcon from "@/assets/images/bookmark-filled.svg";
import BookmarkIcon from "@/assets/images/bookmark.svg";
import Location from "@/assets/images/location.svg";
import Phone from "@/assets/images/phone.svg";
import Salary from "@/assets/images/rupee.svg";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";

import { useBookmark } from "@/contexts/BookmarkContext";
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

  const jobTitle = data?.job_role || data?.company_name || "NA";
  const location = data?.primary_details?.Place || "NA";
  const salary = data?.primary_details?.Salary || "NA";
  const phone = data?.whatsapp_no || "NA";

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
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{jobTitle}</Text>
          <TouchableOpacity onPress={handleBookmarkPress}>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              {isBookmarked(data.id) ? (
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
        </View>

        <View style={styles.row}>
          <Location
            width={20}
            height={20}
          />
          <Text style={styles.text}>{location}</Text>
        </View>

        <View style={styles.row}>
          <Salary
            width={20}
            height={20}
          />
          <Text style={styles.text}>{salary}</Text>
        </View>

        <View style={styles.row}>
          <Phone
            width={20}
            height={20}
          />
          <Text style={styles.text}>{phone}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    backgroundColor: Colors.transparent,
    borderRadius: 18,
    gap: 10,
    marginBottom: 12,
  },
  title: {
    fontFamily: "poppins-semibold",
    fontSize: 18,
    color: Colors.darktext,
    marginBottom: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  text: {
    fontFamily: "poppins-regular",
    fontSize: 16,
    color: Colors.grey,
    flex: 1,
  },
});

export default JobCard;
