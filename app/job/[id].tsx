import Applicants from "@/assets/images/applicants.svg";
import BookmarkFilledIcon from "@/assets/images/bookmark-filled.svg";
import BookmarkIcon from "@/assets/images/bookmark.svg";
import Jobtype from "@/assets/images/briefcase.svg";
import Clock from "@/assets/images/clock.svg";
import Location from "@/assets/images/location.svg";
import Phone from "@/assets/images/phone.svg";
import Salary from "@/assets/images/rupee.svg";
import Header from "@/components/Header";
import Colors from "@/constants/Colors";
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
        title={"Job Details"}
        showback={true}>
        <TouchableOpacity onPress={handleBookmarkPress}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            {job && isBookmarked(job.id) ? (
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
      </Header>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {/* Job Header Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.jobTitle}>{job?.job_role}</Text>
          <Text style={styles.companyName}>{job?.company_name}</Text>
          <View style={styles.applicantsContainer}>
            <Applicants
              height={18}
              width={18}
              color={Colors.primary}
            />
            <Text style={styles.applicantsText}>
              {job?.num_applications} applicants
            </Text>
          </View>
        </View>

        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Jobtype
              height={18}
              width={18}
              color={Colors.primary}
            />
            <Text style={styles.detailText}>
              {job?.primary_details?.Job_Type}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Clock
              height={18}
              width={18}
              color={Colors.primary}
            />
            <Text style={styles.detailText}>{job?.job_hours}</Text>
          </View>

          <View style={styles.detailRow}>
            <Location
              height={18}
              width={18}
              color={Colors.primary}
            />
            <Text style={styles.detailText}>{job?.primary_details?.Place}</Text>
          </View>

          <View style={styles.detailRow}>
            <Salary
              height={18}
              width={18}
              color={Colors.primary}
            />
            <Text style={styles.detailText}>
              {job?.primary_details?.Salary}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Phone
              height={18}
              width={18}
              color={Colors.primary}
            />
            <Text style={styles.detailText}>{job?.whatsapp_no}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About {job?.company_name}</Text>
          <Text style={styles.sectionContent}>{job?.title}</Text>
        </View>

        {/* More Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Job Requirements</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Openings</Text>
            <Text style={styles.infoValue}>{job?.openings_count}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Experience</Text>
            <Text style={styles.infoValue}>
              {job?.primary_details?.Experience}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Qualification</Text>
            <Text style={styles.infoValue}>
              {job?.primary_details?.Qualification}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Category</Text>
            <Text style={styles.infoValue}>{job?.job_category}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingVertical: 20,
    paddingBottom: 40,
    gap: 24,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: Colors.error,
    fontSize: 16,
    fontFamily: "poppins-medium",
  },
  headerContainer: {
    marginTop: 8,
    gap: 8,
  },
  jobTitle: {
    fontFamily: "poppins-semibold",
    fontSize: 24,
    color: Colors.darkText,
    lineHeight: 32,
  },
  companyName: {
    fontFamily: "poppins-medium",
    fontSize: 16,
    color: Colors.gray700,
  },
  applicantsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },
  applicantsText: {
    fontFamily: "poppins-regular",
    fontSize: 14,
    color: Colors.gray600,
  },
  detailsCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    gap: 16,
    shadowColor: Colors.gray800,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.gray200,
  },
  detailRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  detailText: {
    fontFamily: "poppins-regular",
    fontSize: 15,
    color: Colors.gray700,
    flex: 1,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontFamily: "poppins-semibold",
    fontSize: 18,
    color: Colors.darkText,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  sectionContent: {
    fontFamily: "poppins-regular",
    fontSize: 14,
    color: Colors.gray700,
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  infoLabel: {
    fontFamily: "poppins-medium",
    fontSize: 14,
    color: Colors.gray600,
  },
  infoValue: {
    fontFamily: "poppins-regular",
    fontSize: 14,
    color: Colors.darkText,
    textAlign: "right",
    flex: 1,
    paddingLeft: 16,
  },
});

export default JobDetailsScreen;
