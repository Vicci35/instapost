import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { cameraStyles } from "@/styles/cameraStyles";

export default function Post() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return (
      <View style={cameraStyles.container}>
        <Text style={{ fontSize: 100 }}>
          This app is not allowed to use the camera
        </Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={cameraStyles.container}>
        <Text>Camera Test</Text>
        <FontAwesome name="camera" size={48} color={"black"} />
        <Text>Allow this app to use the camera</Text>
        <Button title="Grant permission" onPress={requestPermission} />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={cameraStyles.container}>
        <CameraView style={cameraStyles.camera} facing={facing}>
          <View style={cameraStyles.buttonContainer}></View>
          {/* Add:
              - Change to FontAwesome icons
              - Flash functionality
              - Take photo button
              - Delete taken photo
          */}
          <TouchableOpacity
            style={cameraStyles.button}
            onPress={toggleCameraFacing}
          >
            <Text style={cameraStyles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </CameraView>

        {/* 
                Add:
                Upload from phone gallery
                Next button --> To edit post 
            */}
        <Text> Or upload photo from gallery</Text>
      </View>
    </SafeAreaView>
  );
}
