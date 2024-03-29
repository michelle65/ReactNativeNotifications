import React, { useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  const notificationHandlerSubscription = useRef();
  const notificationResponseSubscription = useRef();

  useEffect(() => {
    notificationHandlerSubscription.current = Notifications.setNotificationHandler((notification) => {
      console.log("NOTIFICATION RECEIVED");
      console.log(notification);
      const userName = notification.request.content.data.userName;
      console.log(userName)
    });

    notificationResponseSubscription.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("NOTIFICATION RESPONSE RECEIVED");
      console.log(response);
      const userName = response.notification.request.content.data.userName;
      console.log(userName);
    });

    return () => {
      notificationHandlerSubscription.current.remove();
      notificationResponseSubscription.current.remove();
    };
  }, []);

  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "My first local notification.",
        body: "This is the body of the notification.",
        data: { userName: "Max" },
      },
      trigger: {
        seconds: 5,
      },
    });
  }

  return (
    <View style={styles.container}>
      <Button
        title="Schedule Notification"
        onPress={scheduleNotificationHandler}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
