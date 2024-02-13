import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

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
  useEffect(() => {
    const subscription = Notifications.addNotificationHandler(
      (notification) => {
        console.log("NOTIFICATION RECEIVED");
        console.log(notification);
        const userName = notification.request.content.data.userName;
        console.log(userName)
      }
    );

    Notifications.addNotificationResponseReceivedListener((response)=>{
      console.log("NOTIFICATION RESPONSE RECEIVED");
        console.log(response);
    });

    return () => {
      subscription.remove();
      subscription1.remove();
    };
  }, []);
  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationHandler({
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
