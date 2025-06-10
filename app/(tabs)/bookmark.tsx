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
        title='Bookmarks'
        showback={true}
      />
      {bookmarkedJobs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No bookmarked jobs yet</Text>
        </View>
      ) : (
        <FlatList
          data={bookmarkedJobs}
          renderItem={({ item }) => <JobCard data={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: Colors.grey,
  },
});
