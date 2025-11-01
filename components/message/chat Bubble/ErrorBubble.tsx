import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { motion } from 'framer-motion';
import { Text } from 'react-native';

interface propTypes{
    message:string
}

export default function ErrorBubble(props:propTypes) {
    const {message} = props
  return (
        <motion.div initial={{x:15, y:50, opacity:0}}  animate={{x:0,y:0,opacity:100}} transition={{duration:0.2}}  className='bg-primary text-background flex gap-1 rounded-2xl sm:text-sm text-xs p-2.5 px-4 sm:px-6 rounded-tl-none' >
            <MaterialIcons name='error' size={24} className='text-red-500 text-xl'/>
            <Text>{message}</Text>
        </motion.div>
  )
}
