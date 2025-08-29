import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { Text, View, Button, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { cameraStyles } from "@/styles/cameraStyles";

export default function Post() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [flashOn, setFlashOn] = useState<boolean>(false);
  const ref = useRef<CameraView | null>(null);
  const [uri, setUri] = useState<string | null>(null);

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

  function toggleFlash() {
    setFlashOn((prev) => !prev);
  }

  const takePicture = async () => {
    console.log("click");
    const photo = await ref.current?.takePictureAsync();
    setUri(photo?.uri ?? null);
  };

  const RenderCamera = () => {
    return (
      <CameraView
        ref={ref}
        style={cameraStyles.camera}
        facing={facing}
        flash={flashOn ? "on" : "off"}
      >
        {/* Flip Camera */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            style={cameraStyles.buttonIcon}
            onPress={toggleCameraFacing}
          >
            <Ionicons
              name="camera-reverse"
              size={60}
              color="rgba(255, 255, 255, 0.7)"
            />
          </TouchableOpacity>

          {/* Take picture */}
          <TouchableOpacity
            style={cameraStyles.buttonIcon}
            onPress={takePicture}
          >
            <Ionicons
              name="camera"
              size={60}
              color="rgba(255, 255, 255, 0.7)"
            />
          </TouchableOpacity>

          {/* Enable/Disable flash */}
          <TouchableOpacity
            style={[{ paddingRight: 30 }, cameraStyles.buttonIcon]}
            onPress={toggleFlash}
          >
            <Ionicons
              name={flashOn ? "flash" : "flash-off"}
              size={60}
              color="rgba(255,255,255,0.7)"
            />
          </TouchableOpacity>
        </View>
      </CameraView>
    );
  };

  const RenderPicture = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Image
          source={uri ? { uri } : undefined}
          contentFit="contain"
          style={{ height: 380, width: 380, aspectRatio: 1 }}
        />
        <TouchableOpacity
          onPress={() => setUri(null)}
          style={cameraStyles.photoButtonContainer}
        >
          <Text style={cameraStyles.photoButtonText}>Take another picture</Text>
        </TouchableOpacity>

        <TouchableOpacity style={cameraStyles.photoButtonContainer}>
          <Text style={cameraStyles.photoButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Render camera or display taken photo */}
      <View style={cameraStyles.container}>
        <View>{uri ? RenderPicture() : RenderCamera()}</View>

        {/*
                Add:
                Upload from phone gallery
                Next button --> To edit post
            */}
        <View
          style={{
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text> Or upload photo from gallery</Text>
          <TouchableOpacity style={{ marginTop: 10 }}>
            <FontAwesome name="image" size={80} color="#1da0f261" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
