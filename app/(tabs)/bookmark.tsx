import Header from "@/components/Header";
import JobCard from "@/components/JobCard";
import Colors from "@/constants/Colors";
import { useBookmark } from "@/contexts/BookmarkContext";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function BookmarkScreen() {
  const { bookmarkedJobs } = useBookmark();

  return (
    <View style={styles.container}>
      <Header
        title='Saved Jobs'
        showback={true}
        style={styles.header}
      />

      {bookmarkedJobs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No saved jobs yet</Text>
          <Text style={styles.emptySubtitle}>
            Tap the bookmark icon on jobs to save them here
          </Text>
        </View>
      ) : (
        <FlatList
          data={bookmarkedJobs}
          renderItem={({ item }) => <JobCard data={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontFamily: "poppins-semibold",
    fontSize: 18,
    color: Colors.darkText,
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {
    fontFamily: "poppins-regular",
    fontSize: 14,
    color: Colors.gray600,
    textAlign: "center",
    lineHeight: 22,
  },
  separator: {
    height: 12,
  },
});

export default BookmarkScreen;
