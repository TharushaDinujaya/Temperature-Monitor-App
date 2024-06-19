import { Dimensions } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

const { width, height } = Dimensions.get('window');

const DimensionsValues = {
    'mainConditions' : {
        iconHeight : 150,
        mainConditionTextSize : 25,
        mainTempTextSize : 55,
    },
    'subConditions' : {
        iconHeight : 25,
        iconWidth : 25
    },
    'forecastIcons' : {
        iconHeight : 30,
        iconWidth : 30
    },
    'common' : {
        extraLargeTextSize : 25,
        mainTitleTextSize : 20,
        titleTextSize : 15,
        normalTextSize : 12,
        smallTextSize : 10,
        extraSmallTextSize : 8,
    },
    'gauge' : {
        gaugeWidth : 150,
        gaugeBarWidth : 25,
    },
    'sun' : {
        sunSize : 75,
        radius : 30
    },
    'themeIcon' : {
        iconWidth : 15
    },
};

function setDimensions(updates) {
    for (const category in updates) {
        if (DimensionsValues[category]) {
            for (const property in updates[category]) {
                if (DimensionsValues[category][property] !== undefined) {
                    DimensionsValues[category][property] = updates[category][property];
                }
            }
        }
    }
}

// Function to determine current orientation and update dimensions accordingly
function handleOrientationChange() {
    console.log("orientation changed !")
    if (width > height) {
        // Landscape orientation
        setDimensions({
            mainConditions: {
                iconHeight: 150,
                mainConditionTextSize: 25,
                mainTempTextSize: 45,
            },
            subConditions: {
                iconHeight: 20,
                iconWidth: 20
            },
            forecastIcons: {
                iconHeight: 25,
                iconWidth: 25
            },
            common: {
                extraLargeTextSize: 20,
                mainTitleTextSize: 15,
                titleTextSize: 10,
                normalTextSize: 8,
                smallTextSize: 6,
                extraSmallTextSize: 4,
            },
            gauge: {
                gaugeWidth: 100,
                gaugeBarWidth: 20,
            },
            sun: {
                sunSize: 50,
                radius: 20,
            }
        });
    } else {
        // Portrait orientation
        setDimensions({
            mainConditions: {
                iconHeight: 150,
                mainConditionTextSize: 25,
                mainTempTextSize: 55,
            },
            subConditions: {
                iconHeight: 25,
                iconWidth: 25
            },
            forecastIcons: {
                iconHeight: 30,
                iconWidth: 30
            },
            common: {
                extraLargeTextSize: 25,
                mainTitleTextSize: 20,
                titleTextSize: 15,
                normalTextSize: 12,
                smallTextSize: 10,
                extraSmallTextSize: 8,
            },
            gauge: {
                gaugeWidth: 150,
                gaugeBarWidth: 25,
            },
            sun: {
                sunSize: 75,
                radius: 30,
            }
        });
    }
}

// Set up event listener for orientation changes
ScreenOrientation.addOrientationChangeListener(handleOrientationChange)

export { DimensionsValues, setDimensions };