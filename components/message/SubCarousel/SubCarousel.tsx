import { memo } from "react"
import { ActivityIndicator, View } from "react-native"
import type { messageListType } from '../../../types/messageTypes'
import { styles } from "./style"
import SubCarouselItem from "./SubCarouselItem"

interface propType{
    message:messageListType,
    fetchFoodList:(endpoint:string,expression: string)=>void,
}

    const SubCarousel = memo(function SubCarousel(props:propType) {
        const {message,fetchFoodList} = props
        if (message.type !== "subcarousel" ) return

        if (message.content && message.content.length===0){
            if (message.fetched === false){
                return(
                    <View style={styles.loaderRow}>
                        {Array.from({length:2}).map((_,i)=>(
                            <View key={i} style={styles.loaderContainer}>
                                <ActivityIndicator size="large" color={"#fff"}/> 
                            </View>
                        ))}
                    </View>
                )
            }
            else {
                return null
            }
        }

        if (!Array.isArray(message.content)) {
            return null
        }

  return (
    <View style={styles.parent}>
        {message.content.map((item,index)=>{
            return(
                <SubCarouselItem index={index} key={index} fetchFoodList={fetchFoodList} item={item}/>
            )
        })}
    </View>
  )
})

export default SubCarousel
