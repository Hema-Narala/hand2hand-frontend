import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "../../Customer/CustomerComponentStyles/BookingCardStyles";

const BASE_URL = "http://10.0.2.2:5000";

export default function BookingCardW({
  booking,
  refreshBookings
}) {

  // worker should see customer

  const user = booking.customer;

  const profileImage =
    user?.profileImage ||
    `https://i.pravatar.cc/150?u=${booking._id}`;


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


  return (

    <View style={styles.card}>

      <Image
        source={{ uri: profileImage }}
        style={styles.profileImage}
      />

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


        {/* ACTIVE → cancel only */}

        {booking.status === "Active" && (

          <TouchableOpacity
            style={styles.actionButton}
            onPress={cancelBooking}
          >
            <Text>
              Cancel
            </Text>
          </TouchableOpacity>

        )}


        {/* COMPLETED → show rating + review */}

        {booking.status === "Completed" &&
          booking.reviewed && (

            <>

              {/* stars */}

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


              {/* review */}

              <Text
                style={{
                  marginTop: 5,
                  color:"fff"
                }}
              >
                Review: {booking.review}
              </Text>

            </>
        )}


        {/* CANCELLED → rebook */}

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