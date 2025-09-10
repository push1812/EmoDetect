import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

const useEmotionModel = () => {
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadGraphModel("/tfjs_model/model.json");
        setModel(loadedModel);
        console.log("✅ Model Loaded!");
      } catch (err) {
        console.error("❌ Model loading error:", err);
      }
    };
    loadModel();
  }, []);

  return model;
};

export default useEmotionModel;
