import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceDetection from "@mediapipe/face_detection";
import * as cam from "@mediapipe/camera_utils";
import * as tf from "@tensorflow/tfjs";
import useEmotionModel from "./EmotionModel";

const labelMap = {
  0: "Angry",
  1: "Disgust",
  2: "Fear",
  3: "Happy",
  4: "Sad",
  5: "Surprise",
  6: "Neutral",
};

const WebCamFeed = ({ onEmotionDetect }) => {
  const webcamRef = useRef(null);
  const cameraRef = useRef(null);
  const overlayRef = useRef(null);

  const model = useEmotionModel();

  useEffect(() => {
    if (!model) return;

    const detection = new faceDetection.FaceDetection({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    });

    detection.setOptions({
      model: "short",
      minDetectionConfidence: 0.5,
    });

    detection.onResults(async (results) => {
      const video = webcamRef.current.video;
      const canvas = overlayRef.current;
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (results.detections && results.detections.length > 0) {
        for (const face of results.detections) {
          const box = face.boundingBox;

          // Convert normalized coords → pixels
          let x = Math.floor((box.xCenter - box.width / 2) * video.videoWidth);
          let y = Math.floor(
            (box.yCenter - box.height / 2) * video.videoHeight
          );
          let w = Math.floor(box.width * video.videoWidth);
          let h = Math.floor(box.height * video.videoHeight);

          // Clamp inside video
          x = Math.max(x, 0);
          y = Math.max(y, 0);
          w = Math.min(w, video.videoWidth - x);
          h = Math.min(h, video.videoHeight - y);

          // Crop face to 48x48 canvas
          const tempCanvas = document.createElement("canvas");
          tempCanvas.width = 48;
          tempCanvas.height = 48;
          const tempCtx = tempCanvas.getContext("2d");
          tempCtx.drawImage(video, x, y, w, h, 0, 0, 48, 48);

          // Convert to tensor
          const tensor = tf.browser
            .fromPixels(tempCanvas, 1)
            .expandDims(0)
            .toFloat()
            .div(255.0);

          try {
            const prediction = model.predict(tensor);
            const values = await prediction.data();
            const maxIndex = values.indexOf(Math.max(...values));
            const detectedEmotion = labelMap[maxIndex] || "Unknown";
            const confidence = (values[maxIndex] * 100).toFixed(2);

            if (onEmotionDetect)
              onEmotionDetect(`${detectedEmotion} (${confidence}%)`);

            // Draw rectangle + text
            ctx.strokeStyle = "#00FF00";
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, w, h);
            ctx.font = "18px Arial";
            ctx.fillStyle = "#FFD700";
            ctx.fillText(
              `${detectedEmotion} (${confidence}%)`,
              x,
              y > 20 ? y - 5 : y + 20
            );

            prediction.dispose();
          } catch (err) {
            console.error("❌ Prediction error:", err);
          } finally {
            tensor.dispose();
          }
        }
      }
    });

    // Start camera
    if (webcamRef.current && webcamRef.current.video) {
      cameraRef.current = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await detection.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480,
      });
      cameraRef.current.start();
    }
  }, [model, onEmotionDetect]);

  return (
    <div className="relative p-10 md:p-5 flex justify-center items-center">
      <Webcam
        mirrored
        ref={webcamRef}
        className="rounded-2xl"
        style={{ position: "absolute" }}
      />
      <canvas
        ref={overlayRef}
        width={640}
        height={480}
        style={{ position: "absolute" }}
      />
    </div>
  );
};

export default WebCamFeed;
