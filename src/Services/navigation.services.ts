// Services file for react navigation

import * as React from 'react';
import { StackActions } from '@react-navigation/native';

export const navigationRef = React.createRef();
export const isMountedRef = React.createRef();

export function navigate(name: string, params?: object) {
    if (isMountedRef.current && navigationRef.current) {
        navigationRef.current.navigate(name, params);
    }
}

export function push(...args: any) {
    if (isMountedRef.current && navigationRef.current) {
        navigationRef.current.dispatch(StackActions.push(...args));
    }
}

export function pop() {
    if (isMountedRef.current && navigationRef.current) {
        navigationRef.current.dispatch(StackActions.pop());
    }
}

export function replace(...args: any) {
    if (isMountedRef.current && navigationRef.current) {
        navigationRef.current.dispatch(StackActions.replace(...args));
    }
}