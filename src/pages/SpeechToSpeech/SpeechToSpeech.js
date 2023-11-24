import React, { useState, useEffect, useRef } from 'react';
import Navbar from "../../components/navbar/navbar.jsx";
const SpeechRecognitionComponent = () => {
    const [transcript, setTranscript] = useState('');
    const [listening, setListening] = useState(false);
    const [leftInputText, setLeftInputText] = useState('');

    const [permissionGranted, setPermissionGranted] = useState(false);
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    const url = "https://phonotalk.vercel.app";

    const handleLeftTextInputChange = (e) => {
        setLeftInputText(e.target.value);
    };
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
                setTranscript(res.convertedText);
            } else {
                console.error("Failed to make request:", response.statusText);
                setTranscript(response.statusText);
            }
        } catch (error) {
            console.error("Failed to make request:", error);
            setTranscript(error)
        }
    };
    useEffect(() => {
        recognition.lang = 'en-US';
        recognition.interimResults = true;
        recognition.continuous = true;

        recognition.onstart = () => {
            setListening(true);
            console.log('Speech recognition started');
        };
        
        recognition.onresult = (event) => {
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

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setListening(false);
        };

        recognition.onend = () => {
            console.log('Speech recognition ended');
            setListening(false);

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
                        setTranscript(res.convertedText);
                    } else {
                        console.error("Failed to make request:", response.statusText);
                        setTranscript(response.statusText);
                    }
                } catch (error) {
                    console.error("Failed to make request:", error);
                    setTranscript(error)
                }
            };
            fetchData();
        };

        // Request permission to use the microphone
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then(() => {
                setPermissionGranted(true);
            })
            .catch((error) => {
                console.error('Error accessing microphone:', error);
                setPermissionGranted(false);
            });

        return () => {
            recognition.stop();
        };
    }, []); // Empty dependency array means this useEffect runs once on component mount

    const toggleRecognition = () => {
        if (permissionGranted) {
            if (listening) {
                console.log(`/english/${leftInputText}/${transcript}`)
                recognition.stop();
                setListening(false)
                console.log(`/english/${leftInputText}/${transcript}`)
                fetchData();
            } else {
                console.log(`started`)
                recognition.start();
                
            }
        } else {
            console.error('Microphone permission not granted');
            // You may want to provide feedback to the user or redirect them to a settings page
        }
    };

    return (
        <div>
            <button onClick={toggleRecognition}>
                {listening ? 'Stop Listening' : 'Start Listening'}
            </button>
            <input
                type='text'
                className=''
                placeholder='Input Text'
                value={leftInputText}
                onChange={handleLeftTextInputChange}
            />
            <p>Transcript: {transcript}</p>
        </div>
    );
};

export default SpeechRecognitionComponent;
