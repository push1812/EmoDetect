const EmotionDisplay = ({ emotion }) => {
  return (
    <div className="mt-6 font-semibold flex flex-col justify-center items-center gap-5 text-white text-nowrap">
      <div className="text-2xl md:text-3xl">
        Detected Emotion: <span className="text-yellow-400">{emotion}</span>
      </div>
    </div>
  );
};

export default EmotionDisplay;
