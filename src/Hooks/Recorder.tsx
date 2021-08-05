import {
  Children,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface RecorderContextProps {
  handleStartRecord(): void;
  handleStopRecord(): void;
  audio: string;
  setAudio(data: string): void;
}

const RecorderContext = createContext<RecorderContextProps>(
  {} as RecorderContextProps,
);
export const RecorderProvider: React.FC = ({ children }) => {
  const [audio, setAudio] = useState('');
  const [recordService, setRecordService] = useState<MediaRecorder>();
  const audioChuncks: BlobPart[] = useMemo(() => {
    return [];
  }, []);

  useEffect(() => {
    async function setStream() {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecord = new MediaRecorder(stream);
      setRecordService(mediaRecord);
    }
    setStream();
  }, []);

  const handleStartRecord = useCallback(async () => {
    if (recordService) {
      recordService.start();
      recordService.addEventListener('dataavailable', event => {
        audioChuncks.push(event.data);
      });
    } else {
      console.log('Record is not available');
    }
  }, [audioChuncks, recordService]);

  const handleStopRecord = useCallback(async () => {
    if (recordService) {
      recordService.stop();
      recordService.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChuncks);
        setAudio(URL.createObjectURL(audioBlob));
      });
    } else {
      console.log('Record is not available');
    }
  }, [audioChuncks, recordService]);

  return (
    <RecorderContext.Provider
      value={{ handleStartRecord, handleStopRecord, audio, setAudio }}
    >
      {children}
    </RecorderContext.Provider>
  );
};

export function useRecorder(): RecorderContextProps {
  const context = useContext(RecorderContext);

  if (!context) {
    throw new Error('UseRecorder whitin a provider');
  }

  return context;
}
