import { UpdateTweakList } from '@/store/messageListSlice';
import { colors, GlobalStyle } from '@/styles/global';
import { ChevronDown } from 'lucide-react-native';
import React, { memo } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch } from 'react-redux';
import type { customisationType, tweakType } from '../../../types/type';

interface propType {
  customisation : customisationType;
  messageId:string
}

const OptionSelect = memo(function OptionSelect(props: propType) {
  const {width,height} = useWindowDimensions()
  const landscape = width>height
  const dynamicWidth = landscape ? "40%" : "70%";
  const { customisation, messageId } = props;
  const dispatch = useDispatch()



  return (
    <View style={ { width: dynamicWidth, minHeight: 48 }}>
      <Dropdown 
        data={customisation.options.map((item) => ({label: item.label, value: item.label }))} labelField="label" valueField="value" placeholder={customisation.name}
        onChange={(item) => {
          const option = customisation.options.find((opt) => opt.label === item.value);
          if (!option) return
          const payload: tweakType = { name: customisation.name, type: customisation.type, value: option.label, price: option.extraPrice };
          dispatch(UpdateTweakList({id:messageId,value:payload}))
        }}
        renderRightIcon={() => (
          <View style={styles.iconContainer}>
            <ChevronDown color={colors.primary} size={20} />
          </View>
        )}
        style={styles.dropdown}
        placeholderStyle={styles.placeholder}
        selectedTextStyle={styles.input}
        iconStyle={{ display: 'none' }}
      />
    </View>
  );
})

export default OptionSelect

const styles = StyleSheet.create({

  dropdown: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 2,
    backgroundColor: colors.background,
    paddingVertical:0
  },
  input: {
    ...GlobalStyle.Outfit_Regular_body,
    color: colors.primary,
    paddingHorizontal:8,
    textTransform: 'capitalize',
  },
  placeholder: {
    ...GlobalStyle.Outfit_Regular_body,
    color: colors.light,
    paddingHorizontal:8,
    textTransform: 'capitalize',
  },
  iconContainer: {
    width: 40,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
