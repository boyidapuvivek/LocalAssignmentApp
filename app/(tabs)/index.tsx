import Header from "@/components/Header";
import JobCard from "@/components/JobCard";
import Loader from "@/components/Loader";
import Colors from "@/constants/Colors";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

const HomeScreen = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchJobs = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://testapi.getlokalapp.com/common/jobs?page=${page}`
      );
      const data = await res.json();

      if (data?.results?.length) {
        const validJobs = data.results.filter(
          (job) => job && (job.title || job.job_role || job.company_name)
        );

        if (validJobs.length > 0) {
          setJobs((prev) => [...prev, ...validJobs]);
          setPage((prev) => prev + 1);
        } else {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching jobs: ", err);
    }

    setLoading(false);
  }, [loading, hasMore, page]);

  useEffect(() => {
    fetchJobs();
  }, []);

  if (jobs.length === 0 && loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Header
        title='Jobs Listings'
        showback={false}
      />
      <FlatList
        data={jobs}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        renderItem={({ item }) => <JobCard data={item} />}
        onEndReached={fetchJobs}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={loading ? <Loader fullScreen={false} /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.transparent,
    gap: 10,
  },
});

export default HomeScreen;
