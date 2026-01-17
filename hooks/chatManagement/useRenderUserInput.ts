import { removeMessage, updateMessage } from "@/store/messageListSlice";
import { messageListType } from "@/types/messageTypes";
import { RootState } from "@/utils/store";
import * as Location from "expo-location";
import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countryCodes } from "../../utils/data";
import useProceedPayment from "../useProceedPayment";

export default function useRenderUserInput(
  setShowOptions: React.Dispatch<React.SetStateAction<boolean>>,
  getSomethingElseMessage: (message: string) => void,
  setOptions: React.Dispatch<
    React.SetStateAction<{ name: string; onClick: () => void }[]>
  >,
) {
  const dispatch = useDispatch();
  // const delay = (ms:number) => new Promise(resolve=>setTimeout(resolve,ms))
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo);
  const ProceedToPayment = useProceedPayment(setShowOptions);
  const permissionGranted = useRef<boolean | null>(null);

  async function grantPermission() {
    if (permissionGranted.current !== null) return permissionGranted.current;
    const { status, canAskAgain } =
      await Location.getForegroundPermissionsAsync();
    if (status === "granted") {
      permissionGranted.current = true;
      return true;
    }
    if (!canAskAgain) {
      permissionGranted.current = false;
      return false;
    }
    const request = await Location.requestForegroundPermissionsAsync();
    permissionGranted.current = request.status === "granted";
    return permissionGranted.current;
  }

  const renderUserInput = useCallback(
    async (message: messageListType) => {
      if (!message || message.type !== "enterInfo") return;

      function goBack(message: messageListType) {
        if (!message || message.type !== "enterInfo") return;
        dispatch(removeMessage(message.id));
        getSomethingElseMessage("Let's continue");
        setShowOptions(true);
      }

      function proceed() {
        setOptions([
          { name: "Proceed to payment", onClick: () => ProceedToPayment() },
          {
            name: "Continue shopping",
            onClick: () => getSomethingElseMessage("Let's continue"),
          },
        ]);
        setShowOptions(true);
        dispatch(removeMessage(message.id));
      }

      async function getLocation(message: messageListType) {
        if (!message || message.type !== "enterInfo") return;
        dispatch(
          updateMessage({
            id: message.id,
            update: {
              name: userInfo.name,
              email: userInfo.email,
              phone_number: {
                code: countryCodes[0],
                number: userInfo.phone_number.number,
              },
              goBack: () => goBack(message),
              next: () => proceed(),
            },
          }),
        );

        const granted = await grantPermission();
        if (!granted) return null;
        const loc = await Location.getCurrentPositionAsync({});

        if (!loc?.coords?.latitude || !loc?.coords?.longitude) {
          return null;
        }

        const address = await Location.reverseGeocodeAsync({
          longitude: loc.coords.longitude,
          latitude: loc.coords.latitude,
        });
        dispatch(
          updateMessage({
            id: message.id,
            update: {
              location: {
                longitude: loc.coords.longitude,
                latitude: loc.coords.latitude,
              },
            },
          }),
        );
        return address;
      }

      getLocation(message).then((address) => {
        if (!address || address?.length === 0 || !address[0].formattedAddress)
          return;
        dispatch(
          updateMessage({
            id: message.id,
            update: { address: address[0].formattedAddress },
          }),
        );
      });
    },
    [
      ProceedToPayment,
      dispatch,
      getSomethingElseMessage,
      setOptions,
      setShowOptions,
      userInfo.email,
      userInfo.name,
      userInfo.phone_number.number,
    ],
  );

  return { renderUserInput };
}
