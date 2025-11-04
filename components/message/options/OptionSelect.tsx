import { colors } from '@/styles/global';
import { ImageBackground } from 'expo-image';
import { ChevronDown } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import type { customisationType, optionType, tweakType } from '../../../types/type';

interface propType {
  edit: customisationType;
  tweakList: tweakType[];
  setTweakList: React.Dispatch<React.SetStateAction<tweakType[]>>;
}

export default function OptionSelect(props: propType) {
  const { edit, setTweakList } = props;
  const [selectedOption, setSelectedOption] = useState<optionType | null>(null);

  useEffect(() => {
    if (!selectedOption) return;
    setTweakList((prev) => {
      const existingIndex = prev.findIndex((item) => item.name === edit.name);
      const payload: tweakType = {
        name: edit.name,
        type: edit.type,
        value: selectedOption.label,
        price: selectedOption.extraPrice,
      };
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = payload;
        return updated;
      }
      return [...prev, payload];
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  return (
    <View style={styles.container}>
      <Dropdown data={edit.options.map((item) => ({label: item.label, value: item.label }))} labelField="label" valueField="value" placeholder={edit.name}
        value={selectedOption?.label ?? null}
        onChange={(item) => {
          const option = edit.options.find((opt) => opt.label === item.value);
          if (option) setSelectedOption(option);
        }}
        renderRightIcon={() => (
          <ImageBackground source={require("../../../assets/images/patterns/pattern.webp")} style={styles.iconContainer}>
            <ChevronDown color={colors.primary} size={20} />
          </ImageBackground>
        )}
        style={styles.dropdown}
        placeholderStyle={styles.placeholder}
        selectedTextStyle={styles.input}
        iconStyle={{ display: 'none' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 240,
    minHeight: 48,
  },
  dropdown: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 2,
    backgroundColor: colors.background,
    paddingVertical:0
  },
  input: {
    fontSize: 18,
    color: colors.primary,
    fontFamily: 'Outfit_Regular',
    paddingHorizontal:8,
    textTransform: 'capitalize',
  },
  placeholder: {
    fontSize: 18,
    color: colors.light,
    fontFamily: 'Outfit_Regular',
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
