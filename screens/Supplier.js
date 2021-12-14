import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Button,
  FlatList,
  Modal,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons"
import ItemForm from '../components/ItemForm'
import UpdateItemForm from '../components/UpdateItemForm'
import Check from '../components/Check'
import { useNavigation } from "@react-navigation/native"
import { Colours } from "../components/Colours";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export function Supplier(props) {

  const navigation = useNavigation();
  const [listData, setListData] = useState();

  const [modalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [itemArray, setItemArray] = useState([]);
  const [updatedArray, setUpdatedArray] = useState([]);
  const [appInit, setAppInit] = useState(true);

  const [nameItemToUpdate, setNameItemToUpdate] = useState();
  const [keyItemToUpdate, setKeyItemToUpdate] = useState();

  useEffect(() => {
    if (appInit) {
      getData();
      setAppInit(false);
      console.log("getting data...");
    } else {
      storeData();
      console.log("Storing data....");
    }
    storeData();
  }, [itemArray]);

  useEffect(() => {
    if (!props.auth) {
      navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    }
  }, [props.auth]);
  useEffect(() => {
    setListData(props.data);
    console.log(listData);
  }, [props.data]);

  const data = { time: new Date().getTime(), email: Math.random() * 100 };

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.time}</Text>
    </View>
  );

  const addItem = (item) => {
    item.key = Math.random().toString();
    setItemArray((currentItem) => {
      return [item, ...currentItem];
    });
    console.log("item added: ", item);

    setAddModalOpen(false);
  };

  const updateItem = (key, newName) => {
    setNameItemToUpdate(newName);
    setKeyItemToUpdate(key);

    const index = itemArray.findIndex((el) => el.key === key);
    itemArray[index] = {
      key: key,
      name: newName,
    };
    let newArray = itemArray;
    setItemArray(newArray);
    setUpdatedArray(newArray);
  };

  const deleteItem = (key, name) => {
    console.log("Key of item to be deleted: " + key);
    console.log("Item name to be deleted : " + name);
    const newArray = itemArray.filter((item) => item.key !== key);
    setItemArray(newArray);
  };

  const storeData = async () => {
    const stringified = JSON.stringify(itemArray);
    try {
      await AsyncStorage.setItem("listData", stringified);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const stringified = await AsyncStorage.getItem("listData");
      setItemArray(stringified !== null ? JSON.parse(stringified) : []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.proTipContainer}>
      <Text style={styles.proTipTitle}>Pro Tip:</Text>
      <Text style={styles.proTipText}>Tap on the white circles to be aware of which products has already been ordered.</Text>
      </View>
      <Modal visible={modalOpen} animationType="slide">
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              onPress={() => setAddModalOpen(false)}
              name="arrow-back"
              size={28}
              color= {Colours.salmon}
              style={{ marginTop: 50, marginBottom: 15, marginLeft: 30, }}
            />
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                marginLeft: 10,
                marginTop: 35,
                color: Colours.salmon,
              }}
            >
              back to list
            </Text>
          </View>
          <ItemForm addItem={addItem} />
        </View>
      </Modal>
      <Modal visible={updateModalOpen} animationType="slide">
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              onPress={() => setUpdateModalOpen(false)}
              name="arrow-back"
              size={28}
              color={Colours.blue}
              style={{ marginTop: 50, marginBottom: 15, marginLeft: 30, }}
            />
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                marginLeft: 10,
                marginTop: 35,
                color: Colours.blue
              }}
            >
              back to list
            </Text>
          </View>
          <UpdateItemForm
            updateItem={updateItem}
            itemName={nameItemToUpdate}
            itemKey={keyItemToUpdate}
          />
        </View>
      </Modal>
      <FlatList
        data={itemArray}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          console.log("Item rendered", item),
          (
            <TouchableOpacity
              style={styles.itemButton}
              onPress={() => {
                setUpdateModalOpen(true);
                updateItem(item.key, item.name);
              }}
              onLongPress={() => deleteItem(item.key, item.name)}
              update={updateItem}
            >
              <Text style={styles.text}>{item.name}</Text>
              <Check />
            </TouchableOpacity>
          )
        )}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton}>
          <MaterialIcons
            style={{ color: "white" }}
            name="add"
            size={50}
            onPress={() => setAddModalOpen(true)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: "white",
  },
  proTipContainer:{
    padding: 20,
    backgroundColor: Colours.grey,
    borderRadius: 5,
    marginBottom: 15,
  },
  proTipTitle:{
    marginBottom: 10,
    fontSize: 20,
    fontWeight: '700',
    color: Colours.blue
  },
  proTipText:{
    marginBottom: 10,
    fontSize: 15,
    fontWeight: '500',
    color: Colours.darkGrey,
    lineHeight: 23,
  },
  itemButton: {
    backgroundColor: Colours.salmon,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    paddingLeft: 10,
  },
  addButton: {
    borderRadius: 30,
    backgroundColor: Colours.salmon,
    alignSelf: "flex-end",
    marginRight: 10,
    marginTop: 10,
    elevation: 6,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 50,
    marginRight: 20,
  },
  deleteAllBtn: {
    backgroundColor: Colours.salmon,
    borderRadius: 20,
    maxHeight: 50,
    padding: 12,
    elevation: 6,
  },
});