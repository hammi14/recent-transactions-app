import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  RefreshControl,
  Switch,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import transactionsData from "../../src/data/mockTransactions";
import getCategoryIcon from "../../src/utils/getCategoryIcon";
import styles from "../../src/styles/appStyles";

export default function TransactionsScreen() {
  const [transactions, setTransactions] = useState(transactionsData);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const filtered = transactions.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  const total = filtered.reduce((sum, t) => sum + t.amount, 0);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      const shuffled = [...transactionsData].sort(() => Math.random() - 0.5);
      setTransactions(shuffled);
      setRefreshing(false);
    }, 1000);
  };

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? "#121212" : "#fff" }]}>      
      <View style={styles.headerRow}>
        <Text style={[styles.header, { color: darkMode ? "#fff" : "#000" }]}>Total: ${total}</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>
      <TextInput
        testID="search-input" 
        placeholder="Search by name or category"
        style={[styles.searchInput, { color: darkMode ? "#fff" : "#000" }]}
        value={search}
        placeholderTextColor={darkMode ? "#888" : "#999"}
        onChangeText={setSearch}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <Animated.View entering={FadeIn} style={[styles.item, { backgroundColor: darkMode ? "#1e1e1e" : "#f5f5f5" }]}>            
            <MaterialCommunityIcons name={getCategoryIcon(item.category)} size={24} color={darkMode ? "#fff" : "#000"} />
            <View style={styles.itemContent}>
              <Text style={[styles.itemText, { fontWeight: "bold", color: darkMode ? "#fff" : "#000" }]}>{item.name}</Text>
              <Text style={[styles.itemText, { color: darkMode ? "#fff" : "#000" }]}>${item.amount} | {item.category}</Text>
              <Text style={[styles.itemText, { fontSize: 12, color: darkMode ? "#fff" : "#000" }]}>{item.date}</Text>
            </View>
          </Animated.View>
        )}
      />
    </View>
  );
}