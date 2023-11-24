import React, { useState, useEffect, useRef } from 'react';
import Navbar from "../../components/navbar/navbar.jsx";
import { Link, useNavigate } from 'react-router-dom';

const SpeechRecognitionComponent = () => {
    const [transcript, setTranscript] = useState('Spoken text will be shown here');
    const [listening, setListening] = useState(false);
    const [leftInputText, setLeftInputText] = useState('');
    const navigate = useNavigate();

    const [permissionGranted, setPermissionGranted] = useState(false);
    const recognition = useRef(null);
    const [result, setResult] = useState('Generated Text will be shown here!!');

    const [leftInputLanguage, setLeftInputLanguage] = useState('');
    const [rightInputLanguage, setRightInputLanguage] = useState('');
    const url = "https://phonotalk.vercel.app";

    const handleLeftTextInputChange = (e) => {
        setLeftInputText(e.target.value);
    };
    function mapLanguageNameToBCP47(languageName) {
        const languageMap = {
            arabic: 'ar-SA',
            czech: 'cs-CZ',
            danish: 'da-DK',
            german: 'de-DE',
            greek: 'el-GR',
            english: 'en-US', 
            spanish: 'es-ES',
            finnish: 'fi-FI',
            french: 'fr-FR',
            hebrew: 'he-IL',
            hindi: 'hi-IN',
            hungarian: 'hu-HU',
            indonesian: 'id-ID',
            italian: 'it-IT',
            japanese: 'ja-JP',
            korean: 'ko-KR',
            dutch: 'nl-NL',
            norwegian: 'no-NO',
            polish: 'pl-PL',
            portuguese: 'pt-PT',
            romanian: 'ro-RO',
            russian: 'ru-RU',
            slovak: 'sk-SK',
            swedish: 'sv-SE',
            thai: 'th-TH',
            turkish: 'tr-TR',
            chinese: 'zh-CN',
            // Add more mappings as needed
        };

        const normalizedLanguageName = languageName.toLowerCase();
        return languageMap[normalizedLanguageName] || 'en-US';
    }
    const textToSpeech = (text, language) => {
        const languageTag = mapLanguageNameToBCP47(language);

        if ('speechSynthesis' in window) {
            const synth = window.speechSynthesis;

            const voices = synth.getVoices();

            const utterance = new SpeechSynthesisUtterance(text);

            utterance.voice = voices.find(voice => voice.lang === languageTag); 

            utterance.pitch = 1;
            utterance.rate = 1;

            synth.speak(utterance);
        } else {
            console.error('Speech synthesis is not supported in this browser.');
        }

    }
    const fetchData = async () => {
        try {
            console.log(`/english/${leftInputText}/${transcript}`);
            const response = await fetch(url + `/english/${leftInputText}/${transcript}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const res = await response.json();
                setResult(res.convertedText);
                textToSpeech(res.convertedText, leftInputText)
            } else {
                console.error("Failed to make request:", response.statusText);
                setTranscript(response.statusText);
            }
        } catch (error) {
            console.error("Failed to make request:", error);
            setTranscript(error)
        }
    };

    const initRecognition = () => {
        const recognitionInstance = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognitionInstance.lang = 'en-US';
        recognitionInstance.interimResults = true;
        recognitionInstance.continuous = true;

        recognitionInstance.onstart = () => {
            setListening(true);
            console.log('Speech recognition started');
        };

        recognitionInstance.onresult = (event) => {
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    setTranscript(transcript);
                } else {
                    interimTranscript += transcript;
                }
            }
            console.log('Interim Transcript:', interimTranscript);
        };

        recognitionInstance.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setListening(false);
        };

        recognitionInstance.onend = () => {

            console.log('Speech recognition ended');
            setListening(false);
        };

        recognition.current = recognitionInstance;
    };
    const handleRightInputChange = (e) => {
        setRightInputLanguage(e.target.value);
    };

    const handleSubmitLeft = (e) => {
        e.preventDefault();
        console.log('Left Input Language:', leftInputLanguage);
        console.log('Left Input Text:', leftInputText);
    };

    const handleSubmitRight = (e) => {
        e.preventDefault();
        console.log('Right Input Language:', rightInputLanguage);
    };

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then(() => {
                setPermissionGranted(true);
                initRecognition();
            })
            .catch((error) => {
                console.error('Error accessing microphone:', error);
                setPermissionGranted(false);
            });

        return () => {
            if (recognition.current) {
                recognition.current.stop()
            }
        };
    }, []);

    const startRecognition = () => {
        if (permissionGranted && !listening) {
            recognition.current.start();
        }
    };

    const toggleRecognition = () => {
        if (listening) {

            recognition.current.stop();
            console.log("Calling script" + transcript);
            fetchData();

        } else {
            startRecognition();
        }
    };

    return (
        <div className='mainSTS'>
            
            
            
            <form className='formLeft' onSubmit={handleSubmitLeft}>
            <input
                type='text'
                className='inputBox lang'
                placeholder='Output language'
                value={leftInputText}
                onChange={handleLeftTextInputChange}
            />
                <div className='genratedText' style={{marginTop:"50px"}}>
                    <h1> {transcript}</h1>
                </div>
                <button type='submit' className='submitLeft' style={{marginTop:"50px"}} onClick={toggleRecognition}>
                    {(listening) ? "Stop": "Listen"}
                </button>
            </form>
            <div className='mainSTSright'>
                <form className='formRight' onSubmit={handleSubmitRight}>

                    <button type='submit' className='submitRight' onClick={() => textToSpeech(result, leftInputText)} >
                        Speak
                    </button>
                </form>
                <div className='genratedText'>
                    <h1> {result}</h1>
                </div>
            </div>
        </div>
    );
};

export default SpeechRecognitionComponent;
