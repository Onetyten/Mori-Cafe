import { colors } from '@/styles/global';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';


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
    const rotation =  useSharedValue(0)
    const context  = useSharedValue(0)
    const MaxRotation = 1

    const rotateGesture = Gesture.Pan()
    .onStart(()=>{
        context.value = rotation.value
    })
    .onUpdate((e) =>{
        const diff = e.translationX / 5;
        const newRotation = context.value + diff
        rotation.value = Math.max(Math.min(newRotation,MaxRotation),-MaxRotation)
    })
    .onEnd(()=>{
        rotation.value = withSpring(0,{damping:15,stiffness:100})
    })

    const animatedContainerStyle = useAnimatedStyle(()=>{
        return{
            transform:[{rotate:`${rotation.value}deg`}]
        }
    })



    return (
        <GestureDetector gesture={rotateGesture}>
            <Animated.View style={[styles.container,animatedContainerStyle,{width:size, height:size}]}>
                {React.Children.map(props.children, (child, index) => {
                    return (
                        <Item wheelRadius={wheelRadius} index={index} numberOfChildren={numberOfChildren} child={child} />
                    );
                })}
                <View >
                    {centralComponent}
                </View>
            </Animated.View>
        </GestureDetector>

    );
};

const DegtoRad = (degree:number)=>{
    return degree * (Math.PI / 180)
}


const Item = ({ wheelRadius, index,numberOfChildren, child }:{ wheelRadius:number, index: number,numberOfChildren:number, child: React.ReactNode }) => {
    const startAngle = DegtoRad(-80)
    const endingAngle = 0;
    const finalAngle = startAngle - (((startAngle-endingAngle) * index)/(numberOfChildren-1) )
    const angle = useSharedValue(0)
    const contextX = useSharedValue(0)
    const contextY = useSharedValue(0)
    const positionX = useSharedValue(0)
    const positionY = useSharedValue(0)


    const panGesture = Gesture.Pan()
    .onStart(()=>{
        contextX.value = positionX.value
        contextY.value = positionY.value
    })
    .onUpdate((e) =>{
        const newPositionX = contextX.value + e.translationX
        const newPositionY = contextY.value + e.translationY
        positionX.value = Math.max(Math.min(newPositionX,10),-10)
        positionY.value = Math.max(Math.min(newPositionY,10),-10)
    })
    .onEnd(()=>{
        positionX.value = withSpring(0,{damping:15,stiffness:100})
        positionY.value = withSpring(0,{damping:15,stiffness:100})
    })

    const panStyle = useAnimatedStyle(()=>{
        return{
            transform:[{translateX:positionX.value},{translateY:positionY.value}]
        }
    })

    useEffect(()=>{
        angle.value = withDelay(index * 50, withTiming(finalAngle,{duration:600,easing:Easing.out(Easing.back(1.0))}))
    },[angle, finalAngle, index])
    
    const style = useAnimatedStyle(()=>{
        const x = wheelRadius * Math.cos(angle.value)
        const y = wheelRadius * Math.sin(angle.value)
        return {
            position:"absolute",
            transform:[{translateX:x},{translateY:y}]
        }
    })

    return (
        <Animated.View style={style}>
            <View style={{width:"100%",height:"100%",position:"absolute",backgroundColor:colors.light+"60",borderRadius:9999}}></View>
            <GestureDetector gesture={panGesture}>
                <Animated.View style={panStyle}>
                    {child}
                </Animated.View>
            </GestureDetector>

            
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position:"absolute",
        height:150,
        zIndex:30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:9999,
        backgroundColor:colors.primary,

    },
});

export default CircularView;
