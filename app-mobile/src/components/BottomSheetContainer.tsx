import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import useTheme from "@src/hooks/useTheme";

type BottomSheetContainerProps = {
  children: React.ReactNode;
  snapPointsArray: string[] | number[];
};

const BottomSheetContainer = (props: BottomSheetContainerProps) => {
  const { children, snapPointsArray } = props;
  const { theme } = useTheme();

  // ref
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  // variables
  const snapPoints = React.useMemo(() => snapPointsArray, []);

  // callbacks
  // const handleSheetChanges = React.useCallback((index: number) => {
  // console.log("handleSheetChanges", index);
  // }, []);
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      // onChange={handleSheetChanges}
      backgroundStyle={{
        backgroundColor: theme.colors.bottomSheetBackgroundColor,
      }}
      handleIndicatorStyle={{
        backgroundColor: theme.colors.bottomSheetIndicatorColor,
      }}
    >
      {children}
    </BottomSheet>
  );
};

export default BottomSheetContainer;

const styles = StyleSheet.create({});
