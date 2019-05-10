import React from 'react';
import styles from './VotePane.module.css';
import {VoteDirection} from "../../../model/objects/Vote";

interface Props {
    score: number;
    onVote: (direction: VoteDirection) => void;
    voted?: VoteDirection
}

export function VotePane({score, onVote, voted}: Props) {
    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col text-center">
                    {
                        (voted && (voted === "up")) ?
                        <svg className="icon" onClick={e => onVote("up")} fill="#ff0000"
                             viewBox="0 0 32 32" width={20}>
                            <path d="M16 1l-15 15h9v16h12v-16h9z"/>
                        </svg>
                            :
                        <svg className="icon" onClick={e => onVote("up")}
                             viewBox="0 0 32 32" width={20}>
                            <path d="M16 1l-15 15h9v16h12v-16h9z"/>
                        </svg>
                    }
                </div>
            </div>
            <div className="row align-items-center">
                <div className="col text-center">
                    {score}
                </div>
            </div>
            <div className="row">
                <div className="col text-center  align-items-end">
                    {
                        (voted && (voted === "down")) ?
                            <svg className="icon" onClick={e => onVote("down")} fill="#0000ff"
                                 viewBox="0 0 32 32" width={20}>
                                <path d="M16 31l15-15h-9v-16h-12v16h-9z"/>
                            </svg>
                            :
                            <svg className="icon" onClick={e => onVote("down")}
                                 viewBox="0 0 32 32" width={20}>
                                <path d="M16 31l15-15h-9v-16h-12v16h-9z"/>
                            </svg>
                    }
                </div>
            </div>
        </div>
    )
}