/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

export interface Property {
    id: string;
    name: string;
    tagline: string;
    description: string;
    longDescription?: string;
    price: number; // Listed price
    category: 'Villa' | 'Cabin' | 'Apartment' | 'Estate';
    location: string;
    beds: number;
    baths: number;
    sqft: number;
    imageUrl: string;
    gallery?: string[];
    features: string[];
}

export interface JournalArticle {
    id: number;
    title: string;
    date: string;
    excerpt: string;
    image: string;
    content: React.ReactNode;
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
    timestamp: number;
}

export enum LoadingState {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS'
}

export type ViewState =
    | { type: 'home' }
    | { type: 'property', property: Property }
    | { type: 'journal', article: JournalArticle }
    | { type: 'inquiry' }; // Changed from checkout
