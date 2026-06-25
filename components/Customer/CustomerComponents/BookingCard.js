import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  TextInput
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "../CustomerComponentStyles/BookingCardStyles";
import BASE_URL from "../../../utils/api";

// const BASE_URL = "http://10.0.2.2:5000";

export default function BookingCard({
  booking,
  userType,
  refreshBookings
}) {

  const navigation = useNavigation();

  // ✅ customer should see worker

  const user = booking.worker;

  const profileImage =
    user?.profileImage ||
    `https://i.pravatar.cc/150?u=${booking._id}`;


  const [rating, setRating] =
    useState(0);

  const [reviewText, setReviewText] =
    useState("");

  const [showReview, setShowReview] =
    useState(false);


  // ================= COMPLETE =================

  const completeBooking = async () => {

    Alert.alert(
      "Complete booking?",
      "This cannot be undone",
      [
        { text: "No" },

        {
          text: "Yes",
          onPress: async () => {

            const token =
              await AsyncStorage.getItem("token");

            await fetch(
              `${BASE_URL}/api/bookings/complete/${booking._id}`,
              {
                method: "PATCH",
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            );

            refreshBookings();

          }
        }
      ]
    );
  };


  // ================= CANCEL =================

  const cancelBooking = async () => {

    const token =
      await AsyncStorage.getItem("token");

    await fetch(
      `${BASE_URL}/api/bookings/cancel/${booking._id}`,
      {
        method: "PATCH",
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    refreshBookings();

  };


  // ================= REBOOK =================

  const rebookBooking = async () => {

    const token =
      await AsyncStorage.getItem("token");

    await fetch(
      `${BASE_URL}/api/bookings/rebook/${booking._id}`,
      {
        method: "PATCH",
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    refreshBookings();

  };


  // ================= REVIEW =================

  const submitReview = async () => {

    const token =
      await AsyncStorage.getItem("token");

    await fetch(
      `${BASE_URL}/api/bookings/review/${booking._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
          Authorization:
            `Bearer ${token}`
        },
        body: JSON.stringify({
          rating,
          review: reviewText
        })
      }
    );

    setShowReview(false);

    refreshBookings();

  };


  // ================= STARS =================

  const renderStars = () => {

    return (

      <View
        style={{
          flexDirection: "row",
          marginTop: 5
        }}
      >

        {[1, 2, 3, 4, 5].map(n => (

          <TouchableOpacity
            key={n}
            disabled={booking.reviewed}
            onPress={() =>
              setRating(n)
            }
          >

            <Text
              style={{
                fontSize: 22,
                color:
                  n <= rating
                    ? "gold"
                    : "gray"
              }}
            >
              ★
            </Text>

          </TouchableOpacity>

        ))}

      </View>

    );

  };


  return (

    <View style={styles.card}>

      <TouchableOpacity
        onPress={() => {
          if (!booking.worker?._id) {
            console.log("Worker ID missing");
            return;
          }

          navigation.navigate("ViewWorkerProfile", {
            workerId: booking.worker._id
          });
        }}
      >
        <Image
          source={{ uri: profileImage }}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      <View style={styles.detailsContainer}>

        <Text>
          Username: {user?.username}
        </Text>

        <Text>
          Name: {user?.name}
        </Text>

        <Text>
          Phone: {user?.phone}
        </Text>

        <Text>
          Address: {user?.address}
        </Text>

        <Text>
          Service: {booking.service}
        </Text>

        <Text>
          Salary: ₹{booking.salary}
        </Text>

        <Text>
          Date:
          {new Date(
            booking.date
          ).toLocaleDateString()}
        </Text>


        {/* ACTIVE → 2 BUTTONS */}

        {booking.status === "Active" && (

          <View
            style={{
              flexDirection: "row",
              marginTop: 8
            }}
          >

            <TouchableOpacity
              style={styles.actionButtoncustomer}
              onPress={cancelBooking}
            >
              <Text>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButtoncustomer}
              onPress={completeBooking}
            >
              <Text>
                Completed
              </Text>
            </TouchableOpacity>

          </View>

        )}


        {/* COMPLETED */}

        {booking.status === "Completed" &&
          !booking.reviewed && (

            <>

              {renderStars()}

              <TouchableOpacity
                onPress={() =>
                  setShowReview(true)
                }
              >
                <Text
                style={styles.reviewButton}
                >
                  Add Review
                </Text>
              </TouchableOpacity>

            </>
          )}


        {/* REVIEW BOX */}

        {showReview && (

          <>

            <TextInput
              placeholder="Write review"
              value={reviewText}
              onChangeText={
                setReviewText
              }
              style={{
                borderWidth: 1,
                marginTop: 5
              }}
            />

            <TouchableOpacity
              onPress={submitReview}
            >
              <Text>
                Submit
              </Text>
            </TouchableOpacity>

          </>
        )}

        {booking.status === "Completed" &&
          booking.reviewed && (

            <>

              {/* show saved stars */}

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 5
                }}
              >

                {[1, 2, 3, 4, 5].map(n => (

                  <Text
                    key={n}
                    style={{
                      fontSize: 22,
                      color:
                        n <= booking.rating
                          ? "gold"
                          : "gray"
                    }}
                  >
                    ★
                  </Text>

                ))}

              </View>


              {/* show review text */}

              <Text
                // style={styles.sideheading}
              >
                Review: <Text style={styles.heading}>{booking.review}</Text>
              </Text>

            </>
        )}


        {/* CANCELLED */}

        {booking.status === "Cancelled" &&
          !booking.rebooked && (

            <TouchableOpacity
              style={styles.actionButton}
              onPress={rebookBooking}
            >
              <Text>
                Rebook
              </Text>
            </TouchableOpacity>

          )}

      </View>

    </View>

  );

}