import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';
import NoSSR from '@components/NoSSR';
import Scrubber from '@components/Scrubber';
import { timeFormatter } from '@utils/index';
import PlayIcon from '@icon/play.svg';
import PauseIcon from '@icon/pause.svg'
import ExpandIcon from '@icon/expand.svg'
import MuteIcon from '@icon/mute.svg'
import UnMuteIcon from '@icon/unmute.svg'
import s from './style.module.css';


const initialState = {
    isReady: false,
    isPlaying: false,
    isMuted: true,
    duration: 0,
    time: 0,
    percent: 0,
};

const reducer = (state: any, action: { type: string; value?: any }) => {
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
        case 'percent':
            return { ...state, percent: action.value };
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

const VideoJS = (props: any) => {
    const [loadRef, loadView] = useInView({ threshold: 0, triggerOnce: true });
    const [playRef, playView] = useInView({ threshold: 0.8 });
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<VideoJsPlayer | null>();
    const [state, dispatch] = useReducer(reducer, initialState);
    const { sources, width, height } = props;

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

    const handleScrub = (percent: number) => {
        const player = playerRef.current;
        if (!player) return;
        player.currentTime(player.duration() * percent);
    }
    
    return (
        <div
            ref={containerRef}
            className={s.container}
            style={{ width, height }}
            onPointerDown={togglePlay}
        >
            <video ref={videoRef} playsInline>
                {sources.map(({ src, type }: { src: string; type: string }) => (
                    <source key={src} src={src} type={type} />
                ))}
            </video>
            <div className={s.controlBar}>
                <button role="none" className="pointer-events-none">
                    {state.isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
                <Scrubber value={state.percent / 100} onChangeEnd={handleScrub} />
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
                <button onClick={toggleMute} className={s.muteBtn}>
                    {state.isMuted ? <MuteIcon /> : <UnMuteIcon />}
                </button>
            </div>
        </div>
    );
};

const NoSSRVideo = (props: any) => (
    <NoSSR>
        <VideoJS {...props} />
    </NoSSR>
);

export default NoSSRVideo;
