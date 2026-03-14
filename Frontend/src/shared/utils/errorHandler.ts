import { Alert } from "react-native";

export function handleError(error: any) {
  console.error("Error:", error);

  const message =
    error?.response?.data?.message ||
    error?.message ||
    "An unexpected error occurred";

  Alert.alert("Error", message, [{ text: "OK" }]);
}

export function showSuccess(message: string) {
  Alert.alert("Success", message, [{ text: "OK" }]);
}

export function showConfirm(
  title: string,
  message: string,
  onConfirm: () => void,
  onCancel?: () => void
) {
  Alert.alert(title, message, [
    {
      text: "Cancel",
      onPress: onCancel,
      style: "cancel",
    },
    {
      text: "Confirm",
      onPress: onConfirm,
      style: "default",
    },
  ]);
}
