import { useEffect, useRef, useCallback, useState } from 'react';

import { FiPauseCircle, FiPlayCircle } from 'react-icons/fi';

import { Container } from './styles';

interface AudioPLayerProps {
  audioSource: string;
}

const AudioPlayer: React.FC<AudioPLayerProps> = ({ audioSource }) => {
  // const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPLaying] = useState(false);

  const audioRef = useRef(new Audio(audioSource));
  const audioIntervalRef = useRef<NodeJS.Timeout>();
  const isReady = useRef(false);

  const { duration } = audioRef.current;

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : '0%';
  const trackStyle = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), 
    color-stop(${currentPercentage}, #8d8d8d))
  `;

  // const toNextTrack = useCallback(() => {
  //   console.log('Next track');
  // }, []);
  // const toPreviousTrack = useCallback(() => {
  //   console.log('Next track');
  // }, []);

  const startTimer = () => {
    if (audioIntervalRef.current) {
      clearInterval(audioIntervalRef.current);
    }

    audioIntervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        console.log('Endend');
        setIsPLaying(false);
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, 1000);
  };

  const onScrub = (value: string) => {
    if (audioIntervalRef.current) {
      clearInterval(audioIntervalRef.current);
    }
    audioRef.current.currentTime = Number(value);
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPLaying(true);
    }
    startTimer();
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
      startTimer();
      console.log('Playing');
    } else {
      if (audioIntervalRef.current) {
        clearInterval(audioIntervalRef.current);
      }
      audioRef.current?.pause();
      console.log('Paused');
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      if (audioIntervalRef.current) {
        clearInterval(audioIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    audioRef.current?.pause();

    audioRef.current = new Audio(audioSource);
    setTrackProgress(audioRef.current?.currentTime);

    if (isReady.current) {
      audioRef.current?.play();
      setIsPLaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [audioSource]);

  useEffect(() => {
    console.log(duration, '<- duration total');
    console.log(audioRef.current.currentTime);
  }, [duration, trackProgress]);

  return (
    <Container>
      {isPlaying ? (
        <FiPauseCircle
          size={40}
          color="#fff"
          onClick={() => setIsPLaying(false)}
        />
      ) : (
        <FiPlayCircle
          size={40}
          color="#fff"
          onClick={() => setIsPLaying(true)}
        />
      )}
      <input
        type="range"
        value={trackProgress}
        step="1"
        min="0"
        max={duration.toFixed(0) || `${duration.toFixed(0)}`}
        onChange={event => onScrub(event.target.value)}
        onMouseUp={onScrubEnd}
        onKeyUp={onScrubEnd}
        style={{ background: trackStyle }}
      />
    </Container>
  );
};

export { AudioPlayer };
