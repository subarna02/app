import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
} from "react-native";
import React, { useCallback, useContext, useMemo, useRef } from "react";
import { CartContext } from "../context/CartContext";
import CartProductCard from "../components/CartScreen/CartProductCard";
import "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";

const Cart = () => {
  const { cartItems } = useContext(CartContext);
  const totalValue = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
  const SubTotal = totalValue + 100 - 100;

  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => [1, 400], []);

  // callbacks
  const handleSnapPress = useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);
  const handleExpandPress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    bottomSheetRef.current?.expand();
  }, []);
  const handleCollapsePress = useCallback(() => {
    bottomSheetRef.current?.collapse();
  }, []);
  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  return (
    <GestureHandlerRootView className="flex-1">
      <View className="flex-1 bg-violet-50 pt-3 px-3">
        <View className="flex-1">
          {cartItems.length === 0 ? (
            <View className="flex-1 justify-center items-center">
              <Image
                source={{
                  uri: "https://cdni.iconscout.com/illustration/premium/thumb/girl-sitting-in-empty-cart-9663087-7898364.png?f=webp",
                }}
                style={{ height: 200, width: 200 }}
              />
              <Text className="text-2xl text-center">Cart is Empty</Text>
            </View>
          ) : (
            <FlatList
              ListFooterComponent={() => <View style={{ height: 12 }} />}
              ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
              showsVerticalScrollIndicator={false}
              data={cartItems}
              keyExtractor={(item) => item?.id}
              renderItem={({ item }) => <CartProductCard item={item} />}
            />
          )}
        </View>
        <View className=" rounded-md  flex-row justify-between p-2 items-center bg-red-100 border border-[#9d32a8]  py-2">
          <View>
            <Text className="text-base">Address</Text>
            <Text className="text-base" numberOfLines={2}>
              Kailash Vihar,Bhubaneswar,Odisha,India,751024
            </Text>
          </View>

          <TouchableOpacity
            className="bg-[#9d32a8] inline-block  rounded-lg "
            onPress={handleExpandPress}
          >
            <Text className="text-base px-2 text-white py-2">Change</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className=" bg-violet-50 rounded-lg pt-3">
        <View className="py-3 bg-red-100 rounded-lg">
          <View className="flex-row justify-between p-2 items-center">
            <Text className="text-base">Total ({cartItems?.length})</Text>
            <Text className="text-base">Rs. {totalValue}</Text>
          </View>
          <View className="flex-row justify-between p-2 items-center ">
            <Text className="text-base">Delivery Charge</Text>
            <Text className="text-base">Rs. 100</Text>
          </View>
          <View className="flex-row justify-between p-2 items-center ">
            <Text className="text-base">Discount</Text>
            <Text className="text-base">Rs. 100</Text>
          </View>
          <View className="flex-row justify-between p-2 items-center ">
            <Text className="text-base">SubTotal</Text>
            <Text className="text-base">Rs. {SubTotal}</Text>
          </View>
          <TouchableOpacity className="bg-[#9d32a8] inline-block  rounded-lg mt-3 mx-3">
            <Text className="text-base text-center  text-white py-3">
              Checkout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <Button title="Snap To 450" onPress={() => handleSnapPress(1)} />
      <Button title="Snap To 150" onPress={() => handleSnapPress(0)} />
      <Button title="Expand" onPress={handleExpandPress} />
      <Button title="Collapse" onPress={handleCollapsePress} />
      <Button title="Close" onPress={handleClosePress} /> */}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        animateOnMount={true}
      >
        {/* <TouchableOpacity
          className="bg-[#9d32a8] inline-block  rounded-lg "
          onPress={handleClosePress}
        >
          <Text className="text-base px-2 text-white py-2">Close</Text>
        </TouchableOpacity> */}
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

// const styles = StyleSheet.create({
//   contentContainer: {
//     position: "absolute",
//     bottom: 0,
//     // flex: 1,
//     // alignItems: "center",
//   },
// });
export default Cart;
