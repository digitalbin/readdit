import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';
import NoSSR from '@components/NoSSR';
import { timeFormatter } from '@utils/index';
import s from './style.module.css';

const PlayIcon = () => (
    <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M13.5 6.63396C14.1667 7.01886 14.1667 7.98111 13.5 8.36601L5.25 13.1291C4.58333 13.514 3.75 13.0329 3.75 12.2631L3.75 2.73684C3.75 1.96704 4.58333 1.48592 5.25 1.87082L13.5 6.63396Z"
            fill="white"
        />
    </svg>
);
const PauseIcon = () => (
    <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M4 3C4 2.44771 4.44772 2 5 2C5.55228 2 6 2.44772 6 3V12C6 12.5523 5.55228 13 5 13C4.44772 13 4 12.5523 4 12V3Z"
            fill="white"
        />
        <path
            d="M9 3C9 2.44771 9.44772 2 10 2C10.5523 2 11 2.44772 11 3V12C11 12.5523 10.5523 13 10 13C9.44772 13 9 12.5523 9 12V3Z"
            fill="white"
        />
    </svg>
);
const MuteIcon = () => (
    <svg
        width="16"
        height="15"
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M0 5C0 4.44772 0.447715 4 1 4H2.64922C2.87629 4 3.0966 3.92272 3.27391 3.78087L6.3753 1.29976C7.03007 0.775946 8 1.24212 8 2.08062V12.9194C8 13.7579 7.03007 14.2241 6.37531 13.7002L3.27391 11.2191C3.0966 11.0773 2.87629 11 2.64922 11H1C0.447715 11 0 10.5523 0 10V5Z"
            fill="white"
        />
        <path d="M10 5L15 10M15 5L10 10" stroke="white" strokeLinecap="round" />
    </svg>
);
const UnMuteIcon = () => (
    <svg
        width="16"
        height="15"
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M0 5C0 4.44772 0.447715 4 1 4H2.64922C2.87629 4 3.0966 3.92272 3.27391 3.78087L6.3753 1.29976C7.03007 0.775946 8 1.24212 8 2.08062V12.9194C8 13.7579 7.03007 14.2241 6.37531 13.7002L3.27391 11.2191C3.0966 11.0773 2.87629 11 2.64922 11H1C0.447715 11 0 10.5523 0 10V5Z"
            fill="white"
        />
        <path
            d="M12.3211 0.616753C12.1095 0.4394 11.7941 0.467213 11.6168 0.678875C11.4394 0.890536 11.4672 1.20589 11.6789 1.38325L12.3211 0.616753ZM11.6789 13.6168C11.4672 13.7941 11.4394 14.1095 11.6168 14.3211C11.7941 14.5328 12.1095 14.5606 12.3211 14.3832L11.6789 13.6168ZM11.6789 1.38325C15.4404 4.53503 15.4404 10.465 11.6789 13.6168L12.3211 14.3832C16.5596 10.8318 16.5596 4.16822 12.3211 0.616753L11.6789 1.38325Z"
            fill="white"
        />
        <path
            d="M10.3536 2.64645C10.1583 2.45118 9.84171 2.45118 9.64645 2.64645C9.45118 2.84171 9.45118 3.15829 9.64645 3.35355L10.3536 2.64645ZM10.5 3.5L10.8536 3.14645L10.5 3.5ZM10.5 11.5L10.1464 11.1464H10.1464L10.5 11.5ZM9.64645 11.6464C9.45118 11.8417 9.45118 12.1583 9.64645 12.3536C9.84171 12.5488 10.1583 12.5488 10.3536 12.3536L9.64645 11.6464ZM9.64645 3.35355L10.1464 3.85355L10.8536 3.14645L10.3536 2.64645L9.64645 3.35355ZM10.1464 11.1464L9.64645 11.6464L10.3536 12.3536L10.8536 11.8536L10.1464 11.1464ZM10.1464 3.85355C11.0315 4.73857 11.5 6.09924 11.5 7.5C11.5 8.90076 11.0315 10.2614 10.1464 11.1464L10.8536 11.8536C11.9685 10.7386 12.5 9.09924 12.5 7.5C12.5 5.90076 11.9685 4.26143 10.8536 3.14645L10.1464 3.85355Z"
            fill="white"
        />
    </svg>
);
const ExpandIcon = () => (
    <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M4 1H1V4M14 4V1L11 1M11 14H14V11M1 11L1 14H4"
            stroke="white"
            strokeLinecap="round"
        />
    </svg>
);
const ShrinkIcon = () => (
    <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M11 1V4H14M1 4L4 4L4 1M14 11L11 11L11 14M4 14V11H1"
            stroke="white"
            strokeLinecap="round"
        />
    </svg>
);

