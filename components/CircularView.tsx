import { colors } from '@/styles/global';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

interface CircleProp{
    children: React.ReactNode;
    centralComponent?: React.ReactNode;
    size?: number
}


const CircularView = (props: CircleProp) => {
    const {centralComponent = null, size} = props;
    const numberOfChildren = React.Children.count(props.children)
    const wheelSize = size ? size * 0.7 : 0
    const wheelRadius = wheelSize/2


    return (
        <View style={[styles.container,{width:size, height:size}]}>
            {React.Children.map(props.children, (child, index) => {
                return (
                    <Item wheelRadius={wheelRadius} index={index} numberOfChildren={numberOfChildren} child={child} />
                );
            })}
            <Animated.View >
                {centralComponent}
            </Animated.View>
        </View>
    );
};

const DegtoRad = (degree:number)=>{
    return degree * (Math.PI / 180)
}


const Item = ({ wheelRadius, index,numberOfChildren, child }:{ wheelRadius:number, index: number,numberOfChildren:number, child: React.ReactNode }) => {

    const startAngle = DegtoRad(-80)
    const endingAngle = 0;

    const angle = startAngle - (((startAngle-endingAngle) * index)/(numberOfChildren-1) )
    const x = wheelRadius * Math.cos(angle)
    const y = wheelRadius * Math.sin(angle)


    return (
        <Animated.View style={{position:"absolute",transform:[{translateX:x},{translateY:y}]}}>
            {child}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position:"absolute",
        height:150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:9999,
        backgroundColor:colors.primary+"E0",

    },
});

export default CircularView;
