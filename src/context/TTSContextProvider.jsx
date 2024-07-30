import React, { createContext, useState, useContext } from 'react';

const TextToSpeechContext = createContext();

export const TTSContextProvider = ({ children }) => {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  const convertTextToSpeech = async () => {
    const subscriptionKey = 'GERE_CHAVE_NA_AZURE';
    const region = 'GERE_SUA_REGIAO_NA_AZURE';
    const endpoint = `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;

    const ssml = `
      <speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='pt-BR'>
        <voice name='pt-BR-Heloisa'>
          <prosody rate='0%' pitch='0%'>
            ${text}
          </prosody>
        </voice>
      </speak>
    `;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ssml+xml',
          'X-Microsoft-OutputFormat': 'riff-44100hz-16bit-mono-pcm',
          'Ocp-Apim-Subscription-Key': subscriptionKey,
        },
        body: ssml,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
    } catch (error) {
      console.error('Erro ao converter texto em fala:', error);
    }
  };

  return (
    <TextToSpeechContext.Provider value={{ convertTextToSpeech, setText, text, audioUrl }}>
      {children}
    </TextToSpeechContext.Provider>
  );
};

export const useTextToSpeech = () => useContext(TextToSpeechContext);