const initialState = {
    isReady: false,
    isPlaying: false,
    isMuted: true,
    duration: 0,
    time: 0,
    percent: 0,
};

const reducer = (state, action: { type: string; value?: any }) => {
    switch (action.type) {
        case 'ready':
            return { ...state, isReady: true };
        case 'mute':
            return { ...state, isMuted: true };
        case 'unmute':
            return { ...state, isMuted: false };
        case 'play':
            return { ...state, isPlaying: true };
        case 'pause':
            return { ...state, isPlaying: false };
        case 'timeupdate':
            return {
                ...state,
                time: action.value,
                percent:
                    state.duration > 0
                        ? Math.round((action.value / state.duration) * 100)
                        : 0,
            };
        case 'durationchange':
            return { ...state, duration: action.value };
        default:
            return state;
    }
};

const VideoJS = (props) => {
    const [loadRef, loadView] = useInView({ threshold: 0, triggerOnce: true });
    const [playRef, playView] = useInView({ threshold: 0.8 });
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<VideoJsPlayer>(null);
    const [state, dispatch] = useReducer(reducer, initialState);
    const { onReady, sources, width, height } = props;

    const containerRef = useCallback(
        (node) => {
            loadRef(node);
            playRef(node);
        },
        [loadRef, playRef],
    );

    useEffect(() => {
        const videoEl = videoRef.current;
        if (!videoEl || !loadView) return;

        const opts: VideoJsPlayerOptions = {
            loop: true,
            width,
            height,
            muted: true,
            preload: 'none',
            children: ['MediaLoader'],
        };

        const player = videojs(videoEl, opts, () => {
            dispatch({ type: 'ready' });
        });

        player.on('play', () => dispatch({ type: 'play' }));
        player.on('pause', () => dispatch({ type: 'pause' }));
        player.on('volumechange', () => {
            if (player.muted()) dispatch({ type: 'mute' });
            else dispatch({ type: 'unmute' });
        });
        player.on('timeupdate', () =>
            dispatch({ type: 'timeupdate', value: player.currentTime() }),
        );
        player.on('durationchange', () =>
            dispatch({ type: 'durationchange', value: player.duration() }),
        );

        playerRef.current = player;
    }, [height, width, loadView]);

    useEffect(() => {
        const player = playerRef.current;
        if (!state.isReady || !player) return;
        if (playView) player.play();
        else player.pause();
    }, [playView, state.isReady]);

    // useEffect(() => {
    //     console.log(state.isReady);
    // }, [state.isReady])

    const togglePlay = () => {
        const player = playerRef.current;
        if (!player) return;
        const isPaused = player.paused();
        if (isPaused) player.play();
        else player.pause();
    };

    const toggleMute = () => {
        const player = playerRef.current;
        if (!player) return;
        player.muted(!player.muted());
    };

    const toggleFullscreen = () => {
        const player = playerRef.current;
        if (!player) return;
        if (player.isFullscreen()) player.exitFullscreen();
        else player.requestFullscreen();
    };

    const handleScrub = (e) => {
        const player = playerRef.current;
        if (!player) return;
        const { value } = e.target;
        const scrubTime = player.duration() * value;
        player.currentTime(scrubTime);
    };

    return (
        <div
            ref={containerRef}
            className={s.container}
            style={{ width, height }}
        >
            <video ref={videoRef} onClick={togglePlay}>
                {sources.map(({ src, type }: { src: string; type: string }) => (
                    <source key={src} src={src} type={type} />
                ))}
            </video>
            <div className={s.controlBar}>
                <button onClick={togglePlay}>
                    {state.isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
                <div className="flex-1 flex items-center relative">
                    <progress
                        value={state.percent / 100}
                        className={s.progressBar}
                    />
                    <input
                        className={s.scrubber}
                        onChange={handleScrub}
                        value={state.percent / 100}
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                    />
                    {/* <div className="absolute bg-primary" style={{ width: `${state.percent}%`, height: 2 }} /> */}
                </div>
                <div
                    className="flex items-center justify-between px-xs text-tiny"
                    style={{ width: 88 }}
                >
                    <time>{timeFormatter(state.time)}</time> /{' '}
                    <time>{timeFormatter(state.duration)}</time>
                </div>
                <button onClick={toggleFullscreen}>
                    <ExpandIcon />
                </button>
                <button onClick={toggleMute}>
                    {state.isMuted ? <MuteIcon /> : <UnMuteIcon />}
                </button>
            </div>
        </div>
    );
};

const NoSSRVideo = (props) => (
    <NoSSR>
        <VideoJS {...props} />
    </NoSSR>
);

export default NoSSRVideo;
