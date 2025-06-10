import Location from "@/assets/images/location.svg";
import Phone from "@/assets/images/phone.svg";
import Salary from "@/assets/images/rupee.svg";
import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  data: {
    id?: number;
    title?: string;
    job_role?: string;
    company_name?: string;
    primary_details?: {
      Place?: string;
      Salary?: string;
    };
    whatsapp_no?: string;
  };
};

const JobCard = ({ data }: Props) => {
  // Handle different possible title fields
  const jobTitle =
    data?.title || data?.job_role || data?.company_name || "Job Position";
  const location = data?.primary_details?.Place || "Location not specified";
  const salary = data?.primary_details?.Salary || "Salary not disclosed";
  const phone = data?.whatsapp_no || "Contact not available";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{jobTitle}</Text>

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
