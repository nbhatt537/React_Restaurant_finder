import React, { Component, useState} from 'react';
import {View, StyleSheet,Dimensions} from 'react-native';
import * as Location from 'expo-location';
const { height } = Dimensions.get("window");

export default class TrainMap extends Component {
    constructor() {
        super();
        this.state = { location: "", latitude: null, longitude: null }
    }
    async locationPermissionAsync() {
        let canUseLocation = false;
        const grantedPermission = await Location.getForegroundPermissionsAsync()
        if (grantedPermission.status === "granted") {
            canUseLocation = true;
        } else {
            const permissionResponse = await Location.requestForegroundPermissionsAsync()
            if (permissionResponse.status === "granted") {
                canUseLocation = true;
            }
        }
        if (canUseLocation) {
            const location = await Location.getCurrentPositionAsync(
                
            )
            console.log("received location:", location);
            this.state.location = location.coords.latitude + " - " + location.coords.longitude;
            this.state.latitude = location.coords.latitude;
            this.state.longitude = location.coords.longitude;
            console.log("Position is: " + this.state.location)
        }
    }
    componentDidMount() {
        this.locationPermissionAsync()
    };
}